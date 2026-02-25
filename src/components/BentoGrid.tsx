"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const BentoItem = ({ 
  title, 
  subtitle, 
  children, 
  className 
}: { 
  title: string; 
  subtitle: string; 
  children?: ReactNode; 
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale: 0.98 }}
    className={`relative p-6 bg-neutral-900/30 border border-white/5 overflow-hidden group ${className}`}
  >

    <div className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <h3 className="font-mono text-tech-cyan text-xs mb-2">{subtitle}</h3>
        <h2 className="font-sans text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="mt-4 text-white/60 text-sm">
        {children}
      </div>
    </div>
  </motion.div>
);

export function BentoGrid() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-12 border-l-2 border-tech-cyan pl-4">
        <h2 className="font-mono text-xl text-white">CORE_DIRECTIVES</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-[800px] md:h-[500px]">
        {/* Large Item */}
        <BentoItem 
          title="Standardization" 
          subtitle="01 // CORE"
          className="md:col-span-2 md:row-span-2"
        >
          <p>Harmonizing technical specifications to ensure quality and safety across industries. We set the benchmark that others follow.</p>
          <div className="mt-8 h-32 w-full border border-dashed border-white/20 rounded flex items-center justify-center font-mono text-xs text-white/30">
            [INTERACTIVE_MODEL_PLACEHOLDER]
          </div>
        </BentoItem>

        {/* Tall Item */}
        <BentoItem 
          title="Certification" 
          subtitle="02 // VERIFY"
          className="md:col-span-1 md:row-span-2"
        >
          <p>Providing third-party assurance of quality, safety, and reliability of products to the customer.</p>
        </BentoItem>

        {/* Small Items */}
        <BentoItem 
          title="Laboratory" 
          subtitle="03 // TEST"
          className="md:col-span-1 md:row-span-1"
        >
          State-of-the-art testing facilities.
        </BentoItem>

        <BentoItem 
          title="Training" 
          subtitle="04 // EDUCATE"
          className="md:col-span-1 md:row-span-1"
        >
          Empowering the next generation of engineers.
        </BentoItem>
      </div>
    </section>
  );
}
