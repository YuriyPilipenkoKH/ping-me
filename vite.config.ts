import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   outDir: "../public",
  //   emptyOutDir: true  
  // },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src")
  //   }
  // }
})
//
//
//