import { useLenis } from './hooks/useLenis'
import { Navbar } from './components/layout/Navbar'
import { MobileCTA } from './components/layout/MobileCTA'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { SmartTankFinder } from './components/sections/SmartTankFinder'
import { ProductShowcase } from './components/sections/ProductShowcase'
import { Technology } from './components/sections/Technology'
import { WhyFlowtex } from './components/sections/WhyFlowtex'
import { Industries } from './components/sections/Industries'
import { LiveInstallations } from './components/sections/LiveInstallations'
import { VideoExperience } from './components/sections/VideoExperience'
import { Testimonials } from './components/sections/Testimonials'
import { KnowledgeHub } from './components/sections/KnowledgeHub'

function App() {
  useLenis()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SmartTankFinder />
        <ProductShowcase />
        <Technology />
        <WhyFlowtex />
        <Industries />
        <LiveInstallations />
        <VideoExperience />
        <Testimonials />
        <KnowledgeHub />
      </main>
      <Footer />
      <MobileCTA />
    </>
  )
}

export default App
