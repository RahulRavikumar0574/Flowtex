import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { VIDEOS } from '../../data/site'

gsap.registerPlugin(ScrollTrigger)

export function VideoExperience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const frames = section.querySelectorAll('[data-video-frame]')
    const ctx = gsap.context(() => {
      gsap.from(frames, {
        y: 80,
        opacity: 0,
        rotateX: 8,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden bg-flow-deep text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.15),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="See It In Action"
          title="Engineering On Film"
          subtitle="Factory precision, rigorous testing, and real-world performance — captured in motion."
          light
        />

        <div className="grid gap-6 md:grid-cols-2">
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.title}
              data-video-frame
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 ${
                i === 0 ? 'md:col-span-2 md:aspect-[21/9]' : 'aspect-video'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-flow-navy/80 text-sm text-white/30">
                {video.tag}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-flow-deep via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Play size={28} fill="white" className="text-white" />
                </span>
              </div>
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <h3 className="font-display text-xl font-bold">{video.title}</h3>
                <p className="mt-1 text-sm text-white/60">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
