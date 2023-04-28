describe('Authentication and verifying default setup', () => {
  beforeEach(() => {
    cy.visit('/project/board');
  });

  it('Should create guest account if user has no auth token and verify default amount of issues on board', () => {
    cy.window()
      .its('localStorage.authToken')
      .should('be.undefined');

    cy.window()
      .its('localStorage.authToken')
      .should('be.a', 'string')
      .and('not.be.empty');

    //Assert total amount of issues on the board  
    cy.get('[data-testid="list-issue"]').should('have.length', 8);
  });
});
