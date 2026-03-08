// ============================================================
// Site Configuration
// Beauty Parlour / Salon Theme
// ============================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Lumière Beauty | Salon & Spa",
  description: "Discover the art of beauty at Lumière. Expert hair styling, skincare treatments, bridal makeup, nail art, and spa wellness — all under one roof.",
  language: "en",
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  links: NavLink[];
  searchPlaceholder: string;
  searchHint: string;
  searchAriaLabel: string;
  closeSearchAriaLabel: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Lumière",
  links: [
    { label: "Services", href: "#services" },
    { label: "Beauty Tips", href: "#beauty-tips" },
    { label: "Gallery", href: "#gallery" },
    { label: "Our Team", href: "#team" },
  ],
  searchPlaceholder: "Search services, beauty tips, treatments...",
  searchHint: "Press Enter to search or ESC to close",
  searchAriaLabel: "Search",
  closeSearchAriaLabel: "Close search",
};

// ============================================================
// Hero Section
// ============================================================

export interface HeroConfig {
  date: string;
  titleLine1: string;
  titleLine2: string;
  readTime: string;
  description: string;
  ctaText: string;
  image: string;
  imageAlt: string;
}

export const heroConfig: HeroConfig = {
  date: "March 8, 2026",
  titleLine1: "Bridal Glow Trends",
  titleLine2: "for Spring 2026",
  readTime: "7 min read",
  description: "From dewy skin to romantic waves — explore the most sought-after bridal beauty looks this season. Our expert stylists share insider tips to help every bride feel radiant on her big day.",
  ctaText: "Read Guide",
  image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=60&auto=format&fm=webp",
  imageAlt: "Bridal makeup and hair styling",
};

// ============================================================
// Latest Services / Featured Guides (Horizontal Scroll)
// ============================================================

export interface ArticleItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

export interface FeaturedArticle {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
}

export interface LatestArticlesConfig {
  sectionTitle: string;
  featuredArticle: FeaturedArticle;
  articles: ArticleItem[];
}

export const latestArticlesConfig: LatestArticlesConfig = {
  sectionTitle: "Our Signature Services",
  featuredArticle: {
    id: 0,
    title: "The Art of the Perfect Blowout",
    subtitle: "Salon secrets for long-lasting volume and shine",
    description: "Our master stylists reveal the professional techniques behind a flawless blowout — from the right brush to heat-protectant must-haves. Walk out with salon-quality results every time.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=55&auto=format&fm=webp",
    category: "Featured",
    readTime: "8 min read",
  },
  articles: [
    {
      id: 1,
      title: "Glass Skin Facials",
      subtitle: "Achieve a luminous, poreless complexion",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=50&auto=format&fm=webp",
      category: "Skin Care",
    },
    {
      id: 2,
      title: "Balayage & Highlights",
      subtitle: "Sun-kissed colour done by the experts",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=50&auto=format&fm=webp",
      category: "Hair Care",
    },
    {
      id: 3,
      title: "Nail Art Studio",
      subtitle: "From classic French tips to 3D nail art",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=50&auto=format&fm=webp",
      category: "Nail Care",
    },
    {
      id: 4,
      title: "Bridal Packages",
      subtitle: "Complete beauty for your most special day",
      image: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=400&q=50&auto=format&fm=webp",
      category: "Bridal",
    },
    {
      id: 5,
      title: "Aromatherapy Spa",
      subtitle: "Relax, restore, and rejuvenate your senses",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=50&auto=format&fm=webp",
      category: "Spa & Wellness",
    },
  ],
};

// ============================================================
// Beauty Tips / Blog Category Section
// ============================================================

export interface CategoryArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

export interface ArtCategoryConfig {
  sectionTitle: string;
  categoriesLabel: string;
  categories: string[];
  categoryImages: Record<string, string>;
  articles: CategoryArticle[];
  readSuffix: string;
}

