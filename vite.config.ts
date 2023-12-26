import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/lib/setup.ts",
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@features": path.resolve(__dirname, "src/features/*"),
      "@collections": path.resolve(__dirname, "src/features/collections/*"),
    },
  },
});
