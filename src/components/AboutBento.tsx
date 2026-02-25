"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShieldCheck, Scale, Globe, BookOpen } from "lucide-react"; // Icons

export function AboutBento() {
  return (
    <section id="about" className="py-20 bg-black w-full relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            CORE <span className="text-bis-gold">DIRECTIVES</span>
          </h2>
          <p className="text-neutral-400 max-w-lg">
            Authorized by the Ministry of Consumer Affairs, Govt. of India.
            Established 2016. Effective 2017.
          </p>
        </motion.div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* Card 1: The Main Mission (Span 2 columns) */}
          <BentoCard className="md:col-span-2 bg-neutral-900/50 border-neutral-800">
            <div className="p-6 h-full flex flex-col justify-between">
              <BookOpen className="h-8 w-8 text-bis-gold mb-4" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">The Mission</h3>
                <p className="text-neutral-400 leading-relaxed">
                  To bridge the critical gap between academic curriculum and industry requirements. 
                  We actively create awareness about standardization, quality control, 
                  and certification processes among students through workshops, industrial visits, 
                  and expert lectures, preparing them to be quality-conscious professionals.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Quality Control */}
          <BentoCard className="bg-neutral-900/50 border-neutral-800 group">
             <div className="p-6 h-full flex flex-col justify-between">
                <ShieldCheck className="h-12 w-12 text-bis-gold mb-4 group-hover:scale-110 transition-transform" />
                <div>
                    <h3 className="text-lg font-bold text-white">Consumer Safety</h3>
                    <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                        Ensuring products meet strict safety benchmarks to minimize health hazards. 
                        We advocate for the ISI mark as a symbol of trust and reliability for every Indian consumer.
                    </p>
                </div>
             </div>
          </BentoCard>

          {/* Card 3: Economic Impact */}
          <BentoCard className="bg-neutral-900/50 border-neutral-800 group">
             <div className="p-6 h-full flex flex-col justify-between">
                <Globe className="h-12 w-12 text-bis-gold mb-4 group-hover:scale-110 transition-transform" />
                <div>
                    <h3 className="text-lg font-bold text-white">Global Exports</h3>
                    <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                        Aligning Indian standards with international norms to promote exports and import substitutes. 
                        Standardization is the key to making 'Make in India' a global brand.
                    </p>
                </div>
             </div>
          </BentoCard>

          {/* Card 4: Standardization (Span 2 columns) */}
          <BentoCard className="md:col-span-2 bg-neutral-900/50 border-neutral-800">
             <div className="p-6 h-full flex flex-col justify-between">
               <Scale className="h-8 w-8 text-bis-gold mb-4" />
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Standardization</h3>
                 <p className="text-neutral-400 leading-relaxed">
                   Control over proliferation of varieties to ensure interoperability and efficiency. 
                   By providing traceability and tangibility benefits, we contribute directly to the national economy, 
                   reducing waste and optimizing resource utilization across industries.
                 </p>
               </div>
             </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}

// Reusable Card Component with Hover Effect
function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-xl border border-white/5 overflow-hidden hover:border-bis-gold/30 transition-colors duration-300",
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}