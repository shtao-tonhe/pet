// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 确保覆盖所有 Vue 组件路径
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}