"use client";

import React from "react";

export function CadGridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden">
      {/* Base Grid - Small */}
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]"
      />

      {/* Major Grid - Large */}
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:100px_100px]"
      />

      {/* Decorative Crosshairs at random intersections - Optional visual noise */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 border-l border-t border-white/20" />
      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 border-r border-b border-white/20" />
      <div className="absolute top-20 right-20 w-2 h-2 bg-white/10 rounded-full" />

      {/* Scanning Line Effect (Very Subtle) */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.02] to-transparent animate-scan z-10" />


    </div>
  );
}
