import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    process.env.NODE_ENV !== "production" &&
      eslint({
        cache: false,
        include: ["src/**/*.js", "src/**/*.jsx"],
        emitWarning: true,
        emitError: false,
      }),
  ].filter(Boolean),
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    open: true,
    hmr: {
      overlay: true,
    },
  },
});
