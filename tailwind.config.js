/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'logo-color':'#ff6d63',
        'body-bg':'#E3E6E6',
        // 'footer-bg':'#131A22',
        'footer-bg':'#1C1F25',
        'footer-bottom':'#0B0C0D'
      }
    },
  },
  plugins: [],
}

