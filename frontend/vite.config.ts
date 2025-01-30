import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../public"  // Change the output directory from "dist" to "public"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
//
//
//