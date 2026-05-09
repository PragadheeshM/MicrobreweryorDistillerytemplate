// Copper & Cask — Tailwind CSS Custom Configuration
// Loaded via CDN: <script src="https://cdn.tailwindcss.com"></script>

tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          dark: '#000000',
          50: '#f9f9f9',
          100: '#f2f2f2',
          200: '#dfdfdf',
          300: '#bcbcbc',
          400: '#919191',
          500: '#686868',
          600: '#4c4c4c',
          700: '#2d2d2d',
          800: '#1a1a1a',
          900: '#0a0a0a',
        },
        secondary: {
          DEFAULT: '#f5f0e6',
          light: '#faf7f0',
          dark: '#e8e0d0',
          50: '#fefdfb',
          100: '#faf7f0',
          200: '#f5f0e6',
          300: '#ece3d3',
          400: '#ddd0b8',
          500: '#c9b999',
        },
        accent: {
          DEFAULT: '#c17817',
          light: '#d4922e',
          dark: '#a86510',
          50: '#fdf3e3',
          100: '#f9ddb3',
          200: '#f0c47e',
          300: '#e5a848',
          400: '#d4922e',
          500: '#c17817',
          600: '#a86510',
          700: '#8e530b',
          800: '#724208',
          900: '#573205',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        'accent-gradient': 'linear-gradient(135deg, #c17817 0%, #d4922e 50%, #e5a848 100%)',
        'card-gradient': 'linear-gradient(160deg, rgba(245,240,230,0.9) 0%, rgba(250,247,240,0.6) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        'glass-lg': '0 16px 48px 0 rgba(0, 0, 0, 0.3)',
        'accent': '0 4px 24px 0 rgba(193, 120, 23, 0.25)',
        'accent-lg': '0 8px 32px 0 rgba(193, 120, 23, 0.35)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(193, 120, 23, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(193, 120, 23, 0.7)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
