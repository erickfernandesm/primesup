/**
 * Gera os arquivos de marca a partir da logo oficial:
 *   public/brand/logo.png      wordmark branco com fundo transparente
 *   app/icon.png               favicon (monograma P sobre preto)
 *   app/apple-icon.png         ícone iOS
 *   public/brand/og.jpg        imagem de compartilhamento 1200x630
 *
 * Fonte: assets/logo-wordmark.png (logo oficial, branco sobre preto).
 * Rodar com `npm run brand` sempre que a logo for trocada.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "assets", "logo-wordmark.png");
const INK = "#0a0a0a";

// A logo é branca sobre preto: a luminância vira o canal alfa.
const { data: luminance, info } = await sharp(SOURCE)
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height } = info;

const rgba = Buffer.alloc(width * height * 4, 255);
// O fundo da arte original não é preto absoluto; desconta esse nível.
const floor = luminance[0] + 6;
for (let i = 0; i < width * height; i++) {
  const level = Math.max(0, luminance[i] - floor) / (255 - floor);
  rgba[i * 4 + 3] = Math.round(level * 255);
}
const transparentLogo = sharp(rgba, { raw: { width, height, channels: 4 } });

await transparentLogo
  .clone()
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, "public", "brand", "logo.png"));

// Limite direito do monograma: primeira coluna vazia depois do "P".
function markWidth() {
  let seenInk = false;
  for (let x = 0; x < width; x++) {
    let column = 0;
    for (let y = 0; y < height; y++) column = Math.max(column, luminance[y * width + x]);
    if (column > floor + 40) seenInk = true;
    else if (seenInk) return x;
  }
  return height;
}

const mark = await transparentLogo
  .clone()
  .extract({ left: 0, top: 0, width: markWidth(), height })
  .png()
  .toBuffer();

async function icon(size, file) {
  const inner = Math.round(size * 0.58);
  const glyph = await sharp(mark)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: glyph, gravity: "center" }])
    .png()
    .toFile(path.join(ROOT, file));
}
await icon(256, "app/icon.png");
await icon(180, "app/apple-icon.png");

const ogLogo = await transparentLogo.clone().png().resize({ width: 560 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: INK } })
  .composite([{ input: ogLogo, gravity: "center" }])
  .jpeg({ quality: 88 })
  .toFile(path.join(ROOT, "public", "brand", "og.jpg"));

console.log(`ok marca gerada (${width}x${height}, monograma ${markWidth()}px)`);
