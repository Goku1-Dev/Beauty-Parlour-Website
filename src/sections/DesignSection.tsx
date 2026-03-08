import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { designConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const DesignSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Title animation with mask effect
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Cascade reveal for grid items
      const gridItems = gridRef.current?.querySelectorAll('.design-tile');
      if (gridItems) {
        gridItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
              },
              delay: (index % 3) * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTileHover = (id: number | null) => {
    if (!isMobile) {
      setHoveredItem(id);
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'tall':
        return 'row-span-1 sm:row-span-2';
      case 'wide':
        return 'col-span-1 sm:col-span-2';
      default:
        return '';
    }
  };

  if (!designConfig.sectionTitle && designConfig.items.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} id="design" className="relative py-16 sm:py-20 lg:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Title with mask effect */}
        <div ref={titleRef} className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-oswald font-extralight text-4xl sm:text-5xl lg:text-6xl xl:text-8xl text-brand-text relative inline-block">
            {designConfig.sectionTitle}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-linen/50 to-transparent mix-blend-overlay pointer-events-none" />
          </h2>
        </div>

        {/* Mosaic Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2"
        >
          {designConfig.items.map((item) => (
            <div
              key={item.id}
              className={`design-tile group relative overflow-hidden cursor-hover ${getSizeClasses(item.size)}`}
              style={item.gridColumn && !isMobile ? { gridColumn: `span ${item.gridColumn}` } : undefined}
              onMouseEnter={() => handleTileHover(item.id)}
              onMouseLeave={() => handleTileHover(null)}
            >
              {/* Image - Grayscale to Color */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-700 ease-expo-out ${
                    !isMobile && hoveredItem === item.id
                      ? 'grayscale-0 scale-110'
                      : 'grayscale scale-100'
                  }`}
                  loading="lazy"
                />

                {/* Magnifier effect overlay */}
                <div
                  className={`absolute inset-0 bg-brand-pure-black/60 flex flex-col justify-end p-3 sm:p-4 lg:p-6 transition-opacity duration-500 ${
                    !isMobile && hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <h3 className="font-oswald font-light text-base sm:text-lg lg:text-2xl text-white">
                    {item.title}
                  </h3>
                  {item.quote && (
                    <p className="font-roboto text-xs sm:text-sm text-white/70 mt-1 sm:mt-2 italic line-clamp-2">
                      {item.quote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-8 sm:mt-12 text-center">
          <a
            href="#"
            className="inline-block font-roboto text-sm uppercase tracking-widest text-brand-dark-gray hover:text-brand-text transition-colors cursor-hover relative group"
          >
            {designConfig.viewMoreText}
            <span className="absolute bottom-0 left-0 w-full h-px bg-brand-text transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
