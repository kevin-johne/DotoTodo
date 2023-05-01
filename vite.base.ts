import { resolve }  from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: [
      { find: "@core", replacement: resolve(__dirname, "libs/core/src") },
      { find: "@data", replacement: resolve(__dirname, "data") },
    ],
  },
  server: {
    fs: {
      allow: ['.', '../../libs', '../../node_modules/', '../../data'],
    },
  },
});
