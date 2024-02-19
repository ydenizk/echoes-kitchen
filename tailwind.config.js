/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
      backgroundImage: {
        'banner': 'url("/banner.jpg")',
        'resbanner': 'url("/banner-res.jpg")',
        'reservv': 'url("/reserv-1.jpg")',
        'menu-banner': 'url("/menu-banner.jpg")',
      },
      colors: {
        blackk: "rgb(26,26,33)",
        bannercolor:'#9A3B3B',
        bgcolor:'rgb(239,239,239)',
      },
    },
    screens: {
      lg: { max: "1024px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      mmd: { max: "860px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }
      md: { max: "760px" },
      sm: { max: "640px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      xs: { max: "480px" },
    },
  },
  plugins: [],
};
