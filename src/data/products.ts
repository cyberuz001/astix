import { Product, StoryArticle, CraftFeature } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'astix-v1-white',
    name: 'ASTIX V1',
    category: 'sneakers',
    colorway: 'White / Crimson',
    colorwayCode: 'white-crimson',
    price: 290,
    image: '/sneaker-white.png',
    images: ['/sneaker-white.png', '/sneaker-black.png', '/sneaker-crimson.png'],
    description: 'The foundation silhouette of ASTIX. Engineered around fluid biomechanics, featuring sculpted multi-density EVA midsoles, tactile breathable mesh panels, and precision laser-etched ASTIX monogram detailing.',
    details: [
      'Multi-density sculpted kinetic midsole',
      'Dual-texture technical mesh & micro-grain leather',
      'Integrated crimson dynamic arch support',
      'ASTIX signature debossed heel & tongue insignia',
      'Engineered in Milan / Fabricated in Portugal'
    ],
    sizes: ['US 7', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    badge: 'Iconic Debut',
    isNew: true
  },
  {
    id: 'astix-v1-black',
    name: 'ASTIX V1 Shadow',
    category: 'sneakers',
    colorway: 'Black / Crimson',
    colorwayCode: 'black-crimson',
    price: 290,
    image: '/sneaker-black.png',
    images: ['/sneaker-black.png', '/sneaker-white.png', '/sneaker-crimson.png'],
    description: 'Stealth exterior constructed with matte technical microfibers and deep crimson kinetic windows. Designed for low-light metropolitan presence and uncompromising structural support.',
    details: [
      'Matte obsidian technical composite chassis',
      'Exposed crimson air-dampener chamber',
      'Laser-perforated toe box with moisture-wicking barrier',
      'High-traction directional rubber outsole',
      'Ortholite memory-response dual footbed'
    ],
    sizes: ['US 7', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    isNew: false
  },
  {
    id: 'astix-v1-crimson',
    name: 'ASTIX V1 Crimson Mono',
    category: 'sneakers',
    colorway: 'Crimson / Dark Black',
    colorwayCode: 'crimson-black',
    price: 310,
    image: '/sneaker-crimson.png',
    images: ['/sneaker-crimson.png', '/sneaker-white.png', '/sneaker-black.png'],
    description: 'A striking saturation statement crafted in bespoke deep-crimson technical leather and wine-infused structural mesh. Completed with dark contrast vulcanized outsole elements.',
    details: [
      'Full deep-crimson aniline leather & ballistic mesh',
      'Dark burgundy sculpted lateral stabiliser bridge',
      'Tonal debossed ASTIX monogram quarter panel',
      'Carbon-fiber composite torsion bar',
      'Limited production run: 450 worldwide'
    ],
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    badge: 'Limited Edition',
    isNew: true
  },
  {
    id: 'astix-shell-01-white',
    name: 'ASTIX Shell 01',
    category: 'jackets',
    colorway: 'White / Crimson',
    colorwayCode: 'white-crimson',
    price: 480,
    image: '/jacket-white.png',
    images: ['/jacket-white.png', '/jacket-black.png', '/jacket-crimson.png'],
    description: '3-layer technical storm shell engineered from recycled Japanese nylon with bonded waterproof seams. Features an articulated storm hood lined with repeating crimson ASTIX monogram pattern.',
    details: [
      '3-Layer 20,000mm waterproof / 15,000g breathability membrane',
      'Internal micro-grid lining with custom ASTIX monogram repeat',
      'YKK AquaGuard sealed crimson contrast zippers',
      'Magnetic storm flap with hidden media pocket',
      'Articulated ergonomic sleeves for unrestricted motion'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Signature Outerwear',
    isNew: true
  },
  {
    id: 'astix-shell-01-black',
    name: 'ASTIX Shell 01 Noir',
    category: 'jackets',
    colorway: 'Black / Crimson',
    colorwayCode: 'black-crimson',
    price: 480,
    image: '/jacket-black.png',
    images: ['/jacket-black.png', '/jacket-white.png', '/jacket-crimson.png'],
    description: 'An architectural outerwear masterpiece in matte obsidian. Engineered with ergonomic seam welding, crimson piping accents, and customized silicone ASTIX zipper pulls.',
    details: [
      'Matte obsidian ripstop with DWR fluorocarbon-free treatment',
      'Contrast crimson taped thermal seam borders',
      'Internal chest pocket with RFID shielding',
      'Adjustable dual-point storm hood with laminated visor',
      'Integrated underarm ventilation apertures'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: false
  },
  {
    id: 'astix-shell-01-crimson',
    name: 'ASTIX Shell 01 Crimson Edition',
    category: 'jackets',
    colorway: 'Crimson / Dark Black',
    colorwayCode: 'crimson-black',
    price: 510,
    image: '/jacket-crimson.png',
    images: ['/jacket-crimson.png', '/jacket-white.png', '/jacket-black.png'],
    description: 'Dressed in ASTIX signature deep-crimson technical shell fabric with burgundy contouring. An uncompromising union of high-performance weatherproofing and modern runway tailoring.',
    details: [
      'Signature crimson 3-layer breathable micro-twill',
      'Laser-cut ASTIX chest insignia in matte titanium finish',
      'Internal harness system for hands-free carry when unzipped',
      'Thermal micro-fleece chin guard',
      'Numbered atelier certificate included'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Atelier Edition',
    isNew: true
  },
  {
    id: 'astix-sling-pack',
    name: 'ASTIX Modular Sling',
    category: 'accessories',
    colorway: 'Black / Crimson',
    colorwayCode: 'black-crimson',
    price: 140,
    image: '/sneaker-black.png',
    images: ['/sneaker-black.png'],
    description: 'Ergonomic cross-body technical sling forged with Cordura ballistic nylon, magnetic Fidlock V-buckle, and embossed ASTIX emblem.',
    details: [
      'Ballistic 1000D Cordura weatherproof chassis',
      'German-engineered Fidlock magnetic quick-release buckle',
      'Crimson waterproof seam taping',
      'Modular attachment loops for modular pouches'
    ],
    sizes: ['One Size'],
    isNew: false
  },
  {
    id: 'astix-tech-cap',
    name: 'ASTIX Architectural Cap',
    category: 'accessories',
    colorway: 'White / Crimson',
    colorwayCode: 'white-crimson',
    price: 85,
    image: '/sneaker-white.png',
    images: ['/sneaker-white.png'],
    description: 'Unstructured five-panel technical cap crafted in breathable water-repellent shell with silicone micro ASTIX mark.',
    details: [
      'Ultralight 4-way stretch technical ripstop',
      'Adjustable webbing closure with anodized aluminum clip',
      'Laser-perforated side ventilation panels',
      'Absorbent Coolmax interior sweatband'
    ],
    sizes: ['One Size'],
    isNew: false
  }
];

export const CRAFT_FEATURES: CraftFeature[] = [
  {
    id: 'craft-1',
    number: '01',
    title: 'ENGINEERED MESH',
    subtitle: 'Kinetic Breathability',
    description: 'Custom woven dual-layer textile engineered to deliver directional elasticity and maximum airflow across dynamic foot flexing zones.',
    image: '/sneaker-white.png',
    cropPosition: 'center 40%'
  },
  {
    id: 'craft-2',
    number: '02',
    title: 'SCULPTED SOLE',
    subtitle: 'Architectural Midsole',
    description: 'Multi-density EVA geometry with integrated crimson dampener core that absorbs impact while preserving structural elegance.',
    image: '/sneaker-black.png',
    cropPosition: 'center 75%'
  },
  {
    id: 'craft-3',
    number: '03',
    title: '3-LAYER SHELL',
    subtitle: 'Hydrophobic Membrane',
    description: '20,000mm Japanese technical membrane bonded with micro-grid interior lining for total weather protection with zero rigidity.',
    image: '/jacket-white.png',
    cropPosition: 'center 35%'
  },
  {
    id: 'craft-4',
    number: '04',
    title: 'THE ASTIX GLYPH',
    subtitle: 'Iconic Integration',
    description: 'Subtly integrated across tongue, quarter panel, zipper pulls, and interior lining — an abstract emblem of speed, balance, and modern architecture.',
    image: '/astix-icon.png',
    cropPosition: 'center center'
  }
];

export const JOURNAL_STORIES: StoryArticle[] = [
  {
    id: 'story-1',
    title: 'THE DESIGN BEHIND ASTIX V1',
    subtitle: 'KINETIC FORM',
    date: 'SEPTEMBER 2026',
    readTime: '4 MIN READ',
    image: '/sneaker-white.png',
    excerpt: 'How our design studio in Milan bridged the gap between sculptural automotive aerodynamics and everyday wearable luxury.',
    tag: 'Design Philosophy'
  },
  {
    id: 'story-2',
    title: 'BUILDING THE ASTIX SYMBOL',
    subtitle: 'BRAND GENESIS',
    date: 'AUGUST 2026',
    readTime: '6 MIN READ',
    image: '/astix-icon.png',
    excerpt: 'Deconstructing the geometry of the glyph: tension, release, forward momentum, and the visual weight of architectural silence.',
    tag: 'Identity'
  },
  {
    id: 'story-3',
    title: 'FORM, MATERIAL AND MOVEMENT',
    subtitle: 'SHELL 01 TAILORING',
    date: 'JULY 2026',
    readTime: '5 MIN READ',
    image: '/jacket-white.png',
    excerpt: 'Translating high-altitude alpine weather membranes into the minimalist silhouette demanded by the contemporary metropolitan wardrobe.',
    tag: 'Material Science'
  }
];
