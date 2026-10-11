import React from 'react';
import { motion } from 'framer-motion';

const teamList = [
  { name: "AMY SOMTOCHUKWU AGBOWO", role: "Principal Architect", scope: "Core System Orchestration" },
  { name: "SAMUEL CHERECHUKWU EGBEH", role: "Head of Motion Physics", scope: "Kinetic Velocity Tracking" },
  { name: "IKEDINACHI FRANKLIN OGBONNE", role: "Lead UI Designer", scope: "Visual Proportion Models" },
  { name: "CHIEMERIE OKEKE", role: "Systems Engineer", scope: "Telemetry Infrastructure" },
  { name: "CHUKWUNETA EMMANUEL", role: "UX Flow Specialist", scope: "Frictionless Content Delivery" }
];

export default function AboutUs() {
  return (
    <div className="bg-[#000000] text-[#FFFFFF] py-32 px-8 md:px-16 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20">
          <p className="font-mono text-xs tracking-widest text-neutral-500 mb-2">// Creative Collective</p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-white">The Development Team</h2>
        </div>

        {/* 5-Column Editorial Profile Assembly Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamList.map((member, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              key={member.name}
              className="border-t border-neutral-800 pt-6 flex flex-col justify-between h-72 group"
            >
              <div>
                <span className="font-mono text-[10px] text-neutral-600 block mb-4">[0{idx + 1}]</span>
                <h3 className="font-serif text-base font-light tracking-tight leading-snug text-neutral-200 group-hover:text-white transition-colors duration-300">
                  {member.name}
                </h3>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">{member.role}</p>
                <p className="font-serif italic text-xs text-neutral-500">{member.scope}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
