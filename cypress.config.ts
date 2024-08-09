import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/integration/**/*.ts",
    supportFile: "cypress/support/index.ts",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
