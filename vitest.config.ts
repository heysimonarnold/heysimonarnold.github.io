import { defineConfig, type ViteUserConfigExport } from "vitest/config";

const config: ViteUserConfigExport = {
  test: {
    environment: "jsdom",
    globals: true,
    include: ["**/*.test.ts"],
    root: "./src",
  },
};

export default defineConfig(config);
