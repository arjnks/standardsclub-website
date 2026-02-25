import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { CoreDirectives } from "@/components/CoreDirectives";
import { TeamGrid } from "@/components/TeamGrid";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  return (
    <div className="min-h-screen antialiased overflow-hidden">
      <Preloader />
      <Navbar />
      <Hero />
      <CoreDirectives />
      <Timeline />
      <TeamGrid />
      <Footer />
    </div>
  );
}