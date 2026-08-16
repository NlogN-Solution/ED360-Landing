import { Nav } from "@/components/Nav";
import { Pricing } from "@/sections/Pricing";
import { FAQ } from "@/sections/FAQ";
import { CTA } from "@/sections/CTA";
import { Footer } from "@/sections/Footer";

export function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-8">
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
