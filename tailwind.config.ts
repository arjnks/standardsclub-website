import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The "Technical Dark Mode" palette
        'tech-black': '#000000',
        'tech-grey': '#111111',
        'tech-cyan': '#FFD700', // Replaced Cyan with Gold for the theme
        'tech-gold': '#ffd700', // Secondary accent
        'bis-gold': '#ffd700',
        'bis-blue': '#ffd700', // Map blue to gold to override legacy styles
        'grid-line': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "sans-serif"],
      },
      backgroundImage: {
        'blueprint': 'none',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        scan: 'scan 8s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
