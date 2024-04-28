import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "firebase/app": "firebase/app",
      // Add aliases for other Firebase modules as needed
    },
  },
  optimizeDeps: {
    include: [
      "firebase/app",
      // Include other Firebase modules here
    ],
  },
});
