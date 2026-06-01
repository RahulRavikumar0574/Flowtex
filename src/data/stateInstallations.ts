import type { Feature, FeatureCollection } from 'geojson'

export type StateInstallation = {
  id: string
  name: string
  /** Names matching `st_nm` in india-states.geojson */
  geoNames: string[]
  installations: number
  dealers: number
  recommendedProduct: string
  climate: string
  featuredProjects: string
  dealerData: string
  installationData: string
  stateImage: string
}

/** [STATE_INSTALLATION_DATA] · [DEALER_DATA] · [FEATURED_PROJECTS] · [RECOMMENDED_PRODUCTS] · [STATE_IMAGES] */
export const STATE_INSTALLATIONS: StateInstallation[] = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    geoNames: ['Rajasthan'],
    installations: 12500,
    dealers: 150,
    recommendedProduct: '6 Layer UV Protected Tank',
    climate: 'Extreme Heat',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'delhi',
    name: 'Delhi',
    geoNames: ['Delhi'],
    installations: 18200,
    dealers: 210,
    recommendedProduct: 'Flowtex 4 Layer',
    climate: 'Hot & Humid',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    geoNames: ['Uttar Pradesh'],
    installations: 22400,
    dealers: 280,
    recommendedProduct: 'Flowtex 6 Layer Pro',
    climate: 'Hot Summers',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    geoNames: ['Madhya Pradesh'],
    installations: 15800,
    dealers: 175,
    recommendedProduct: 'Flowtex 4 Layer',
    climate: 'Semi-Arid',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'punjab',
    name: 'Punjab',
    geoNames: ['Punjab'],
    installations: 9600,
    dealers: 120,
    recommendedProduct: 'Flowtex 3 Layer',
    climate: 'Continental',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'haryana',
    name: 'Haryana',
    geoNames: ['Haryana'],
    installations: 11200,
    dealers: 140,
    recommendedProduct: 'Flowtex 4 Layer',
    climate: 'Hot & Dry',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    geoNames: ['West Bengal'],
    installations: 13400,
    dealers: 165,
    recommendedProduct: '6 Layer UV Protected Tank',
    climate: 'Humid Subtropical',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'jammu-kashmir',
    name: 'Leh & Jammu Kashmir',
    geoNames: ['Jammu and Kashmir', 'Ladakh'],
    installations: 4200,
    dealers: 55,
    recommendedProduct: 'Flowtex 6 Layer Pro',
    climate: 'Alpine & Cold Desert',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'himachal',
    name: 'Himachal Pradesh',
    geoNames: ['Himachal Pradesh'],
    installations: 5800,
    dealers: 72,
    recommendedProduct: 'Flowtex 4 Layer',
    climate: 'Cool Mountain',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    geoNames: ['Uttarakhand'],
    installations: 6400,
    dealers: 80,
    recommendedProduct: '6 Layer UV Protected Tank',
    climate: 'Himalayan Foothills',
    featuredProjects: '[FEATURED_PROJECTS]',
    dealerData: '[DEALER_DATA]',
    installationData: '[STATE_INSTALLATION_DATA]',
    stateImage: '[STATE_IMAGES]',
  },
]

export const TOTAL_STATE_INSTALLATIONS = STATE_INSTALLATIONS.reduce(
  (s, st) => s + st.installations,
  0,
)

export const TOTAL_STATE_DEALERS = STATE_INSTALLATIONS.reduce((s, st) => s + st.dealers, 0)

export const STATES_COVERED = STATE_INSTALLATIONS.length

/** Map GeoJSON `st_nm` → Flowtex state id */
export const GEO_NAME_TO_STATE_ID: Record<string, string> = Object.fromEntries(
  STATE_INSTALLATIONS.flatMap((s) => s.geoNames.map((name) => [name, s.id])),
)

export const HIGHLIGHTED_GEO_NAMES = new Set(Object.keys(GEO_NAME_TO_STATE_ID))

export function getStateByGeoName(geoName: string): StateInstallation | undefined {
  const id = GEO_NAME_TO_STATE_ID[geoName]
  return id ? STATE_INSTALLATIONS.find((s) => s.id === id) : undefined
}

export function getStateFeatures(
  geojson: FeatureCollection,
  state: StateInstallation,
): Feature[] {
  return geojson.features.filter((f) => {
    const name = (f.properties as { st_nm?: string })?.st_nm
    return name && state.geoNames.includes(name)
  })
}
