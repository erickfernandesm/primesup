import type { NextConfig } from "next";

/**
 * Exportação 100% estática: o build gera a pasta `out/`, servida direto
 * pelo Cloudflare (Pages ou Workers Static Assets). Nenhum servidor Node
 * fica rodando em produção.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // As imagens são pré-otimizadas em `npm run images`; o loader apenas
    // escolhe o arquivo do tamanho certo. Ver lib/image-loader.ts.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 1000],
    imageSizes: [320],
  },
};

export default nextConfig;
