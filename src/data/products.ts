export type PuffType = 'puff' | 'double-puff' | null
export type UsageType = 'Residential' | 'Commercial' | 'Industrial' | 'Institutional'
export type ProductKind = 'tank' | 'pipe' | 'general'

export type ProductCategory = {
  id: string
  slug: string
  name: string
  productKind: ProductKind
  layerCount: number | null
  puffType: PuffType
  shortDescription: string
  categoryIntro: string
}

export type ProductSpecifications = {
  storageCapacity: string
  tankLayer: string
  layerType: string
  tankShape: string
  color: string
  tankColor: string
  tankApplication: string
  installationPosition: string
  brand: string
  shape: string
  tankWarranty: string
  usage: string
  guarantee: string
}

export const SPECIFICATION_LABELS: Record<keyof ProductSpecifications, string> = {
  storageCapacity: 'Storage Capacity',
  tankLayer: 'Tank Layer',
  layerType: 'Layer Type',
  tankShape: 'Tank Shape',
  color: 'Color',
  tankColor: 'Tank Color',
  tankApplication: 'Tank Application',
  installationPosition: 'Installation Position',
  brand: 'Brand',
  shape: 'Shape',
  tankWarranty: 'Tank Warranty',
  usage: 'Usage',
  guarantee: 'Guarantee',
}

export const SPECIFICATION_KEYS = Object.keys(
  SPECIFICATION_LABELS,
) as (keyof ProductSpecifications)[]

export function getSpecificationRows(spec: ProductSpecifications) {
  return SPECIFICATION_KEYS.map((key) => ({
    key,
    label: SPECIFICATION_LABELS[key],
    value: spec[key],
  }))
}

export type FlowtexProduct = {
  id: string
  slug: string
  name: string
  categoryId: string
  productKind: ProductKind
  capacityLiters: number
  layerLabel: string
  puffLabel?: string
  image: string
  gallery: string[]
  description: string
  productDescription: string
  specifications: ProductSpecifications
  price: string
  brochure: string
  usageTypes: UsageType[]
  applications: string[]
  certifications: string[]
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: '3-layer',
    slug: '3-layer-water-tank',
    name: '3 Layer Water Tank',
    productKind: 'tank',
    layerCount: 3,
    puffType: null,
    shortDescription: 'Reliable triple-layer protection for everyday residential storage.',
    categoryIntro:
      'Providing you the best range of Flowtex 3 layer water tanks with effective & timely delivery.',
  },
  {
    id: '6-layer-puff',
    slug: '6-layer-puff-water-tank',
    name: '6 Layer Puff Water Tank',
    productKind: 'tank',
    layerCount: 6,
    puffType: 'puff',
    shortDescription: 'Advanced six-layer puff insulation for superior heat resistance.',
    categoryIntro:
      'Our range includes Flowtex 6 layer puff and double puff water tanks for maximum thermal protection.',
  },
  {
    id: '4-layer',
    slug: '4-layer-water-tank',
    name: '4 Layer Water Tank',
    productKind: 'tank',
    layerCount: 4,
    puffType: null,
    shortDescription: 'Balanced four-layer engineering for homes and commercial rooftops.',
    categoryIntro:
      'Leading manufacturer of Flowtex 4 layer water storage tanks from Jhunjhunu.',
  },
  {
    id: '5-layer-puff',
    slug: '5-layer-puff-water-tank',
    name: '5 Layer Puff Water Tank',
    productKind: 'tank',
    layerCount: 5,
    puffType: 'puff',
    shortDescription: 'Five-layer puff technology for enhanced thermal performance.',
    categoryIntro:
      'Pioneers in the industry — Flowtex 5 layer puff water storage tanks from India.',
  },
  {
    id: '4-layer-puff',
    slug: '4-layer-puff-water-tank',
    name: '4 Layer Puff Water Tank',
    productKind: 'tank',
    layerCount: 4,
    puffType: 'puff',
    shortDescription: 'Four-layer puff insulation for enhanced heat resistance.',
    categoryIntro:
      'Wide range of Flowtex 4 layer puff water storage tanks for residential and commercial use.',
  },
  {
    id: '6-layer',
    slug: '6-layer-water-tank',
    name: '6 Layer Water Tank',
    productKind: 'tank',
    layerCount: 6,
    puffType: null,
    shortDescription: 'Six-layer standard construction for durable water storage.',
    categoryIntro:
      'Pioneers in the industry — Flowtex 6 layer water tanks from India.',
  },
  {
    id: '5-layer',
    slug: '5-layer-water-tank',
    name: '5 Layer Water Tank',
    productKind: 'tank',
    layerCount: 5,
    puffType: null,
    shortDescription: 'Five-layer water storage tanks for reliable everyday use.',
    categoryIntro:
      'Pioneers in the industry — Flowtex 5 layer water storage tanks from India.',
  },
  {
    id: 'water-storage',
    slug: 'water-storage-tank',
    name: 'Water Storage Tank',
    productKind: 'general',
    layerCount: null,
    puffType: null,
    shortDescription: 'Large-capacity and general-purpose water storage solutions.',
    categoryIntro:
      'Our range includes water storage tanks, water tanks and high-capacity Flowtex solutions.',
  },
  {
    id: 'garden-pipe',
    slug: 'garden-pipe',
    name: 'Garden Pipe',
    productKind: 'pipe',
    layerCount: null,
    puffType: null,
    shortDescription: 'Durable garden and irrigation pipes in multiple colours and sizes.',
    categoryIntro:
      'Wide range of garden pipes including parrot green, orange PVC, foam, transparent and blue options.',
  },
  {
    id: 'pvc-pipe',
    slug: 'pvc-pipe',
    name: 'PVC Pipe',
    productKind: 'pipe',
    layerCount: null,
    puffType: null,
    shortDescription: 'Flexible PVC piping for versatile water distribution.',
    categoryIntro: 'Complete choice of flexible PVC pipes for garden and utility applications.',
  },
]

