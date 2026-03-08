import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { siteConfig } from '@/config';
import { useLenis } from '@/hooks/useLenis';
import CustomCursor from '@/components/CustomCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import Navigation from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import LatestArticles from '@/sections/LatestArticles';
import ArtCategory from '@/sections/ArtCategory';
import LifestyleSection from '@/sections/LifestyleSection';
import DesignSection from '@/sections/DesignSection';
import GreenTribe from '@/sections/GreenTribe';
import AuthorsSection from '@/sections/AuthorsSection';
import InstagramGallery from '@/sections/InstagramGallery';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    // Set document title and language from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
    if (siteConfig.description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', siteConfig.description);
      }
    }
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Handle resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-brand-linen cursor-custom overflow-x-hidden">
      {/* Noise texture overlay */}
      <NoiseOverlay />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero Section - Split Screen Perspective Theater */}
        <HeroSection />

        {/* Latest Articles - Horizontal Dynamic Flow */}
        <LatestArticles />

        {/* Art Category - Fixed Sidebar with Reveal */}
        <ArtCategory />

        {/* Lifestyle - Scattered Polaroid Chaos */}
        <LifestyleSection />

        {/* Design - Mosaic Wall */}
        <DesignSection />

        {/* Green Tribe - Parallax Video Background */}
        <GreenTribe />

        {/* Authors - Orbital Avatar System */}
        <AuthorsSection />

        {/* Instagram Gallery - 3D Tunnel */}
        <InstagramGallery />
      </main>

      {/* Footer - Curtain Reveal */}
      <Footer />
    </div>
  );
}

export default App;
