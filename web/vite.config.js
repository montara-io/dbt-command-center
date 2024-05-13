import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    cssCodeSplit: false, // Disable CSS code splitting
    assetsInlineLimit: 100000000, // Increase inline limit to a high value
  },
});
