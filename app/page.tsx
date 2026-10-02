import { BestSellers } from "@/components/sections/BestSellers";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HelpCta } from "@/components/sections/HelpCta";
import { Hero } from "@/components/sections/Hero";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { Offers } from "@/components/sections/Offers";
import { StoreVisit } from "@/components/sections/StoreVisit";
import { WhyPrime } from "@/components/sections/WhyPrime";
import { homeCuration } from "@/data/home";
import { getProductBySlug, getProductsBySlugs, pickUnique } from "@/lib/products";

export default function HomePage() {
  // Cada produto aparece em uma única seção: `used` registra quem já entrou.
  const used = new Set<string>();
  const heroProduct = getProductBySlug(homeCuration.hero);
  if (heroProduct) used.add(heroProduct.id);

  const featured = pickUnique(getProductsBySlugs(homeCuration.featured), used, 4);
  const offers = pickUnique(getProductsBySlugs(homeCuration.offers), used, 4);
  const newArrivals = pickUnique(getProductsBySlugs(homeCuration.newArrivals), used, 3);
  const bestSellers = pickUnique(getProductsBySlugs(homeCuration.bestSellers), used, 6);

  return (
    <>
      {heroProduct && <Hero product={heroProduct} />}
      <BrandStrip />
      <CategoryShowcase />
      <FeaturedProducts products={featured} />
      <Offers products={offers} />
      <NewArrivals products={newArrivals} />
      <HelpCta />
      <BestSellers products={bestSellers} />
      <WhyPrime />
      <StoreVisit />
      <InstagramSection />
    </>
  );
}
