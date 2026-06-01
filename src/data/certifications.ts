export type CertificationCategory =
  | 'iso'
  | 'quality'
  | 'foodGrade'
  | 'safety'
  | 'manufacturing'

export type Certification = {
  id: string
  category: CertificationCategory
  name: string
  description: string
  logo: string
  /** Certificate preview image (ISO showcase cards) */
  image?: string
  viewUrl: string
  downloadUrl: string
}

export const CERTIFICATION_CATEGORIES: {
  id: CertificationCategory
  title: string
  subtitle: string
}[] = [
  {
    id: 'iso',
    title: 'ISO Certifications',
    subtitle: 'Internationally recognized quality and environmental management standards.',
  },
  {
    id: 'quality',
    title: 'Quality Standards',
    subtitle: 'Rigorous testing protocols that exceed industry benchmarks.',
  },
  {
    id: 'foodGrade',
    title: 'Food Grade Certifications',
    subtitle: 'Safe, certified materials for potable water storage.',
  },
  {
    id: 'safety',
    title: 'Safety Compliance',
    subtitle: 'Workplace and product safety aligned with national regulations.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing Standards',
    subtitle: 'Precision production under audited factory conditions.',
  },
]

export const ISO_CERTIFICATION_SUMMARY = [
  'ISO 9001:2015 Certified',
  'ISO 14001:2015 Certified',
  'Quality Management Compliant',
  'Environmental Management Compliant',
] as const

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'iso-9001',
    category: 'iso',
    name: 'ISO 9001:2015 Quality Management System',
    description:
      'Certified for the manufacturing and supply of water tanks under an internationally recognized quality management framework.',
    logo: '/images/certifications/iso-9001-2015.png',
    image: '/images/certifications/iso-9001-2015.png',
    viewUrl: '/images/certifications/iso-9001-2015.png',
    downloadUrl: '/images/certifications/iso-9001-2015.png',
  },
  {
    id: 'iso-14001',
    category: 'iso',
    name: 'ISO 14001:2015 Environmental Management System',
    description:
      'Certified environmental management for sustainable manufacturing and supply of water storage solutions.',
    logo: '/images/certifications/iso-14001-2015.png',
    image: '/images/certifications/iso-14001-2015.png',
    viewUrl: '/images/certifications/iso-14001-2015.png',
    downloadUrl: '/images/certifications/iso-14001-2015.png',
  },
  {
    id: 'quality-bis',
    category: 'quality',
    name: '[CERTIFICATION_NAME]',
    description:
      '[CERTIFICATION_DESCRIPTION] — Bureau of Indian Standards compliance for domestic water storage products.',
    logo: '[CERTIFICATION_LOGO]',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 'quality-qa',
    category: 'quality',
    name: '[CERTIFICATION_NAME]',
    description:
      '[CERTIFICATION_DESCRIPTION] — In-house QA certification for batch-level structural and leakage testing.',
    logo: '[CERTIFICATION_LOGO]',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 'food-fda',
    category: 'foodGrade',
    name: '[CERTIFICATION_NAME]',
    description:
      '[CERTIFICATION_DESCRIPTION] — Food-grade inner layer certification for safe drinking water contact.',
    logo: '[CERTIFICATION_LOGO]',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 'food-nsf',
    category: 'foodGrade',
    name: '[CERTIFICATION_NAME]',
    description:
      '[CERTIFICATION_DESCRIPTION] — NSF-equivalent material safety validation for polymer water tanks.',
    logo: '[CERTIFICATION_LOGO]',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 'safety-osha',
    category: 'safety',
    name: '[CERTIFICATION_NAME]',
    description:
      '[CERTIFICATION_DESCRIPTION] — Occupational safety compliance across manufacturing facilities.',
    logo: '[CERTIFICATION_LOGO]',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 'safety-product',
    category: 'safety',
    name: '[CERTIFICATION_NAME]',
    description:
      '[CERTIFICATION_DESCRIPTION] — Product safety certification for impact resistance and UV exposure.',
    logo: '[CERTIFICATION_LOGO]',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 'mfg-plant',
    category: 'manufacturing',
    name: '[CERTIFICATION_NAME]',
    description:
      '[CERTIFICATION_DESCRIPTION] — Audited manufacturing plant certification for precision roto-moulding.',
    logo: '[CERTIFICATION_LOGO]',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    id: 'mfg-process',
    category: 'manufacturing',
    name: '[CERTIFICATION_NAME]',
    description:
      '[CERTIFICATION_DESCRIPTION] — Process control certification for layer bonding and weld integrity.',
    logo: '[CERTIFICATION_LOGO]',
    viewUrl: '#',
    downloadUrl: '#',
  },
]
