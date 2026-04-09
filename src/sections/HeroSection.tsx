import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { heroConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initial entry animation
      const entryTl = gsap.timeline({ delay: 0.5 });

      // Image 3D unfold
      entryTl.fromTo(
        imageContainerRef.current,
        { rotateX: 90, opacity: 0, transformOrigin: 'bottom center' },
        { rotateX: 0, opacity: 1, duration: 1.5, ease: 'expo.out' }
      );

      // Title mask reveal
      entryTl.fromTo(
        titleRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' },
        '-=1'
      );

      // Content fade up
      entryTl.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Date vertical slide
      entryTl.fromTo(
        dateRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      // Scroll-triggered parallax
      gsap.to(imageRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Title horizontal drift on scroll
      gsap.to(titleRef.current, {
        x: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const rotateXTo = useRef<gsap.QuickToFunc | null>(null);
  const rotateYTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      rotateXTo.current = gsap.quickTo(imageRef.current, 'rotateX', { duration: 0.5, ease: 'power2.out' });
      rotateYTo.current = gsap.quickTo(imageRef.current, 'rotateY', { duration: 0.5, ease: 'power2.out' });
    }
  }, []);

  // Liquid distortion effect on mouse move (desktop only)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || window.innerWidth < 1024) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (rotateXTo.current && rotateYTo.current) {
      rotateXTo.current(-y * 5);
      rotateYTo.current(x * 5);
    }
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;

    if (rotateXTo.current && rotateYTo.current) {
      rotateXTo.current(0);
      rotateYTo.current(0);
    }
  };

  if (!heroConfig.titleLine1 && !heroConfig.titleLine2) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left: Image with 3D perspective */}
          <div
            ref={imageContainerRef}
            className="relative perspective-2000 order-2 lg:order-1"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Date - Vertical (desktop only) */}
            <div
              ref={dateRef}
              className="absolute -left-8 xl:-left-12 top-1/2 -translate-y-1/2 hidden xl:block"
            >
              <span className="font-roboto text-xs tracking-widest text-brand-dark-gray"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {heroConfig.date}
              </span>
            </div>

            <div className="relative preserve-3d">
              <img
                ref={imageRef}
                src={heroConfig.image}
                alt={heroConfig.imageAlt}
                className="w-full h-auto max-w-md sm:max-w-lg mx-auto lg:max-w-none aspect-square object-cover"
                style={{ transformStyle: 'preserve-3d' }}
              />

              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-linen/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:pl-4 xl:pl-8 flex flex-col justify-center order-1 lg:order-2">
            <div className="xl:hidden mb-3 sm:mb-4">
              <span className="font-roboto text-xs tracking-widest text-brand-dark-gray">
                {heroConfig.date}
              </span>
            </div>

            <div className="overflow-hidden mb-4 sm:mb-6 pb-1">
              <h1
                ref={titleRef}
                className="font-oswald font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-brand-text leading-[1.15] tracking-tight"
              >
                {heroConfig.titleLine1}
                <br />
                <span className="font-medium">{heroConfig.titleLine2}</span>
              </h1>
            </div>

            <div ref={contentRef}>
              <p className="font-roboto text-sm text-brand-dark-gray mb-2">
                {heroConfig.readTime}
              </p>

              <p className="font-roboto text-sm sm:text-base lg:text-lg text-brand-dark-gray leading-relaxed mb-6 sm:mb-8 max-w-md">
                {heroConfig.description}
              </p>

              <a
                href="#"
                className="group inline-flex items-center gap-2 sm:gap-3 font-roboto text-sm uppercase tracking-wider text-brand-text hover:text-brand-dark-gray transition-colors cursor-hover magnetic"
              >
                <span className="relative">
                  {heroConfig.ctaText}
                  <span className="absolute bottom-0 left-0 w-full h-px bg-brand-text transform origin-left transition-transform duration-500 group-hover:scale-x-0" />
                </span>
                <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-brand-border to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-brand-border to-transparent" />
    </section>
  );
};

export default HeroSection;
