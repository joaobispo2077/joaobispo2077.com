describe('Homepage', () => {
  it('renders hero content', () => {
    // Next.js i18n uses Accept-Language; keep routing stable in headless CI.
    cy.visit('/', {
      timeout: 120000,
      headers: { 'Accept-Language': 'en-US,en;q=0.9' },
    });

    cy.get('h1').contains('João Bispo').should('be.visible');
    cy.contains('Senior Software Engineer').should('be.visible');
    cy.contains('Crafting world-impact software').should('be.visible');
  });
});

export {};