export const artCategoryConfig: ArtCategoryConfig = {
  sectionTitle: "Latest Beauty Tips",
  categoriesLabel: "Categories",
  categories: ["All", "Hair Care", "Skin Care", "Makeup", "Nail Care", "Spa & Wellness"],
  categoryImages: {
    "All": "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=50&auto=format&fm=webp",
    "Hair Care": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=50&auto=format&fm=webp",
    "Skin Care": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=50&auto=format&fm=webp",
    "Makeup": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=50&auto=format&fm=webp",
    "Nail Care": "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=50&auto=format&fm=webp",
    "Spa & Wellness": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=50&auto=format&fm=webp",
  },
  articles: [
    // Hair Care
    {
      id: 1,
      title: "5 Ways to Repair Damaged Hair at Home",
      excerpt: "From deep conditioning masks to silk pillowcases — easy steps to restore shine and strength between salon visits.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Hair Care",
      readTime: "6",
    },
    {
      id: 2,
      title: "Trending Hair Colours for 2026",
      excerpt: "Copper rose, espresso brown, and platinum blonde — discover which shades are taking over this season.",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Hair Care",
      readTime: "5",
    },
    {
      id: 3,
      title: "The Ultimate Guide to Scalp Health",
      excerpt: "A healthy scalp is the foundation of beautiful hair. Here's how to keep it balanced and nourished.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Hair Care",
      readTime: "7",
    },
    // Skin Care
    {
      id: 4,
      title: "Morning vs. Evening Skincare Routines",
      excerpt: "Why your AM and PM routines should be completely different — and how to build each one effectively.",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Skin Care",
      readTime: "8",
    },
    {
      id: 5,
      title: "Ingredients Your Skin Actually Needs",
      excerpt: "Retinol, Vitamin C, Niacinamide — cutting through the noise on what really works.",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Skin Care",
      readTime: "6",
    },
    {
      id: 6,
      title: "SPF Every Day: Why It's Non-Negotiable",
      excerpt: "Sun protection is the single most effective anti-ageing step. Here's how to make it a habit.",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Skin Care",
      readTime: "4",
    },
    // Makeup
    {
      id: 7,
      title: "No-Makeup Makeup: The Effortless Look",
      excerpt: "Master the art of looking naturally polished with our step-by-step guide to the barely-there beauty trend.",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Makeup",
      readTime: "5",
    },
    {
      id: 8,
      title: "Long-Wear Makeup Tips for Every Occasion",
      excerpt: "From a 12-hour workday to a late-night event — how to keep your makeup flawless from dawn to dusk.",
      image: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Makeup",
      readTime: "6",
    },
    {
      id: 9,
      title: "Mastering the Bold Lip",
      excerpt: "Red, berry, or plum — how to choose the right bold lip shade for your skin tone and make it last.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Makeup",
      readTime: "4",
    },
    // Nail Care
    {
      id: 10,
      title: "Nail Art Trends Dominating 2026",
      excerpt: "Chrome powder, botanical prints, and aura nails — the designs our clients can't stop requesting.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Nail Care",
      readTime: "5",
    },
    {
      id: 11,
      title: "Gel vs. Acrylic: Which Is Right for You?",
      excerpt: "A straightforward comparison to help you choose the nail enhancement that fits your lifestyle.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=350&fit=crop&q=60&fm=webp",
      category: "Nail Care",
      readTime: "4",
    },
    // Spa & Wellness
    {
      id: 12,
      title: "The Benefits of a Monthly Facial",
      excerpt: "Why consistent professional skin treatments outperform sporadic at-home routines — every time.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=350&fit=crop&q=50&fm=webp",
      category: "Spa & Wellness",
      readTime: "6",
    },
  ],
  readSuffix: " min read",
};

// ============================================================
// Lifestyle → Salon Ambience / Behind the Scenes Section
// ============================================================

export interface LifestyleArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  rotation: number;
  position: { x: number; y: number };
  baseZIndex?: number;
}

export interface LifestyleConfig {
  sectionTitle: string;
  viewMoreText: string;
  articles: LifestyleArticle[];
}

export const lifestyleConfig: LifestyleConfig = {
  sectionTitle: "Inside Lumière",
  viewMoreText: "See More",
  articles: [
    {
      id: 1,
      title: "Our Styling Suites",
      excerpt: "A serene space designed for your comfort",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=750&fit=crop&q=55&fm=webp",
      rotation: -6,
      position: { x: 0, y: 0 },
      baseZIndex: 10,
    },
    {
      id: 2,
      title: "Colour Bar",
      excerpt: "Where transformation begins",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=750&fit=crop&q=55&fm=webp",
      rotation: 4,
      position: { x: 200, y: 40 },
      baseZIndex: 20,
    },
    {
      id: 3,
      title: "Bridal Suite",
      excerpt: "Your own private wedding day sanctuary",
      image: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=500&h=750&fit=crop&q=55&fm=webp",
      rotation: -3,
      position: { x: 400, y: -20 },
      baseZIndex: 30,
    },
    {
      id: 4,
      title: "Spa Lounge",
      excerpt: "Unwind before your treatment",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=750&fit=crop&q=55&fm=webp",
      rotation: 7,
      position: { x: 100, y: 280 },
      baseZIndex: 40,
    },
    {
      id: 5,
      title: "Nail Studio",
      excerpt: "Precision artistry at your fingertips",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=750&fit=crop&q=55&fm=webp",
      rotation: -5,
      position: { x: 300, y: 320 },
      baseZIndex: 50,
    },
  ],
};

