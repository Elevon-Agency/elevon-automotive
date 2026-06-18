import { Hero } from "@/components/home/hero";
import { FeaturedVehicles } from "@/components/home/featured-vehicles";
import { BrandExperience } from "@/components/home/brand-experience";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CustomerStories } from "@/components/home/customer-stories";
import { CtaSection } from "@/components/home/cta-section";
import { getFeaturedInventoryVehicles } from "@/lib/vehicle-data";

export default async function HomePage() {
  const vehicles = await getFeaturedInventoryVehicles();
  return (
    <>
      <Hero />
      <FeaturedVehicles vehicles={vehicles} />
      <BrandExperience />
      <WhyChooseUs />
      <CustomerStories />
      <CtaSection />
    </>
  );
}
