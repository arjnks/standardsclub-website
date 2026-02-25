"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const directives = [
  {
    id: "01",
    title: "THE MISSION",
    description:
      "To bridge the critical gap between academic curriculum and industry requirements. We actively create awareness about standardization, quality control, and certification processes among students through workshops, industrial visits, and expert lectures.",
  },
  {
    id: "02",
    title: "CONSUMER SAFETY",
    description:
      "Ensuring products meet strict safety benchmarks to minimize health hazards. We advocate for the ISI mark as a symbol of trust and reliability for every Indian consumer, educating the public on the importance of certified quality.",
  },
  {
    id: "03",
    title: "GLOBAL EXPORTS",
    description:
      "Aligning Indian standards with international norms to promote exports and import substitutes. Standardization is the key to making 'Make in India' a global brand, ensuring our local products meet the highest global benchmarks.",
  },
  {
    id: "04",
    title: "STANDARDIZATION",
    description:
      "Control over proliferation of varieties to ensure interoperability and efficiency. By providing traceability and tangibility benefits, we contribute directly to the national economy, reducing waste and optimizing resource utilization across industries.",
  },
];

export function CoreDirectives() {
  return (
    <section id="about" className="py-32 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-32 border-l border-white/20 pl-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-bis-gold/60" />
            <span className="font-mono text-bis-gold text-sm tracking-widest uppercase">
              Directive 001: Overview
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl">
            CORE <br />
            <span className="text-white/40">PROTOCOLS</span>
          </h2>
        </motion.div>

        {/* Directives List */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[3.5rem] md:left-[9rem] top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />

          <div className="space-y-24 md:space-y-32">
            {directives.map((item, idx) => (
              <DirectiveParams key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectiveParams({ item, index }: { item: typeof directives[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  return (
    <motion.div
      ref={ref}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
    >
      {/* Index Number */}
      <div className="md:col-span-2 md:text-right pt-2 md:pt-4">
        <span className="font-mono text-4xl md:text-5xl text-white/10 font-bold group-hover:text-bis-gold/50 transition-colors duration-500">
          //{item.id}
        </span>
      </div>

      {/* Content */}
      <div className="md:col-span-10 relative pl-6 md:pl-12 border-l border-white/10 md:border-none">

        {/* Mobile Vertical Line highlight */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-bis-gold md:hidden"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
        />

        <motion.h3
          className="text-3xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {item.title}
        </motion.h3>

        <motion.p
          className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {item.description}
        </motion.p>
      </div>
    </motion.div>
  );
}
