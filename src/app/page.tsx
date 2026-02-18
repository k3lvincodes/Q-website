import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyQ from "@/components/WhyQ";
import WhoIsQFor from "@/components/WhoIsQFor";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

import DownloadApp from "@/components/DownloadApp";

export default function Home() {
  return (
    <div className="absolute">
      <Header />
      <Hero />
      <HowItWorks />
      <WhyQ />
      <WhoIsQFor />
      <FAQ />
      <DownloadApp />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
