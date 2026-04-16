describe('Homepage', () => {
  it('renders hero content', () => {
    // Preview deployments with Deployment Protection need the automation bypass secret
    // (Vercel: Project → Settings → Deployment Protection → Protection Bypass for Automation).
    // GitHub: set repository secret VERCEL_AUTOMATION_BYPASS_SECRET to the same value.
    const bypass = Cypress.env('VERCEL_PROTECTION_BYPASS') as string | undefined;
    const headers: Record<string, string> = {
      'Accept-Language': 'en-US,en;q=0.9',
    };
    if (bypass) {
      headers['x-vercel-protection-bypass'] = bypass;
      headers['x-vercel-set-bypass-cookie'] = 'true';
    }

    cy.visit('/', { timeout: 120000, headers });

    cy.get('h1').contains('João Bispo').should('be.visible');
    cy.contains('Senior Software Engineer').should('be.visible');
    cy.contains('Crafting world-impact software').should('be.visible');
  });
});

export {};

