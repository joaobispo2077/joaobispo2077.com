describe('Homepage', () => {
  it('renders hero content', () => {
    cy.visit('/');

    cy.get('h1').contains('João Bispo').should('be.visible');
    cy.contains('Senior Software Engineer').should('be.visible');
    cy.contains('Crafting world-impact software').should('be.visible');
  });
});

