/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { 
            transform: 'translateY(-20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 0, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 0, 0.4)' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseLight: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        downloadBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(3px)' },
        },
        downloadPulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
        wiggle: 'wiggle 0.5s ease-in-out',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        bounceLight: 'bounceLight 2s ease-in-out infinite',
        pulseLight: 'pulseLight 2s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
        downloadBounce: 'downloadBounce 1s ease-in-out infinite',
        downloadPulse: 'downloadPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      colors:{
        
        'pemex-green': '#006341',
        'pemex-red': '#ec1c24',
        'pemex-gray': '#f5f5f5',
        'pemex-dark-gray': '#4a4a4a',
        'pemex-black': '#1a1a1a',
        'pemex-white': '#ffffff',
      }
    },
  },
  plugins: [],
}

