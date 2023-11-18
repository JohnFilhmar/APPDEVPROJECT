/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
     
        gradient: 'linear-gradient(to bottom, #f2f2f2, #d9d9d9, #fff)',
      
     
      container: {
        padding: {
          DEFAULT: '20px',
        },
        margin: {
          DEFAULT: '0 auto',
        },
        width: {
          DEFAULT: '500px',
        },
        border: {
          DEFAULT: '1px solid #ccc',
        },
        borderRadius: {
          DEFAULT: '5px',
        },
        backgroundColor: {
          DEFAULT: '#fff',
        },
        boxShadow: {
          DEFAULT: '0 0 10px rgba(0, 0, 0, 0.2)',
        },
        textAlign: {
          DEFAULT: 'center',
        },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
     
    },

  },
  plugins: [
    require('flowbite/plugin')
  ],
  backgroundImage: {
    gradient: 'linear-gradient(to bottom, #f2f2f2, #d9d9d9, #fff)',
  },
  
    }

  }
