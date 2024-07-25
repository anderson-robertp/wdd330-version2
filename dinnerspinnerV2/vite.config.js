import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    'process.env': process.env
  },
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        translator: resolve(__dirname, "src/translator/index.html"),
        preferences: resolve(__dirname, "src/preferences/index.html"),
        register: resolve(__dirname, "src/register/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
      },
    }
  }
});
