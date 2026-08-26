import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { FeatureStrip } from "../components/home/FeatureStrip";
import { BookSection } from "../components/home/BookSection";
import { AuthorIntro } from "../components/home/AuthorIntro";
import { MembershipCTA } from "../components/home/MembershipCTA";
import { Testimonials } from "../components/home/Testimonials";
import { Newsletter } from "../components/home/Newsletter";

export function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <FeatureStrip />
        <BookSection />
        <AuthorIntro />
        <MembershipCTA />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
