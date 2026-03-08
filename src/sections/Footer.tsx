import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Instagram, Twitter, Youtube } from 'lucide-react';
import { footerConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Footer reveal animation
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  if (!footerConfig.copyright && !footerConfig.newsletterTitle) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(footerConfig.subscribeSuccessMessage);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      id="about"
      className={`relative py-16 sm:py-20 lg:py-32 transition-colors duration-500 ${
        isEmailFocused ? 'bg-brand-text' : 'bg-brand-linen'
      }`}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -bottom-10 sm:-bottom-20 -right-4 sm:-right-10 font-oswald font-extralight text-[30vw] sm:text-[20vw] leading-none select-none transition-colors duration-500 ${
            isEmailFocused ? 'text-brand-dark-gray/10' : 'text-brand-border'
          }`}
        >
          {footerConfig.brandWatermark}
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-8 sm:gap-8 lg:gap-8">
          {/* Newsletter - full width on mobile, 4 columns on desktop */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4 mb-4 sm:mb-6 lg:mb-0">
            <h3
              className={`font-oswald font-light text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-linen' : 'text-brand-text'
              }`}
            >
              {footerConfig.newsletterTitle}
            </h3>
            <p
              className={`font-roboto text-sm mb-4 sm:mb-6 transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-light-gray' : 'text-brand-dark-gray'
              }`}
            >
              {footerConfig.newsletterDescription}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                placeholder={footerConfig.emailPlaceholder}
                required
                className={`w-full px-0 py-2.5 sm:py-3 bg-transparent border-b text-sm focus:outline-none transition-colors duration-500 ${
                  isEmailFocused
                    ? 'border-brand-light-gray text-brand-linen placeholder:text-brand-dark-gray'
                    : 'border-brand-border text-brand-text placeholder:text-brand-light-gray focus:border-brand-text'
                }`}
              />
              <button
                type="submit"
                className={`px-5 sm:px-6 py-2.5 sm:py-3 font-roboto text-sm uppercase tracking-wider transition-colors duration-300 cursor-hover ${
                  isEmailFocused
                    ? 'bg-brand-linen text-brand-text hover:bg-brand-border'
                    : 'bg-brand-text text-brand-linen hover:bg-brand-dark-gray'
                }`}
              >
                {footerConfig.subscribeText}
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4
              className={`font-oswald text-xs uppercase tracking-widest mb-3 sm:mb-4 transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-light-gray' : 'text-brand-dark-gray'
              }`}
            >
              {footerConfig.categoriesLabel}
            </h4>
            <ul className="space-y-2">
              {footerConfig.categories.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`font-roboto text-sm transition-colors duration-300 cursor-hover ${
                      isEmailFocused
                        ? 'text-brand-linen hover:text-brand-light-gray'
                        : 'text-brand-text hover:text-brand-dark-gray'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <h4
              className={`font-oswald text-xs uppercase tracking-widest mb-3 sm:mb-4 transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-light-gray' : 'text-brand-dark-gray'
              }`}
            >
              {footerConfig.pagesLabel}
            </h4>
            <ul className="space-y-2">
              {footerConfig.pages.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`font-roboto text-sm transition-colors duration-300 cursor-hover ${
                      isEmailFocused
                        ? 'text-brand-linen hover:text-brand-light-gray'
                        : 'text-brand-text hover:text-brand-dark-gray'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4
              className={`font-oswald text-xs uppercase tracking-widest mb-3 sm:mb-4 transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-light-gray' : 'text-brand-dark-gray'
              }`}
            >
              {footerConfig.legalLabel}
            </h4>
            <ul className="space-y-2">
              {footerConfig.legalLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`font-roboto text-sm transition-colors duration-300 cursor-hover ${
                      isEmailFocused
                        ? 'text-brand-linen hover:text-brand-light-gray'
                        : 'text-brand-text hover:text-brand-dark-gray'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Back to Top */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 flex flex-row sm:flex-col justify-between lg:justify-start gap-4">
            <div>
              <h4
                className={`font-oswald text-xs uppercase tracking-widest mb-3 sm:mb-4 transition-colors duration-500 ${
                  isEmailFocused ? 'text-brand-light-gray' : 'text-brand-dark-gray'
                }`}
              >
                {footerConfig.socialLabel}
              </h4>
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href={footerConfig.socialLinks.instagram}
                  className={`transition-colors duration-300 cursor-hover ${
                    isEmailFocused
                      ? 'text-brand-linen hover:text-brand-light-gray'
                      : 'text-brand-text hover:text-brand-dark-gray'
                  }`}
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href={footerConfig.socialLinks.twitter}
                  className={`transition-colors duration-300 cursor-hover ${
                    isEmailFocused
                      ? 'text-brand-linen hover:text-brand-light-gray'
                      : 'text-brand-text hover:text-brand-dark-gray'
                  }`}
                  aria-label="Twitter"
                >
                  <Twitter size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href={footerConfig.socialLinks.youtube}
                  className={`transition-colors duration-300 cursor-hover ${
                    isEmailFocused
                      ? 'text-brand-linen hover:text-brand-light-gray'
                      : 'text-brand-text hover:text-brand-dark-gray'
                  }`}
                  aria-label="YouTube"
                >
                  <Youtube size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className={`inline-flex items-center gap-2 font-roboto text-xs uppercase tracking-wider transition-colors duration-300 cursor-hover group ${
                isEmailFocused
                  ? 'text-brand-linen hover:text-brand-light-gray'
                  : 'text-brand-text hover:text-brand-dark-gray'
              }`}
            >
              {footerConfig.backToTopText}
              <ArrowUp size={14} className="transform transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 sm:mt-16 pt-6 sm:pt-8 border-t transition-colors duration-500 ${
            isEmailFocused ? 'border-brand-dark-gray' : 'border-brand-border'
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p
              className={`font-roboto text-xs transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-dark-gray' : 'text-brand-light-gray'
              }`}
            >
              {footerConfig.copyright}
            </p>
            <p
              className={`font-roboto text-xs transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-dark-gray' : 'text-brand-light-gray'
              }`}
            >
              {footerConfig.credit}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
