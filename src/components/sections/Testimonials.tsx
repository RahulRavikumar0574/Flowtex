import { SectionHeading } from '../ui/SectionHeading'
import { TestimonialSphereCarousel } from './TestimonialSphereCarousel'

export function Testimonials() {
  return (
    <section className="section-pad overflow-hidden bg-flow-mist">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted By Thousands"
          subtitle="[CUSTOMER_TESTIMONIALS] — Real voices from homes and industries across India."
        />
        <TestimonialSphereCarousel />
      </div>
    </section>
  )
}
