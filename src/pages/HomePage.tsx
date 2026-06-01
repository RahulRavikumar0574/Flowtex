import { Hero } from '../components/sections/Hero'
import { SmartTankFinder } from '../components/sections/SmartTankFinder'
import { ProductShowcase } from '../components/sections/ProductShowcase'
import { Technology } from '../components/sections/Technology'
import { WhyFlowtex } from '../components/sections/WhyFlowtex'
import { Industries } from '../components/sections/Industries'
import { FlowtexAcrossIndia } from '../components/sections/FlowtexAcrossIndia'
import { Testimonials } from '../components/sections/Testimonials'
import { KnowledgeHub } from '../components/sections/KnowledgeHub'

export function HomePage() {
  return (
    <>
      <Hero />
      <SmartTankFinder />
      <ProductShowcase />
      <Technology />
      <WhyFlowtex />
      <Industries />
      <FlowtexAcrossIndia />
      <Testimonials />
      <KnowledgeHub />
    </>
  )
}