// ============================================================
// Design → Services Showcase Section
// ============================================================

export interface DesignItem {
  id: number;
  title: string;
  quote: string;
  image: string;
  size: string;
  gridColumn?: number;
}

export interface DesignConfig {
  sectionTitle: string;
  viewMoreText: string;
  items: DesignItem[];
}

export const designConfig: DesignConfig = {
  sectionTitle: "Services",
  viewMoreText: "View All Services",
  items: [
    {
      id: 1,
      title: "Precision Cuts",
      quote: "\"A great haircut is the best accessory you can wear.\"",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=500&fit=crop&q=55&fm=webp",
      size: "normal",
    },
    {
      id: 2,
      title: "Colour Transformations",
      quote: "\"Colour speaks the language of confidence.\"",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&h=500&fit=crop&q=55&fm=webp",
      size: "wide",
      gridColumn: 2,
    },
    {
      id: 3,
      title: "Luxury Facials",
      quote: "\"Glowing skin is always in season.\"",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=750&fit=crop&q=55&fm=webp",
      size: "tall",
    },
    {
      id: 4,
      title: "Bridal Makeup",
      quote: "\"Beauty begins the moment you decide to be yourself.\"",
      image: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=500&h=500&fit=crop&q=55&fm=webp",
      size: "normal",
    },
    {
      id: 5,
      title: "Spa Rituals",
      quote: "\"Rest is not idle — it is the foundation of renewal.\"",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=500&fit=crop&q=55&fm=webp",
      size: "normal",
    },
    {
      id: 6,
      title: "Nail Artistry",
      quote: "\"Details make perfection, and perfection is in the details.\"",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop&q=55&fm=webp",
      size: "normal",
    },
  ],
};

// ============================================================
// Green Tribe → Loyalty / Community Section
// ============================================================

export interface TribeMember {
  id: number;
  name: string;
  role: string;
  title: string;
  excerpt: string;
  avatar: string;
}

export interface GreenTribeConfig {
  sectionTitle: string;
  sectionDescription: string;
  readMoreText: string;
  joinTitle: string;
  joinDescription: string;
  emailPlaceholder: string;
  subscribeText: string;
  memberCountText: string;
  videoSrc: string;
  videoPoster: string;
  members: TribeMember[];
}

export const greenTribeConfig: GreenTribeConfig = {
  sectionTitle: "Lumière Club",
  sectionDescription: "Join our exclusive community of beauty lovers and get early access to new treatments, seasonal offers, and expert tips delivered to your inbox.",
  readMoreText: "Read Full Story",
  joinTitle: "Become a Member",
  joinDescription: "Sign up for weekly beauty inspiration, exclusive member discounts, and priority booking.",
  emailPlaceholder: "Your email address",
  subscribeText: "Join Now",
  memberCountText: "8,214 members and growing",
  videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-68-large.mp4",
  videoPoster: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=675&fit=crop&q=55&fm=webp",
  members: [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Master Stylist",
      title: "The Science Behind Healthy Hair Colour",
      excerpt: "How we choose ammonia-free, nourishing formulas that protect every strand while delivering stunning results.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=60&fm=webp",
    },
    {
      id: 2,
      name: "Aisha Okonkwo",
      role: "Skin Therapist",
      title: "Customised Facials for Every Skin Type",
      excerpt: "No two skins are the same. Here's how our therapists tailor every facial to your unique concerns.",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&q=60&fm=webp",
    },
    {
      id: 3,
      name: "Mei Lin",
      role: "Nail Artist",
      title: "From Sketch to Fingertip: Our Design Process",
      excerpt: "How our nail artists bring custom designs to life — from initial consultation to the finishing top coat.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&q=60&fm=webp",
    },
  ],
};

