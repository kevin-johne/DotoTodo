import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import baseConfig from "../../vite.base";

export default defineConfig({
  ...baseConfig,
  plugins: [svelte()],
  build: {
    outDir: "../../public/svelte/"
  },
  base: '/svelte/',
})