const CATEGORY_PRODUCT_NAMES: Record<string, string[]> = {
  '3-layer': [
    'Flowtex 1000 Litre 3 Layer Water Tank',
    'Flowtex 500 Litre 3 Layer Water Tank',
    'Flowtex 5000 Litre 3 Layer Water Tank',
    'Flowtex 3000 Litre 3 Layer Water Tank',
    'Flowtex 1500 Litre 3 Layer Water Tank',
    'Flowtex 2000 Litre 3 Layer Water Tank',
  ],
  '6-layer-puff': [
    'Flowtex 1000 Litre 6 Layer Puff Water Tank',
    'Flowtex 1000 Litre 6 Layer Double Puff Water Tank',
    'Flowtex 2000 Litre 6 Layer Double Puff Water Tank',
    'Flowtex 5000 Litre 6 Layer Double Puff Water Tank',
    'Flowtex 3000 Litre 6 Layer Double Puff Water Tank',
    'Flowtex 1500 Litre 6 Layer Double Puff Water Tank',
  ],
  '4-layer': [
    'Flowtex 3000 Litre 4 Layer Puff Water Storage Tank',
    'Flowtex 5000 Litre 4 Layer Water Storage Tank',
    'Flowtex 2000 Litre 4 Layer Water Storage Tank',
    'Flowtex 500 Litre 4 Layer Water Storage Tank',
    'Flowtex 1000 Litre 4 Layer Water Storage Tank',
    'Flowtex 750 Litre 4 Layer Water Storage Tank',
  ],
  '5-layer-puff': [
    'Flowtex 5000 Litre 5 Layer Puff Water Storage Tank',
    'Flowtex 2000 Litre 5 Layer Puff Water Storage Tank',
    'Flowtex 1500 Litre 5 Layer Puff Water Storage Tank',
    'Flowtex 500 Litre 5 Layer Puff Water Storage Tank',
    'Flowtex 1000 Litre 5 Layer Puff Water Storage Tank',
    'Flowtex 3000 Litre 5 Layer Puff Water Storage Tank',
  ],
  '4-layer-puff': [
    'Flowtex 5000 Litre 4 Layer Puff Water Storage Tank',
    'Flowtex 750 Litre 4 Layer Puff Water Storage Tank',
    'Flowtex 500 Litre 4 Layer Puff Water Storage Tank',
    'Flowtex 1000 Litre 4 Layer Puff Water Storage Tank',
    'Flowtex 1500 Litre 4 Layer Puff Water Storage Tank',
  ],
  '6-layer': [
    'Flowtex 750 Litre 6 Layer Water Tank',
    'Flowtex 1000 Litre 6 Layer Water Tank',
    'Flowtex 500 Litre 6 Layer Water Tank',
  ],
  '5-layer': [
    'Flowtex 1000 Litre 5 Layer Water Storage Tank',
    'Flowtex 500 Litre 5 Layer Water Storage Tank',
    'Flowtex 750 Litre 5 Layer Water Storage Tank',
  ],
  'water-storage': [
    'Water Storage Tanks',
    'Water Tank',
    'Flowtex 10000 Litre Water Tank',
  ],
  'garden-pipe': [
    'Parrot Green Garden Pipe',
    'Orange Garden PVC Pipe',
    'Flowtex Foam Pipe',
    '1.5 Inch Green Garden Pipe',
    'Transparent Garden Pipe',
    'Blue Garden Pipe',
  ],
  'pvc-pipe': ['Flexible PVC Pipes'],
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseCapacity(name: string): number {
  const match = name.match(/(\d+)\s*(?:Litre|Liter|Litres?)/i)
  return match ? Number.parseInt(match[1], 10) : 0
}

function parsePuffLabel(name: string, category: ProductCategory): string | undefined {
  if (category.puffType === null && !/puff/i.test(name)) return undefined
  if (/double puff/i.test(name)) return 'Double Puff'
  if (/puff/i.test(name)) return 'Puff'
  return category.puffType === 'puff' ? 'Puff' : undefined
}

function layerLabelFor(category: ProductCategory): string {
  if (category.layerCount) return `${category.layerCount} Layer`
  return category.name
}

function usageForProduct(category: ProductCategory, capacityLiters: number): UsageType[] {
  if (category.productKind === 'pipe') return ['Residential', 'Commercial']
  if (category.productKind === 'general') {
    return capacityLiters >= 5000
      ? ['Commercial', 'Industrial', 'Institutional']
      : ['Residential', 'Commercial', 'Institutional']
  }
  if (capacityLiters <= 500) return ['Residential']
  if (capacityLiters <= 1500) return ['Residential', 'Commercial']
  if (capacityLiters <= 3000) return ['Residential', 'Commercial', 'Institutional']
  return ['Commercial', 'Industrial', 'Institutional']
}

function tankLayerName(layerCount: number): string {
  const names: Record<number, string> = {
    3: 'Triple Layer',
    4: 'Four Layer',
    5: 'Five Layer',
    6: 'Six Layer',
  }
  return names[layerCount] ?? `${layerCount} Layer`
}

function warrantyForLayers(layerCount: number): string {
  const years: Record<number, string> = {
    3: '10 Years',
    4: '12 Years',
    5: '14 Years',
    6: '15 Years',
  }
  return years[layerCount] ?? '10 Years'
}

function layerTypeLabel(layerLabel: string, puffLabel?: string): string {
  if (puffLabel) return `${layerLabel} · ${puffLabel}`
  return layerLabel
}

function buildSpecifications(
  category: ProductCategory,
  capacityLiters: number,
  layerLabel: string,
  puffLabel: string | undefined,
  productKind: ProductKind,
  productName: string,
): ProductSpecifications {
  const brand = 'Flowtex'
  const tankApplication = 'Domestic, Commercial, Agriculture, Industrial'

  if (productKind === 'pipe') {
    return {
      storageCapacity: 'As per model',
      tankLayer: '—',
      layerType: category.name,
      tankShape: 'Flexible',
      color: 'Multiple',
      tankColor: 'Multiple',
      tankApplication: 'Garden, Domestic, Commercial',
      installationPosition: 'Ground Level',
      brand,
      shape: 'Round',
      tankWarranty: '5 Years',
      usage: 'Water Distribution',
      guarantee: '5 Years',
    }
  }

  if (productKind === 'general') {
    const capacity =
      capacityLiters > 0
        ? `${capacityLiters.toLocaleString('en-IN')} L`
        : 'As per model'
    return {
      storageCapacity: capacity,
      tankLayer: 'Multi Layer',
      layerType: 'Water Storage',
      tankShape: 'Cylindrical',
      color: 'White',
      tankColor: 'White',
      tankApplication,
      installationPosition: 'Overhead',
      brand,
      shape: 'Round',
      tankWarranty: '10 Years',
      usage: 'Water Storage',
      guarantee: '10 Years',
    }
  }

  const layerCount = category.layerCount ?? 3
  const capacity = capacityLiters > 0 ? `${capacityLiters.toLocaleString('en-IN')} L` : 'As per model'
  const color = /green/i.test(productName) ? 'Green' : 'White'

  return {
    storageCapacity: capacity,
    tankLayer: tankLayerName(layerCount),
    layerType: layerTypeLabel(layerLabel, puffLabel),
    tankShape: 'Cylindrical',
    color,
    tankColor: color,
    tankApplication,
    installationPosition: 'Overhead',
    brand,
    shape: 'Round',
    tankWarranty: warrantyForLayers(layerCount),
    usage: 'Water Storage',
    guarantee: warrantyForLayers(layerCount),
  }
}

function applicationsFor(category: ProductCategory): string[] {
  if (category.productKind === 'pipe') {
    return ['Garden irrigation', 'Outdoor watering', 'Flexible utility connections']
  }
  if (category.productKind === 'general') {
    return ['Bulk water storage', 'Commercial backup supply', 'Industrial water reserves']
  }
  return ['Terrace water storage', 'Overhead domestic supply', 'Commercial building backup']
}

/** Standard filenames inside each product folder under public/images/products/{slug}/ */
export const PRODUCT_IMAGE_FILES = ['main.png', 'view-2.png', 'view-3.png', 'view-4.png'] as const

export function productImageUrl(slug: string, filename: string): string {
  return `/images/products/${slug}/${filename}`
}

export function getProductMediaPaths(slug: string): { image: string; gallery: string[] } {
  const gallery = PRODUCT_IMAGE_FILES.map((file) => productImageUrl(slug, file))
  return {
    image: productImageUrl(slug, 'main.png'),
    gallery,
  }
}

export function getProductGalleryCandidates(slug: string): string[] {
  return getProductMediaPaths(slug).gallery
}

export function isPlaceholderImage(src: string): boolean {
  return src.startsWith('[')
}

export function getProductGallery(product: FlowtexProduct): string[] {
  return product.gallery
}

function buildProduct(name: string, categoryId: string): FlowtexProduct {
  const category = PRODUCT_CATEGORIES.find((c) => c.id === categoryId)!
  const capacityLiters = parseCapacity(name)
  const puffLabel = parsePuffLabel(name, category)
  const slug = slugify(name)
  const media = getProductMediaPaths(slug)

  return {
    id: slug,
    slug,
    name,
    categoryId,
    productKind: category.productKind,
    capacityLiters,
    layerLabel: layerLabelFor(category),
    puffLabel,
    image: media.image,
    gallery: media.gallery,
    description: category.categoryIntro,
    productDescription: '[PRODUCT_DESCRIPTION]',
    specifications: buildSpecifications(
      category,
      capacityLiters,
      layerLabelFor(category),
      puffLabel,
      category.productKind,
      name,
    ),
    price: '[PRODUCT_PRICE]',
    brochure: '[PRODUCT_BROCHURE]',
    usageTypes: usageForProduct(category, capacityLiters),
    applications: applicationsFor(category),
    certifications:
      category.productKind === 'pipe'
        ? ['Quality Tested', 'UV Resistant']
        : ['ISO Quality', 'Food-Grade Inner Layer', 'UV Protection'],
  }
}

export const FLOWTEX_PRODUCTS: FlowtexProduct[] = PRODUCT_CATEGORIES.flatMap((cat) =>
  (CATEGORY_PRODUCT_NAMES[cat.id] ?? []).map((name) => buildProduct(name, cat.id)),
)

export const PRODUCT_BY_SLUG = Object.fromEntries(
  FLOWTEX_PRODUCTS.map((p) => [p.slug, p]),
) as Record<string, FlowtexProduct>

export const CATEGORY_BY_ID = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.id, c]),
) as Record<string, ProductCategory>

