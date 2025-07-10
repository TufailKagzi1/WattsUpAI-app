/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007BFF', // Electric Blue (for active elements or trust)
          dark: '#005FCC',
        },
        secondary: {
          DEFAULT: '#FFB800', // Gold/Yellow (used for CTA like “Log in”)
          dark: '#CC9300',
        },
        accent: {
          DEFAULT: '#00D1B2', // Teal/Aqua (used for Sign Up button)
        },
        brand: {
          green: '#00A86B', // From logo (green lightning leaf)
          blue: '#004AAD',  // From logo (circuit lines)
        },
        background: {
          DEFAULT: '#0F172A', // Navy dark mode background
          card: '#1E293B', // For card elements
          light: '#F9FAFB', // Optional for lighter mode (not used yet)
        },
        text: {
          DEFAULT: '#FFFFFF',
          muted: '#94A3B8',
          dark: '#1E293B',
        },
        border: '#334155',
        warning: '#F97316', // For alerts or energy tips if needed
        success: '#22C55E', // For positive reinforcement (achievements)
      },
    },
  },
  plugins: [],
};