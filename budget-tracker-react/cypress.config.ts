import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Your React dev server URL
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Pattern to find test files
    supportFile: "cypress/support/e2e.ts", // TypeScript support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
