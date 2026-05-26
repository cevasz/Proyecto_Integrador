/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#172033',
          plum: '#7A1A72',
          magenta: '#C4268C',
          coral: '#F26F4F',
          cyan: '#11A9DF',
          mint: '#2BC4A2',
          canvas: '#F7F8FC'
        }
      },
      boxShadow: {
        soft: '0 18px 50px rgba(23, 32, 51, 0.10)',
        lift: '0 28px 70px rgba(23, 32, 51, 0.16)'
      }
    }
  },
  plugins: []
};
