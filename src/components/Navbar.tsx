"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.5, duration: 0.8 }}
      className="fixed top-0 right-0 z-50 p-8 flex gap-8 font-mono text-sm"
    >
      {["ABOUT", "EVENTS", "TEAM"].map((item) => (
        <Link 
          key={item} 
          href={`#${item.toLowerCase()}`}
          className="text-white hover:text-bis-gold transition-colors relative group"
        >
          {item}
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-bis-gold transition-all group-hover:w-full" />
        </Link>
      ))}
    </motion.nav>
  );
}