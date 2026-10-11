import React from 'react';
import { motion } from 'framer-motion';

const scriptsList = [
  {
    title: "Western Calligraphy",
    sub: "Carolingian & Imperial Capital Scripts",
    desc: "Built around absolute strict geometric pen angles and rigid vertical tempos, framing the baseline syntax of modern typography."
  },
  {
    title: "Arabic Calligraphy",
    sub: "Classical Thuluth & Naskh",
    desc: "A highly complex system completely calculated around proportional ink dot parameters, exhibiting sweeping vertical ascenders and deep fluid curves."
  },
  {
    title: "Oriental Calligraphy",
    sub: "Traditional Kanji Brush Movement",
    desc: "Rooted deeply in zen practices, balancing continuous brush compression, line velocity, and the organic absorption metrics of paper."
  }
];

export default function AboutCalligraphy() {
  return (
    <div className="bg-[#FFFFFF] text-[#000000] min-h-screen py-32 px-8 md:px-16 flex items-center justify-center paper-grid">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Sticky Structural Header Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-36 h-fit space-y-6">
          <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase block">// History & Lineage</span>
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-neutral-900">
            Origins & Styles
          </h2>
          <p className="text-neutral-500 font-serif text-sm leading-relaxed">
            Calligraphy balances the friction between utensil control and fluid escape. Explore the distinct design constraints of the three core geographic systems.
          </p>
        </div>

        {/* Content Tracking Matrix */}
        <div className="lg:col-span-8 space-y-16">
          {scriptsList.map((script, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              key={script.title}
              className="border-b border-neutral-200 pb-12 last:border-0"
            >
              <div className="space-y-1 mb-4">
                <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 tracking-tight">{script.title}</h3>
                <p className="font-mono text-xs tracking-wide text-neutral-400 italic">{script.sub}</p>
              </div>
              <p className="text-neutral-600 font-serif text-base leading-relaxed max-w-2xl font-light">
                {script.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
