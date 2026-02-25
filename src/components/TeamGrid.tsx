"use client";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image"; // Alternatively we can use standard img if no domain configured
import { useState, useEffect } from "react";

export const TeamGrid = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        if (data.teamMembers) {
          setTeamMembers(data.teamMembers);
        }
      });
  }, []);

  return (
    <section id="team" className="py-20 relative w-full">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          THE <span className="text-bis-gold">ARCHITECTS</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
              className="relative group aspect-square border border-white/5 bg-neutral-900/30 overflow-hidden flex flex-col justify-end"
            >

              {/* Background Image Layer */}
              {member.image ? (
                <div
                  className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none"
                  style={{ transform: `scale(${member.imageScale || 1})` }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      objectPosition: member.imagePosition || (
                        member.name === "Uzma" ? "center 15%" :
                          member.name === "Nayana K" ? "center 15%" :
                            member.name === "Ashwin Sharma" ? "center 25%" :
                              member.name === "Jagrat Shivhare" ? "center 15%" :
                                member.name === "Arjun S" ? "30% top" :
                                  "center top"
                      )
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-neutral-800/20 z-0 group-hover:bg-neutral-800/40 transition-colors duration-500 pointer-events-none flex items-center justify-center">
                  <span className="text-neutral-600 font-mono text-xs opacity-50">NO SIGNAL</span>
                </div>
              )}

              {/* ID Number */}
              <div className="absolute top-4 left-4 text-xs font-mono text-neutral-500 group-hover:text-bis-gold transition-colors z-10 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                BIS-VIT // {member.id}
              </div>

              {/* Content */}
              <div className="p-6 w-full bg-gradient-to-t from-black via-black/80 to-transparent z-10 relative">
                <h3 className="text-xl font-bold text-white group-hover:text-bis-gold transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-1 uppercase tracking-wider">
                  [{member.role}]
                </p>

                {/* LinkedIn Button - Slides up on hover */}
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80 hover:text-bis-gold transition-colors text-sm font-mono mt-4 pt-2 border-t border-white/10"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Connect</span>
                  </a>
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-bis-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};