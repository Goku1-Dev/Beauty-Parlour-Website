import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artCategoryConfig } from "@/config";

gsap.registerPlugin(ScrollTrigger);

const ArtCategory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const categoryImageRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState(
    artCategoryConfig?.categories?.[0] || "All"
  );
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter articles
  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") {
      return artCategoryConfig.articles;
    }

    return artCategoryConfig.articles.filter(
      (article) => article.category === activeCategory
    );
  }, [activeCategory]);

  // Group articles
  // const groupedArticles = useMemo(() => {
  //   if (activeCategory !== "All") {
  //     return { [activeCategory]: filteredArticles };
  //   }

  //   const groups: Record<string, typeof artCategoryConfig.articles> = {};

  //   artCategoryConfig.categories.forEach((cat) => {
  //     if (cat !== "All") {
  //       const catArticles = artCategoryConfig.articles.filter(
  //         (article) => article.category === cat
  //       );

  //       if (catArticles.length > 0) {
  //         groups[cat] = catArticles;
  //       }
  //     }
  //   });

  //   return groups;
  // }, [activeCategory, filteredArticles]);

  // Current category image
  const currentCategoryImage =
    artCategoryConfig.categoryImages?.[activeCategory] ||
    artCategoryConfig.categoryImages?.["All"] ||
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=750&fit=crop";

  // GSAP animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (categoryImageRef.current) {
        gsap.fromTo(
          categoryImageRef.current,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: categoryImageRef.current,
              start: "top 80%",
            },
          }
        );
      }

      const sidebarElements =
        sidebarRef.current?.querySelectorAll(".sidebar-item");

      if (sidebarElements) {
        gsap.fromTo(
          sidebarElements,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (!isMobile && sidebarRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: sidebarRef.current,
          pinSpacing: false,
        });
      }

      if (categoryImageRef.current && sectionRef.current) {
        gsap.to(categoryImageRef.current, {
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Article animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !contentRef.current) return;

    const articles = contentRef.current.querySelectorAll(".article-item");

    gsap.fromTo(
      articles,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [activeCategory]);

  // Image animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !categoryImageRef.current) return;

    const img = categoryImageRef.current.querySelector("img");

    if (!img) return;

    gsap.fromTo(
      img,
      { scale: 1.1, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [activeCategory]);

  // ✅ Condition moved AFTER hooks
  if (!artCategoryConfig?.sectionTitle && !artCategoryConfig?.articles?.length) {
    return null;
  }

  return (
    <section ref={sectionRef} id="art" className="relative py-16 sm:py-20 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12 lg:mb-20">
          <h2 className="font-oswald font-light text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-brand-text">
            {artCategoryConfig.sectionTitle}
          </h2>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">

          {/* Sidebar */}
          <div ref={sidebarRef} className="lg:col-span-3 lg:sticky lg:top-32 h-fit">

            <div className="sidebar-item">
              <h3 className="font-oswald text-xs uppercase tracking-widest text-brand-dark-gray mb-4">
                {artCategoryConfig.categoriesLabel}
              </h3>

              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2">

                {artCategoryConfig.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left text-sm py-2 px-3 transition-all duration-300 whitespace-nowrap
                    ${
                      activeCategory === cat
                        ? "bg-brand-text text-brand-linen"
                        : "text-brand-dark-gray hover:text-brand-text hover:bg-brand-border/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}

              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">

            {/* Category Image */}
            <div className="mb-8 sm:mb-12 lg:mb-16">

              <div
                ref={categoryImageRef}
                className="relative aspect-[16/9] overflow-hidden"
              >

                <img
                  src={currentCategoryImage}
                  alt={activeCategory}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              </div>

            </div>

            {/* Articles */}
            <div ref={contentRef}>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredArticles.map((article) => (
                  <article key={article.id} className="article-item group">

                    <div className="relative aspect-[3/2] overflow-hidden mb-4">

                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                    </div>

                    <span className="text-xs uppercase text-gray-500">
                      {article.category}
                    </span>

                    <h4 className="text-lg mt-1">{article.title}</h4>

                    <p className="text-sm mt-2 text-gray-600">
                      {article.excerpt}
                    </p>

                  </article>
                ))}

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtCategory;