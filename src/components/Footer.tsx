"use client";
import React from "react";
import { Mail, MapPin, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Brand Column */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              STANDARDS CLUB <span className="text-bis-gold">VIT</span>
            </h2>
            <p className="text-neutral-400 max-w-sm mb-8">
              Defining excellence through standardization. The official student chapter of the Bureau of Indian Standards at VIT Vellore.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://www.instagram.com/standardsclubvit/" icon={<Instagram className="w-5 h-5" />} />
              <SocialLink href="https://www.linkedin.com/company/standards-club-vit/" icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-4 md:items-end">
            <h3 className="text-lg font-bold text-white mb-4">OPERATIONAL BASE</h3>

            <a href="mailto:standardsclub@vit.ac.in" className="flex items-center text-neutral-400 hover:text-bis-gold transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              standardsclub@vit.ac.in
            </a>

            <div className="flex items-center text-neutral-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>VIT Vellore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-600 text-xs font-mono">
            © 2026 BIS STANDARDS CLUB VIT. SYSTEM SECURE.
          </p>
          <p className="text-neutral-600 text-xs font-mono mt-2 md:mt-0 flex gap-4">
            <a href="/admin" className="hover:text-bis-gold transition-colors underline decoration-white/20 hover:decoration-bis-gold">ADMIN LOGIN</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white hover:bg-bis-gold hover:text-black transition-all"
    >
      {icon}
    </a>
  );
}