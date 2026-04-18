import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    proxy: {
      "/api": {
        target: "https://yancarz-be.azurewebsites.net",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});