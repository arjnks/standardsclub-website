"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hero3D } from "./Hero3D";

export function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/10">
      {/* 3D Background Layer */}
      <Hero3D />

      <motion.div
        className="z-10 text-center max-w-4xl px-4 pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 2.8, // Wait for Preloader to finish
            }
          }
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
          }}
          className="mb-8 flex justify-center"
        >
          <img src="/club-logo.svg" alt="BIS Club Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]" />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <h2 className="font-mono text-tech-cyan text-xl md:text-3xl tracking-[0.2em] mb-4 font-bold">
            STANDARDS CLUB VIT
          </h2>
        </motion.div>

        <motion.h1
          className="font-sans font-bold text-5xl md:text-8xl tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
          variants={{
            hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
            visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease: "circOut" } }
          }}
        >
          DEFINING <br />
          <span className="text-white">EXCELLENCE</span>
        </motion.h1>

        <motion.p
          className="font-mono text-white/60 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } }
          }}
        >
          We don't just follow standards. We engineer the blueprint for quality, safety, and reliability.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center gap-4 pointer-events-auto"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          <Link
            href="#about"
            className="group relative px-8 py-3 bg-transparent border border-tech-cyan/30 hover:border-tech-cyan text-tech-cyan font-mono text-sm transition-all duration-300 overflow-hidden inline-block"
          >
            <span className="relative z-10 group-hover:text-black transition-colors">EXPLORE PROTOCOLS</span>
            <div className="absolute inset-0 bg-tech-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-tech-cyan/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}