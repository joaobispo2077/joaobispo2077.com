describe('Homepage', () => {
  it('renders hero content', () => {
    const bypass = (Cypress.env('vercelProtectionBypass') as string | undefined)?.trim();
    const headers: Record<string, string> = {
      'Accept-Language': 'en-US,en;q=0.9',
    };
    if (bypass) {
      headers['x-vercel-protection-bypass'] = bypass;
      headers['x-vercel-set-bypass-cookie'] = 'true';
    } else {
      cy.log('No VERCEL_AUTOMATION_BYPASS_SECRET — protected previews may 403.');
    }

    // Load even on 403 so we can detect Vercel’s bot “Security Checkpoint” (x-vercel-mitigated: challenge),
    // which is separate from Deployment Protection — the automation bypass secret does not satisfy that layer.
    cy.visit('/', { timeout: 120000, headers, failOnStatusCode: false });

    cy.title().then((title) => {
      if (/security checkpoint/i.test(title)) {
        throw new Error(
          [
            'Vercel Security Checkpoint (Firewall / Attack Challenge), not the app.',
            'The deployment-protection bypass secret does not disable this.',
            'In Vercel: Project or Team → Firewall — review Attack Challenge Mode and rules for Preview;',
            'or add GitHub Actions IP ranges / an allow rule for your automation.',
            'https://vercel.com/docs/vercel-firewall/attack-challenge-mode',
          ].join(' '),
        );
      }
    });

    cy.get('h1').contains('João Bispo').should('be.visible');
    cy.contains('Senior Software Engineer').should('be.visible');
    cy.contains('Crafting world-impact software').should('be.visible');
  });
});

export {};

