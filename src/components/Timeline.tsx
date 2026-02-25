"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

export function Timeline() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
        }
      });
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="events" className="py-20 relative w-full overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 relative">

        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">
          MISSION <span className="text-bis-gold">LOGS</span>
        </h2>

        {/* The Central Line */}
        <div className="absolute left-4 md:left-1/2 top-32 bottom-0 w-[2px] bg-neutral-800 -translate-x-1/2">
          <motion.div
            style={{ height }}
            className="w-full bg-gradient-to-b from-bis-gold to-transparent opacity-50"
          />
        </div>

        {/* Event Nodes */}
        <div className="space-y-24">
          {events.map((event, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row ${idx % 2 === 0 ? "md:flex-row-reverse" : ""} items-center justify-between`}>

              {/* Empty Space for alignment */}
              <div className="hidden md:block w-5/12" />

              {/* The Node Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-black border border-bis-gold rounded-full z-10" />

              {/* The Content Card */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full md:w-5/12 pl-12 md:pl-0"
              >
                <div className="bg-neutral-900/30 border border-white/5 p-6 rounded-xl hover:border-bis-gold/30 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-bis-gold border border-bis-gold/30 px-2 py-1 rounded">
                      {event.tag}
                    </span>
                    <div className="flex items-center text-neutral-500 text-xs font-mono">
                      <Calendar className="w-3 h-3 mr-1" />
                      {event.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-bis-gold transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}