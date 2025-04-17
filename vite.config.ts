import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://aerodatabox.p.rapidapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
          "x-rapidapi-key": "",
        },

        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log(
              `[vite-proxy] ${req.method} ${req.url} → ${proxyReq.getHeader(
                "host"
              )}`
            );
          });

          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log(
              `[vite-proxy] ← ${req.method} ${req.url} [${proxyRes.statusCode}]`
            );
          });

          proxy.on("error", (err, req, res) => {
            console.error(
              `[vite-proxy] ERROR on ${req.method} ${req.url}:`,
              err.message
            );
          });
        },
      },
    },
  },

  plugins: [react()],
});
