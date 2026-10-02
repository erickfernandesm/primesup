/**
 * Baixa as fotos oficiais dos produtos (CDN da loja atual) e gera versões
 * otimizadas em WebP dentro de public/products.
 *
 *   npm run images            -> baixa apenas o que ainda não existe
 *   npm run images -- --force -> refaz tudo
 *
 * Saída: public/products/{slug}-{n}-{largura}.webp
 *        data/product-images.json  (slug -> lista de caminhos-base válidos)
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "products");
const MANIFEST = path.join(ROOT, "data", "product-images.json");
const SOURCE_BASE = "https://cdn.awsli.com.br/1000x1000/3071/3071446/produto";
const WIDTHS = [320, 640, 1000];
const CONCURRENCY = 6;
const force = process.argv.includes("--force");

const exists = (file) =>
  access(file).then(
    () => true,
    () => false,
  );

async function processImage(slug, index, sourcePath) {
  const base = `${slug}-${index + 1}`;
  const targets = WIDTHS.map((w) => path.join(OUT_DIR, `${base}-${w}.webp`));

  if (!force && (await Promise.all(targets.map(exists))).every(Boolean)) {
    return `/products/${base}`;
  }

  const response = await fetch(`${SOURCE_BASE}/${sourcePath}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());

  await Promise.all(
    WIDTHS.map((width, i) =>
      sharp(input)
        // Fundo branco uniforme: os cards usam mix-blend-multiply sobre o tile.
        .flatten({ background: "#ffffff" })
        .resize(width, width, { fit: "contain", background: "#ffffff" })
        .webp({ quality: width === 1000 ? 80 : 76 })
        .toFile(targets[i]),
    ),
  );
  return `/products/${base}`;
}

async function runPool(tasks, size) {
  const results = new Array(tasks.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (cursor < tasks.length) {
        const current = cursor++;
        results[current] = await tasks[current]();
      }
    }),
  );
  return results;
}

const sources = JSON.parse(
  await readFile(path.join(ROOT, "scripts", "image-sources.json"), "utf8"),
);
await mkdir(OUT_DIR, { recursive: true });

const jobs = Object.entries(sources).flatMap(([slug, files]) =>
  files.map((file, index) => ({ slug, index, file })),
);

let failures = 0;
const done = await runPool(
  jobs.map((job) => async () => {
    try {
      return { ...job, base: await processImage(job.slug, job.index, job.file) };
    } catch (error) {
      failures++;
      console.warn(`x ${job.slug} #${job.index + 1}: ${error.message}`);
      return { ...job, base: null };
    }
  }),
  CONCURRENCY,
);

const manifest = {};
for (const { slug, base } of done) {
  manifest[slug] ??= [];
  if (base) manifest[slug].push(base);
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`ok ${done.length - failures}/${done.length} imagens prontas em public/products`);