export function getCategory(id: string): ProductCategory | undefined {
  return CATEGORY_BY_ID[id]
}

export function getProduct(slug: string): FlowtexProduct | undefined {
  return PRODUCT_BY_SLUG[slug]
}

export function getProductById(id: string): FlowtexProduct | undefined {
  return FLOWTEX_PRODUCTS.find((p) => p.id === id)
}

export function getProductsByCategory(categoryId: string): FlowtexProduct[] {
  return FLOWTEX_PRODUCTS.filter((p) => p.categoryId === categoryId)
}

export function getRelatedProducts(product: FlowtexProduct, limit = 4): FlowtexProduct[] {
  return FLOWTEX_PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  ).slice(0, limit)
}

export type ProductFilters = {
  categoryId: string | 'all'
  layerType: string | 'all'
  capacity: string | 'all'
  puffType: string | 'all'
  usageType: string | 'all'
  search: string
}

export const CAPACITY_FILTER_OPTIONS = [
  { value: 'all', label: 'All Capacities' },
  { value: '500', label: '500 L' },
  { value: '750', label: '750 L' },
  { value: '1000', label: '1000 L' },
  { value: '1500', label: '1500 L' },
  { value: '2000', label: '2000 L' },
  { value: '3000', label: '3000 L' },
  { value: '5000', label: '5000 L' },
  { value: '10000', label: '10000 L' },
] as const

