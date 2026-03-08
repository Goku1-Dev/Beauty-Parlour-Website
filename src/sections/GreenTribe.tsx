import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { greenTribeConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const GreenTribe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Video playback rate based on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              if (videoRef.current) {
                videoRef.current.playbackRate = 0.5 + self.progress * 1.5;
              }
            },
          },
        });
      }

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.tribe-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
              },
              delay: index * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!greenTribeConfig.sectionTitle && greenTribeConfig.members.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} id="green-tribe" className="relative min-h-screen py-16 sm:py-20 lg:py-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale contrast-125"
          poster={greenTribeConfig.videoPoster}
        >
          <source src={greenTribeConfig.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-linen/70" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12 lg:mb-20">
          <h2 className="font-oswald font-light text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-brand-text">
            {greenTribeConfig.sectionTitle}
          </h2>
          <p className="font-roboto text-sm sm:text-base text-brand-dark-gray mt-3 sm:mt-4 max-w-md">
            {greenTribeConfig.sectionDescription}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Main Cards - 8 columns */}
          <div ref={cardsRef} className="lg:col-span-8 space-y-4 sm:space-y-6">
            {greenTribeConfig.members.map((member) => (
              <article
                key={member.id}
                className="tribe-card glass p-4 sm:p-6 lg:p-8 group cursor-hover backdrop-blur-xl"
                style={{
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden mx-auto sm:mx-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                      <h4 className="font-oswald font-medium text-base sm:text-lg text-brand-text">
                        {member.name}
                      </h4>
                      <span className="font-roboto text-xs text-brand-light-gray">
                        {member.role}
                      </span>
                    </div>

                    <h3 className="font-oswald font-light text-lg sm:text-xl lg:text-2xl text-brand-text mb-2 sm:mb-3 group-hover:text-brand-dark-gray transition-colors">
                      {member.title}
                    </h3>

                    <p className="font-roboto text-sm text-brand-dark-gray leading-relaxed mb-3 sm:mb-4">
                      {member.excerpt}
                    </p>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 font-roboto text-xs uppercase tracking-wider text-brand-text hover:text-brand-dark-gray transition-colors"
                    >
                      {greenTribeConfig.readMoreText}
                      <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit mt-6 sm:mt-8 lg:mt-0">
            <div className="glass p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
              <h3 className="font-oswald text-lg sm:text-xl text-brand-text mb-3 sm:mb-4">
                {greenTribeConfig.joinTitle}
              </h3>
              <p className="font-roboto text-sm text-brand-dark-gray mb-4 sm:mb-6">
                {greenTribeConfig.joinDescription}
              </p>

              <form className="space-y-3 sm:space-y-4">
                <input
                  type="email"
                  placeholder={greenTribeConfig.emailPlaceholder}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border border-brand-border text-brand-text placeholder:text-brand-light-gray text-sm focus:outline-none focus:border-brand-text transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-brand-text text-brand-linen font-roboto text-sm uppercase tracking-wider hover:bg-brand-dark-gray transition-colors cursor-hover"
                >
                  {greenTribeConfig.subscribeText}
                </button>
              </form>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-brand-border">
                <p className="font-roboto text-xs text-brand-light-gray">
                  {greenTribeConfig.memberCountText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenTribe;
