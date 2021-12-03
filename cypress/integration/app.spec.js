describe('Login Button', () => {
  it('should link to Ego', () => {
    cy.visit(Cypress.env('HOMEPAGE_URL'));
    cy.get('#link-login').should('have.attr', 'href').should('include', Cypress.env('EGO_URL'));
  });
});