export const LAYER_FILTER_OPTIONS = [
  { value: 'all', label: 'All Layers' },
  { value: '3', label: '3 Layer' },
  { value: '4', label: '4 Layer' },
  { value: '5', label: '5 Layer' },
  { value: '6', label: '6 Layer' },
] as const

export const PUFF_FILTER_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'none', label: 'Standard' },
  { value: 'puff', label: 'Puff' },
  { value: 'double-puff', label: 'Double Puff' },
] as const

export const USAGE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Usage' },
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Institutional', label: 'Institutional' },
] as const

export function filterProducts(filters: ProductFilters): FlowtexProduct[] {
  const q = filters.search.trim().toLowerCase()

  return FLOWTEX_PRODUCTS.filter((product) => {
    const category = getCategory(product.categoryId)
    if (!category) return false

    if (filters.categoryId !== 'all' && product.categoryId !== filters.categoryId) return false

    if (
      filters.layerType !== 'all' &&
      category.layerCount !== null &&
      category.layerCount !== Number(filters.layerType)
    ) {
      return false
    }

    if (filters.capacity !== 'all' && product.capacityLiters !== Number(filters.capacity)) {
      return false
    }

    if (filters.puffType !== 'all') {
      const puff =
        product.puffLabel === 'Double Puff'
          ? 'double-puff'
          : product.puffLabel === 'Puff'
            ? 'puff'
            : 'none'
      if (puff !== filters.puffType) return false
    }

    if (filters.usageType !== 'all' && !product.usageTypes.includes(filters.usageType as UsageType)) {
      return false
    }

    if (q) {
      const haystack = [
        product.name,
        category.name,
        product.layerLabel,
        product.puffLabel ?? '',
        String(product.capacityLiters),
        category.categoryIntro,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }

    return true
  })
}

export const FEATURED_PRODUCT_NAMES = [
  'Flowtex 1000 Litre 6 Layer Puff Water Tank',
  'Flowtex 2000 Litre 4 Layer Water Storage Tank',
  'Flowtex 5000 Litre 5 Layer Puff Water Storage Tank',
  'Flowtex 1500 Litre 3 Layer Water Tank',
]

export const FEATURED_PRODUCTS = FEATURED_PRODUCT_NAMES.map(
  (name) => FLOWTEX_PRODUCTS.find((p) => p.name === name)!,
).filter(Boolean)
