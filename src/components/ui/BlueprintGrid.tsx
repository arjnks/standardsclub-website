"use client";
import { motion } from "framer-motion";

export const BlueprintGrid = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none flex h-full w-full items-center justify-center bg-black bg-grid-white/[0.1]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-transparent"
      />
    </div>
  );
};