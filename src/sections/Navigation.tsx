import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, X, Menu } from 'lucide-react';
import { navigationConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initial animation
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, rotation: -5, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
    );

    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('a');
      tl.fromTo(
        links,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.8'
      );
    }

    // Scroll trigger for compact mode
    const trigger = ScrollTrigger.create({
      start: 100,
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 100);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchOverlayRef.current) {
      gsap.fromTo(
        searchOverlayRef.current,
        { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
        { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setIsMobileMenuOpen(false),
      });
    }
  };

  if (!navigationConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-expo-out ${
          isScrolled
            ? 'py-2 sm:py-3 glass border-b border-brand-border/30'
            : 'py-4 sm:py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`flex items-center transition-all duration-700 ease-expo-out ${
            isScrolled ? 'justify-between' : 'justify-between'
          }`}>
            {/* Logo */}
            <div
              ref={logoRef}
              className={`font-oswald font-light tracking-widest transition-all duration-700 ease-expo-out ${
                isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl lg:text-4xl'
              }`}
            >
              <a href="#" className="magnetic cursor-hover text-brand-text hover:text-brand-dark-gray transition-colors">
                {navigationConfig.brandName}
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div
              ref={linksRef}
              className="hidden md:flex items-center gap-4 lg:gap-8"
            >
              {navigationConfig.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="magnetic cursor-hover font-roboto text-xs tracking-wider uppercase text-brand-dark-gray hover:text-brand-text transition-colors relative liquid-underline"
                >
                  {link.label}
                </a>
              ))}

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="magnetic cursor-hover p-2 text-brand-dark-gray hover:text-brand-text transition-colors"
                aria-label={navigationConfig.searchAriaLabel}
              >
                <Search size={18} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-brand-dark-gray hover:text-brand-text transition-colors touch-manipulation"
                aria-label={navigationConfig.searchAriaLabel}
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-brand-text hover:text-brand-dark-gray transition-colors touch-manipulation"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          ref={searchOverlayRef}
          className="fixed inset-0 z-[100] bg-brand-linen flex items-center justify-center"
        >
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 -m-2 text-brand-text hover:text-brand-dark-gray transition-colors cursor-hover touch-manipulation"
            aria-label={navigationConfig.closeSearchAriaLabel}
          >
            <X size={28} className="sm:w-8 sm:h-8" />
          </button>

          <div className="w-full max-w-2xl px-4 sm:px-6">
            <input
              type="text"
              placeholder={navigationConfig.searchPlaceholder}
              className="w-full bg-transparent border-b-2 border-brand-text py-3 sm:py-4 text-2xl sm:text-3xl lg:text-5xl font-oswald font-light placeholder:text-brand-light-gray focus:outline-none"
              autoFocus
            />
            <p className="mt-3 sm:mt-4 text-sm text-brand-dark-gray">
              {navigationConfig.searchHint}
            </p>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-pure-black/50"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="absolute top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-brand-linen shadow-2xl"
          >
            <div className="flex flex-col h-full p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={closeMobileMenu}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 -m-2 text-brand-text hover:text-brand-dark-gray transition-colors touch-manipulation"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-6">
                {navigationConfig.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-oswald text-2xl text-brand-text hover:text-brand-dark-gray transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Bottom Info */}
              <div className="mt-auto pt-8 border-t border-brand-border">
                <p className="font-roboto text-sm text-brand-dark-gray">
                  {navigationConfig.brandName} Magazine
                </p>
                <p className="font-roboto text-xs text-brand-light-gray mt-1">
                  Contemporary Art & Design
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
