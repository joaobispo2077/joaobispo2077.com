import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    // Remote previews (Vercel) can cold-start; CI runners vary in latency.
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 20000,
    retries: { runMode: 2, openMode: 0 },
  },
});

