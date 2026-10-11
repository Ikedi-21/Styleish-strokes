import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col justify-between pt-36 pb-20 px-8 md:px-16 overflow-hidden bg-cover bg-center">
      
      {/* Precision fluid ink vector animation path mapping */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <motion.path 
            d="M50 450C250 200 450 500 700 150C900 -50 1050 200 1150 100" 
            stroke="white" 
            strokeWidth="1.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

      <div className="max-w-5xl z-10 my-auto">
        <p className="font-mono text-xs tracking-[0.4em] text-neutral-400 uppercase mb-6">
          // Digital Luxury Archive
        </p>
        
        <h1 className="text-5xl md:text-[7.5rem] font-serif font-normal leading-[1.05] tracking-tight text-white">
          <span className="block overflow-hidden py-1">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Mastering the Elegant
            </motion.span>
          </span>
          <span className="block overflow-hidden py-1 italic text-neutral-400 pl-8 md:pl-20">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="block font-light"
            >
              Cadence of Calligraphy
            </motion.span>
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end z-10 border-t border-neutral-800 pt-8 mt-12">
        <div className="md:col-span-7">
          <p className="text-base text-neutral-400 font-serif leading-relaxed max-w-xl">
            Unveiling comprehensive historical data across foundational lineages. Experience structural exercises designed to bridge the gap between historic technique and contemporary design.
          </p>
        </div>
        <div className="md:col-span-5 flex justify-end">
          <button 
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto border border-white/30 hover:border-white px-8 py-4 font-mono text-xs tracking-widest uppercase text-white transition-colors duration-300"
          >
            Explore Historical Origins
          </button>
        </div>
      </div>
    </div>
  );
}
