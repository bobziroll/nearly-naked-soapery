import { AnnouncementBar } from "@/app/_components/announcement-bar";
import { AwardsStrip } from "@/app/_components/awards-strip";
import { BenefitsSection } from "@/app/_components/benefits-section";
import { CtaBanner } from "@/app/_components/cta-banner";
import { FeaturedProductSection } from "@/app/_components/featured-product";
import { HeroSection } from "@/app/_components/hero-section";
import { ProductGrid } from "@/app/_components/product-grid";
import { SiteHeader } from "@/app/_components/site-header";
import { TestimonialsSection } from "@/app/_components/testimonials-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <SiteHeader />
      <main className="space-y-10 pb-10">
        <HeroSection />
        <BenefitsSection />
        <FeaturedProductSection />
        <AwardsStrip />
        <ProductGrid />
        <TestimonialsSection />
        <CtaBanner />
      </main>
    </div>
  );
}
