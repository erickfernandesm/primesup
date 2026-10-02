# Prime Suplementos

Site da Prime Suplementos (Juiz de Fora, MG): catálogo, busca, carrinho e pedido pelo WhatsApp.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide.
O build gera um site **100% estático** (`out/`), sem servidor nem banco de dados.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera a pasta out/
npm run preview    # serve a pasta out/ localmente
npm run typecheck
```

Requer Node 20 ou superior.

## Deploy: GitHub → Cloudflare Pages

O projeto no Cloudflare se chama `primesup`. No painel, em
**Settings → Build → Build configuration**, os campos precisam ser:

| Campo | Valor |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |

Com isso, cada push na branch `main` publica uma nova versão sozinho.
Sem o build command, o Cloudflare publica o repositório cru e o site responde 404.

Deploy manual, sem depender do painel (exige `npx wrangler login` uma vez):

```bash
npm run deploy
```

O `wrangler.jsonc` declara a pasta de saída e o `public/_headers` define o
cache dos arquivos estáticos.

## Onde mexer

| Quero mudar… | Arquivo |
| --- | --- |
| Telefone, endereço, horário, Instagram, textos do "Por que Prime?" | `data/store.ts` |
| Produtos, preços, sabores, selos (novo, oferta…) | `data/products.ts` |
| Categorias | `data/categories.ts` |
| Vitrine da página inicial | `data/home.ts` |
| Cores, tipografia, raio, sombra | `app/globals.css` (bloco `@theme`) |

### Adicionar um produto

1. Inclua o item em `data/products.ts`.
2. Inclua as fotos em `scripts/image-sources.json` (mesmo `slug`).
3. Rode `npm run images`. O script baixa, converte para WebP em três larguras
   e atualiza `data/product-images.json`.

Para usar fotos próprias em vez do CDN, salve os arquivos em `public/products`
como `{slug}-{n}-320.webp`, `-640.webp` e `-1000.webp` e liste os caminhos-base
em `data/product-images.json`.

### Trocar a logo

Substitua `assets/logo-wordmark.png` (branco sobre preto) e rode `npm run brand`.
O script gera a logo com transparência, o favicon e a imagem de compartilhamento.

## Arquitetura

```
app/            rotas (home, produtos, produto, categorias, ofertas, busca, sitemap, robots)
components/
  layout/       header, menu mobile, footer, botão do WhatsApp
  ui/           botão, painel modal (Sheet), seletor de quantidade, breadcrumbs
  products/     card, grid, galeria, compra, catálogo e filtros
  cart/         provider, gaveta, item, botão do header
  search/       busca instantânea
  sections/     seções da home
data/           loja, produtos, categorias, curadoria da home
lib/            regras: catálogo, busca, carrinho, checkout, SEO, formatação
types/          tipos compartilhados
scripts/        geração de imagens e de arquivos de marca
```

Decisões que valem saber:

- **Dados em um só lugar.** Componentes nunca leem `data/products.ts` direto;
  passam por `lib/products.ts`. Para ligar uma API, ERP ou CMS, basta
  reimplementar essas funções.
- **Checkout plugável.** `lib/checkout/types.ts` define o contrato
  `CheckoutProvider`. Hoje só existe o WhatsApp. Pix, Mercado Pago ou checkout
  próprio entram como novos provedores, registrados em `lib/checkout/index.ts`,
  sem tocar na interface do carrinho.
- **Carrinho no navegador.** Guarda apenas `produto + sabor + quantidade` em
  `localStorage`; preço e nome vêm sempre do catálogo atual.
- **Filtros na URL.** `/produtos/?categoria=creatina&preco=50-100` pode ser
  compartilhado e sobrevive ao botão "voltar".
- **Imagens pré-otimizadas.** Como não há servidor, o `next/image` usa um
  loader próprio (`lib/image-loader.ts`) que escolhe entre as larguras geradas.
- **Painéis com `<dialog>` nativo.** Menu, busca, filtros e carrinho usam o
  mesmo componente (`components/ui/Sheet.tsx`); foco preso e tecla Esc vêm do
  navegador, e as animações são só CSS.

## Pendências de conteúdo

Itens que dependem de confirmação da loja (todos em `data/`):

- **WhatsApp.** O site usa (32) 98886-5134. A loja virtual atual aponta para
  outro número; confirme qual deve receber os pedidos (`data/store.ts`).
- **Horário de funcionamento.** Não há horário publicado. Enquanto `hours`
  estiver vazio, o site orienta a confirmar pelo WhatsApp.
- **Mais procurados.** A lista em `data/home.ts` é uma seleção inicial, não um
  ranking de vendas. Troque pelos campeões reais.
- **Instagram.** A grade usa fotos de produto como composição inicial. Troque
  pelas imagens dos posts em `data/store.ts`.
- **Frete grátis.** O Instagram da loja menciona frete grátis, mas sem as
  condições. Não foi incluído no site; adicione em `differentials` quando as
  regras estiverem definidas.
