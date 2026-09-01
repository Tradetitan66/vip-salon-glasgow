import { useCallback } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import LocationSelector from "./components/LocationSelector";
import ExperienceSection from "./components/ExperienceSection";
import HairGallery from "./components/HairGallery";
import HeadSpaFeature from "./components/HeadSpaFeature";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const scrollToLocations = useCallback(() => {
    document.getElementById("locations")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <AnnouncementBar />
      <Header onBookNow={scrollToLocations} />
      <main id="main">
        <Hero onChooseLocation={scrollToLocations} />
        <TrustStrip />
        <LocationSelector />
        <ExperienceSection />
        <HairGallery />
        <HeadSpaFeature />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
