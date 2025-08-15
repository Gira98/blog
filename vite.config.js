import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false,
      include: ["src/**/*.js", "src/**/*.jsx"],
      emitWarning: true,
      emitError: true,
    }),
  ],
  server: {
    open: true,
    hmr: {
      overlay: true,
    },
  },
});
