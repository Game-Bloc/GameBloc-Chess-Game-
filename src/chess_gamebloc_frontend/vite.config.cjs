import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    // extensions: [".js", ".ts", ".jsx", ".tsx"],  // this is also for the websocket integration
    // fallback: {
    //   assert: require.resolve("assert/"),
    //   buffer: require.resolve("buffer/"),
    //   events: require.resolve("events/"),
    //   stream: require.resolve("stream-browserify/"),
    //   util: require.resolve("util/"),
    //   crypto: require.resolve("crypto-browserify/"),  // <- add this line
    // },  // this is for the websocket integration
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
    ],
  },
});
