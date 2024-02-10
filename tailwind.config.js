/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        "blue":"#138AC9",
        "green":"#2BC342",
        "orange":"#E8984A",
        "pink":"#E27077",

        "text-title":"#3A3735",
        "text-body":"#6A6A6A",
      },

      fontFamily: {
        'primary': ["'Mochiy Pop One'"],
        'secondary': ["'DM Sans Variable'"],
      },

      screens: {
				"mlg": "896px",
			},
      
    },
  },
  plugins: [],
};
