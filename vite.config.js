import { defineConfig } from "vite";

import path from "path";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "mapboxgl-marker-compass",
      fileName: "mapboxgl-marker-compass",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css")
            return "mapboxgl-marker-compass.css";
          return assetInfo.name;
        },
      },
    },
  },
});
