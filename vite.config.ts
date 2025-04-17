import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const apiKey = env.VITE_RAPIDAPI_KEY;

  return {
    server: {
      proxy: {
        "/api": {
          target: "https://aerodatabox.p.rapidapi.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          headers: {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": apiKey || "",
          },
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, req, _res) => {
              console.log(
                `[vite-proxy] ${req.method} ${req.url} → ${proxyReq.getHeader(
                  "host"
                )}`
              );
            });

            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                `[vite-proxy] ← ${req.method} ${req.url} [${proxyRes.statusCode}]`
              );

              // Check for 401 Unauthorized and log a helpful message
              if (proxyRes.statusCode === 401) {
                console.error(
                  `[vite-proxy] 401 Unauthorized: Please check your API key in the .env file. Ensure that VITE_RAPIDAPI_KEY is set correctly and matches the key provided by RapidAPI.`
                );
              }
            });

            proxy.on("error", (err, req, _res) => {
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
  };
});
