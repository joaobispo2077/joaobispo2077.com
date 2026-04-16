import { defineConfig } from 'cypress';

// Read bypass here so CI can pass VERCEL_AUTOMATION_BYPASS_SECRET (GitHub secret name).
// Note: CYPRESS_FOO becomes Cypress.env("foo") in camelCase, not "FOO" — easy to get wrong in tests.
const vercelProtectionBypass =
  process.env.VERCEL_AUTOMATION_BYPASS_SECRET ||
  process.env.CYPRESS_VERCEL_PROTECTION_BYPASS ||
  '';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    // Remote previews (Vercel) can cold-start; CI runners vary in latency.
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 20000,
    retries: { runMode: 2, openMode: 0 },
    env: {
      vercelProtectionBypass,
    },
  },
});

