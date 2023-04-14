import { resolve }  from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: [
      { find: "@core", replacement: resolve(__dirname, "libs/core/src") },
    ],
  },
});
