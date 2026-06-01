export const PLACEHOLDERS = {
  logo: '[LOGO]',
  whatsapp: '[WHATSAPP_NUMBER]',
  social: '[SOCIAL_LINKS]',
  brandColors: '[BRAND_COLORS]',
} as const

export const NAV_LINKS = [
  { label: 'Technology', href: '#technology' },
  { label: 'Products', href: '/products' },
  { label: 'Tank Finder', href: '#finder' },
  { label: 'Industries', href: '#industries' },
  { label: 'Installations', href: '#installations' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Knowledge', href: '#knowledge' },
] as const

export const HERO_STATS = [
  { value: 1000000, suffix: '+', label: 'Tanks Installed' },
  { value: 15, suffix: '+', label: 'States Covered' },
  { value: 10, suffix: ' Yrs', label: 'Warranty' },
  { value: 6, suffix: ' Layer', label: 'Max Technology' },
] as const

export const FINDER_QUESTIONS = [
  {
    id: 'family',
    question: 'What is your family size?',
    icon: 'users',
    options: ['1-2', '3-5', '6-8', '8+'],
  },
  {
    id: 'usage',
    question: 'Daily water usage?',
    icon: 'droplets',
    options: ['Low', 'Moderate', 'High', 'Very High'],
  },
  {
    id: 'climate',
    question: 'Climate condition in your area?',
    icon: 'sun',
    options: ['Mild', 'Warm', 'Hot', 'Extreme Heat'],
  },
  {
    id: 'install',
    question: 'Installation type?',
    icon: 'building',
    options: ['Terrace', 'Ground', 'Basement', 'Custom'],
  },
  {
    id: 'location',
    question: 'Indoor or outdoor placement?',
    icon: 'home',
    options: ['Indoor', 'Outdoor', 'Semi-covered'],
  },
  {
    id: 'water',
    question: 'Water source?',
    icon: 'waves',
    options: ['Borewell', 'Corporation', 'Mixed', 'Tanker'],
  },
  {
    id: 'budget',
    question: 'What is your budget preference?',
    icon: 'wallet',
    options: ['Economy', 'Best Value', 'Premium', 'No Compromise'],
  },
] as const

export const TANK_LAYERS = [
  { name: 'UV Shield Outer', desc: 'Blocks harmful UV rays and prevents algae growth on exterior surfaces.' },
  { name: 'Impact Resistant Shell', desc: 'High-density polymer withstands physical stress and weathering.' },
  { name: 'Thermal Insulation', desc: 'Reduces heat transfer to keep stored water cooler in Indian summers.' },
  { name: 'Anti-Bacterial Core', desc: 'Silver-ion infused layer inhibits bacterial colonization.' },
  { name: 'Food-Grade Inner', desc: 'FDA-compliant material ensures water remains safe for consumption.' },
  { name: 'Seamless Weld Zone', desc: 'Precision fusion eliminates weak points and leakage paths.' },
] as const

export const WHY_FEATURES = [
  { title: 'UV Protection', desc: 'Multi-spectrum UV blocking for decades of sun exposure.', icon: 'shield' },
  { title: 'Anti-Bacterial', desc: 'Active antimicrobial layer keeps water hygienic.', icon: 'sparkles' },
  { title: 'Food-Grade', desc: 'Certified materials safe for drinking water storage.', icon: 'leaf' },
  { title: 'Heat Resistance', desc: 'Engineered for 60°C+ ambient temperatures.', icon: 'flame' },
  { title: 'High Durability', desc: 'Impact-tested for Indian installation conditions.', icon: 'zap' },
] as const

export const INDUSTRIES = [
  { name: 'Homes', image: '[PRODUCT_IMAGES]' },
  { name: 'Apartments', image: '[PRODUCT_IMAGES]' },
  { name: 'Commercial', image: '[PRODUCT_IMAGES]' },
  { name: 'Hospitals', image: '[PRODUCT_IMAGES]' },
  { name: 'Industries', image: '[PRODUCT_IMAGES]' },
  { name: 'Schools', image: '[PRODUCT_IMAGES]' },
] as const

export const MAP_REGIONS = [
  { id: 'north', name: 'North India', installs: 124000, dealers: 340, x: 42, y: 22 },
  { id: 'west', name: 'West India', installs: 156000, dealers: 420, x: 28, y: 48 },
  { id: 'south', name: 'South India', installs: 189000, dealers: 510, x: 38, y: 72 },
  { id: 'east', name: 'East India', installs: 98000, dealers: 280, x: 62, y: 42 },
  { id: 'central', name: 'Central India', installs: 72000, dealers: 195, x: 48, y: 48 },
] as const

export const VIDEOS = [
  { title: 'Factory Excellence', tag: '[FACTORY_VIDEO]', desc: 'Precision manufacturing at scale.' },
  { title: 'Product Testing', tag: '[FACTORY_VIDEO]', desc: 'Rigorous quality validation protocols.' },
  { title: 'Heat Resistance Demo', tag: '[FACTORY_VIDEO]', desc: 'Extreme temperature stress testing.' },
  { title: 'Water Purity Demo', tag: '[FACTORY_VIDEO]', desc: 'Food-grade integrity verification.' },
] as const

export const TESTIMONIALS = [
  { name: 'Rajesh K.', role: 'Homeowner, Ahmedabad', text: '[CUSTOMER_TESTIMONIALS]', rating: 5, video: false },
  { name: 'Priya M.', role: 'Facility Manager, Bangalore', text: '[CUSTOMER_TESTIMONIALS]', rating: 5, video: true },
  { name: 'Suresh Industries', role: 'Manufacturing, Pune', text: '[CUSTOMER_TESTIMONIALS]', rating: 5, video: false },
  { name: 'Green Valley School', role: 'Institution, Chennai', text: '[CUSTOMER_TESTIMONIALS]', rating: 5, video: true },
] as const

export const BLOG_POSTS = [
  {
    title: 'Best Water Tanks for Indian Summers',
    excerpt: 'How multi-layer technology protects your water when temperatures exceed 45°C.',
    topic: 'Climate',
    image: '[PRODUCT_IMAGES]',
  },
  {
    title: '3 Layer vs 6 Layer Tanks',
    excerpt: 'A technical comparison to help you choose the right engineering for your needs.',
    topic: 'Technology',
    image: '[PRODUCT_IMAGES]',
  },
  {
    title: 'Tank Maintenance Guide',
    excerpt: 'Essential practices to maximize lifespan and water quality year after year.',
    topic: 'Care',
    image: '[PRODUCT_IMAGES]',
  },
  {
    title: 'The Science of Water Storage',
    excerpt: 'Understanding thermal dynamics, UV degradation, and microbial control.',
    topic: 'Science',
    image: '[PRODUCT_IMAGES]',
  },
] as const

export const FOOTER_LINKS = {
  company: ['About Flowtex', 'Technology', 'Certifications', 'Careers'],
  support: ['Find a Dealer', 'Warranty', 'Installation Guide', 'Contact'],
} as const
