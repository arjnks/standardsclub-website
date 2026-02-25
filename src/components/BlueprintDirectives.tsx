"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Minus, MoveRight } from "lucide-react";

const directives = [
    {
        id: "01",
        title: "THE MISSION",
        subtitle: "BRIDGE // ACADEMIA // INDUSTRY",
        description:
            "To bridge the critical gap between academic curriculum and industry requirements. We actively create awareness about standardization, quality control, and certification processes among students through workshops, industrial visits, and expert lectures.",
        specs: ["Consumer Affairs", "Quality Control", "Certification"],
    },
    {
        id: "02",
        title: "CONSUMER SAFETY",
        subtitle: "TRUST // RELIABILITY // MARK",
        description:
            "Ensuring products meet strict safety benchmarks to minimize health hazards. We advocate for the ISI mark as a symbol of trust and reliability for every Indian consumer, educating the public on the importance of certified quality.",
        specs: ["Hazard Minimization", "Safety Benchmarks", "ISI Mark"],
    },
    {
        id: "03",
        title: "GLOBAL EXPORTS",
        subtitle: "ALIGNMENT // TRADE // GROWTH",
        description:
            "Aligning Indian standards with international norms to promote exports and import substitutes. Standardization is the key to making 'Make in India' a global brand, ensuring our local products meet the highest global benchmarks.",
        specs: ["International Norms", "Import Substitution", "Global Brand"],
    },
    {
        id: "04",
        title: "STANDARDIZATION",
        subtitle: "INTEROPERABILITY // EFFICIENCY",
        description:
            "Control over proliferation of varieties to ensure interoperability and efficiency. By providing traceability and tangibility benefits, we contribute directly to the national economy, reducing waste and optimizing resource utilization across industries.",
        specs: ["Resource Optimization", "Economic Impact", "Variety Control"],
    },
];

export function BlueprintDirectives() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="about" className="py-24 w-full relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16 border-b border-white/10 pb-6 flex items-end justify-between">
                    <div>
                        <div className="text-bis-gold font-mono text-xs mb-2 tracking-widest">
                            SYSTEM CONFIGURATION
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            CORE DIRECTIVES
                        </h2>
                    </div>
                    <div className="hidden md:block font-mono text-right text-xs text-neutral-500">
                        STATUS: ACTIVE<br />
                        VER: 2.0.4
                    </div>
                </div>

                {/* Accordion Map */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* List/Accordion Side */}
                    <div className="lg:col-span-12 flex flex-col">
                        {directives.map((item, idx) => (
                            <BlueprintItem
                                key={item.id}
                                item={item}
                                isOpen={openIndex === idx}
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            />
                        ))}
                    </div>

                </div>

            </div>

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        </section>
    );
}

function BlueprintItem({
    item,
    isOpen,
    onClick,
}: {
    item: typeof directives[0];
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <motion.div
            onClick={onClick}
            className={cn(
                "cursor-pointer border-l-2 relative overflow-hidden transition-colors duration-500",
                isOpen
                    ? "border-bis-gold bg-neutral-900/10"
                    : "border-white/10 hover:border-white/30"
            )}
        >
            {/* Header Row */}
            <div className="p-6 md:p-8 flex items-center justify-between group">
                <div className="flex items-center gap-6 md:gap-12">
                    <span className={cn("font-mono text-xl md:text-2xl transition-colors", isOpen ? "text-bis-gold" : "text-white/30")}>
                        {item.id}
                    </span>
                    <div>
                        <h3 className={cn("text-xl md:text-3xl font-bold uppercase tracking-wider transition-colors", isOpen ? "text-white" : "text-white/70 group-hover:text-white")}>
                            {item.title}
                        </h3>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-xs font-mono text-bis-gold mt-1"
                                >
                                    {item.subtitle}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Icon */}
                <div className={cn("p-2 rounded-full border transition-all duration-300", isOpen ? "border-bis-gold text-bis-gold rotate-90" : "border-white/10 text-white/30")}>
                    <ArrowIcon isOpen={isOpen} />
                </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 md:p-8 pt-0 pl-16 md:pl-24 max-w-4xl">
                            <p className="text-neutral-400 text-sm md:text-lg leading-relaxed mb-6 font-mono border-l border-white/10 pl-4">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 md:gap-4">
                                {item.specs.map((spec, i) => (
                                    <span key={i} className="text-[10px] md:text-xs font-mono uppercase px-2 py-1 border border-white/10 text-white/50 rounded hover:border-bis-gold/50 hover:text-bis-gold transition-colors">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Decorative bottom line */}
                        <div className="h-[1px] w-full bg-linear-to-r from-bis-gold/50 to-transparent mt-4" />
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("transition-transform duration-300", isOpen ? "rotate-0" : "-rotate-90")}
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
)
