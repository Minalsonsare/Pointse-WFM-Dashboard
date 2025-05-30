import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // 👈 Add this line (your GitHub repo name)
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: true, // Enable host binding
    port: 5173, // Specify the port
    allowedHosts: ["pointse-wfm-dashboard.onrender.com"], // Add the allowed host
  },
});
