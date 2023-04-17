import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import baseConfig from "../../vite.base";

export default defineConfig({
  ...baseConfig,
  plugins: [react()],
  build: {
    outDir: "../../public/react/"
  },
  base: '/react/',
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['.', '../../libs'],
    },
  },
});
