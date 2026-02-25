"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    // Loading duration
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Logo Container */}
            <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
              {/* Rotating Rings for Technical Feel */}
              <motion.div
                className="absolute inset-0 border border-bis-gold/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-3 border border-bis-gold/50 rounded-full border-t-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Center Logo Image */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "backOut" }}
              >
                <img src="/club-logo.svg" alt="Club Logo" className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
              </motion.div>
            </div>

            {/* Text Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
                className="text-white font-mono text-xl md:text-2xl tracking-[0.5em] font-bold"
              >
                STANDARDS CLUB VIT
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}