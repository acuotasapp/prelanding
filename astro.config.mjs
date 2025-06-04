import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  prefetch: { prefetchAll: true },
  vite: {
    build: {
      sourcemap: true,
    },
      
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  },

  site: 'https://acuotas.app/',
  base: '/',
  integrations: [vue(), sitemap()],
});