// ============================================================
// Authors → Our Expert Team Section
// ============================================================

export interface Author {
  id: number;
  name: string;
  role: string;
  avatar: string;
  articles: number;
  social: { instagram: string; twitter: string };
}

export interface AuthorsConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  articlesSuffix: string;
  authors: Author[];
}

export const authorsConfig: AuthorsConfig = {
  sectionTitle: "Meet Our Team",
  sectionSubtitle: "Drag or click to explore our experts",
  articlesSuffix: "treatments",
  authors: [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Master Stylist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&q=60&fm=webp",
      articles: 320,
      social: { instagram: "#", twitter: "#" },
    },
    {
      id: 2,
      name: "James Osei",
      role: "Colour Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&q=60&fm=webp",
      articles: 210,
      social: { instagram: "#", twitter: "#" },
    },
    {
      id: 3,
      name: "Mei Lin",
      role: "Nail Artist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&q=60&fm=webp",
      articles: 185,
      social: { instagram: "#", twitter: "#" },
    },
    {
      id: 4,
      name: "Aisha Okonkwo",
      role: "Skin Therapist",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&q=60&fm=webp",
      articles: 274,
      social: { instagram: "#", twitter: "#" },
    },
    {
      id: 5,
      name: "Sophie Laurent",
      role: "Bridal Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&q=60&fm=webp",
      articles: 143,
      social: { instagram: "#", twitter: "#" },
    },
  ],
};

// ============================================================
// Instagram Gallery → Salon Gallery Section
// ============================================================

export interface InstagramImage {
  id: number;
  image: string;
  likes: number;
}

export interface InstagramGalleryConfig {
  handle: string;
  handleUrl: string;
  description: string;
  followText: string;
  likesSuffix: string;
  images: InstagramImage[];
}

export const instagramGalleryConfig: InstagramGalleryConfig = {
  handle: "@lumiere.salon",
  handleUrl: "https://instagram.com",
  description: "Follow us for daily beauty inspiration, before & afters, and behind-the-scenes moments",
  followText: "Follow Us",
  likesSuffix: "loves",
  images: [
    { id: 1, image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=350&h=350&fit=crop&q=50&fm=webp", likes: 3241 },
    { id: 2, image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=350&h=350&fit=crop&q=50&fm=webp", likes: 2187 },
    { id: 3, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=350&h=350&fit=crop&q=50&fm=webp", likes: 4052 },
    { id: 4, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=350&h=350&fit=crop&q=50&fm=webp", likes: 1876 },
    { id: 5, image: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=350&h=350&fit=crop&q=50&fm=webp", likes: 3609 },
    { id: 6, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=350&h=350&fit=crop&q=50&fm=webp", likes: 2341 },
    { id: 7, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=350&h=350&fit=crop&q=50&fm=webp", likes: 2784 },
    { id: 8, image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=350&h=350&fit=crop&q=50&fm=webp", likes: 1953 },
  ],
};

// ============================================================
// Footer
// ============================================================

export interface FooterConfig {
  brandWatermark: string;
  newsletterTitle: string;
  newsletterDescription: string;
  emailPlaceholder: string;
  subscribeText: string;
  subscribeSuccessMessage: string;
  categoriesLabel: string;
  categories: string[];
  pagesLabel: string;
  pages: string[];
  legalLabel: string;
  legalLinks: string[];
  socialLabel: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
  backToTopText: string;
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  brandWatermark: "Lumière",
  newsletterTitle: "Stay Beautiful",
  newsletterDescription: "Subscribe for weekly beauty tips, exclusive member offers, and first access to new treatments at Lumière.",
  emailPlaceholder: "Your email address",
  subscribeText: "Subscribe",
  subscribeSuccessMessage: "Welcome to Lumière! Check your inbox for a special welcome gift.",
  categoriesLabel: "Services",
  categories: ["Hair Care", "Skin Care", "Makeup", "Bridal Packages", "Spa & Wellness", "Nail Care"],
  pagesLabel: "Pages",
  pages: ["About Us", "Book an Appointment", "Gift Cards", "Careers", "Press"],
  legalLabel: "Legal",
  legalLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  socialLabel: "Follow Us",
  socialLinks: {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
  backToTopText: "Back to Top",
  copyright: "© 2026 Lumière Beauty Salon. All rights reserved.",
  credit: "Crafted with care for beauty and elegance",
};