import { defineConfig } from "vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "~",
        replacement: resolve(__dirname, "./app"),
      },
    ],
  },
  plugins: [tsconfigPaths()],
});
