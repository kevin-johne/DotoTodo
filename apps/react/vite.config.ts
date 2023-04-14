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
});
