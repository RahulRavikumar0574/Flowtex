import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { BLOG_POSTS } from '../../data/site'

export function KnowledgeHub() {
  return (
    <section id="knowledge" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Knowledge Hub"
          title="Water Storage Intelligence"
          subtitle="[SEO_CONTENT] — Expert guides for smarter decisions."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group flex h-full cursor-pointer flex-col rounded-3xl border border-flow-ice bg-flow-mist p-6 transition-shadow duration-300 hover:border-flow-accent/25 hover:shadow-lg hover:shadow-flow-accent/10"
            >
              <span className="inline-flex w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-flow-accent">
                {post.topic}
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-flow-deep transition-colors group-hover:text-flow-accent">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-flow-navy/70">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-flow-accent">
                Read more <ArrowUpRight size={16} />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
