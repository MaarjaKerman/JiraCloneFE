describe('Issue filtering', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should filter issues by title', () => {
    getSearchInput().debounced('type', 'multiple assignee');
    cy.get('[data-testid="list-issue"]').should('have.length', '1');
  });

  /**
   * Students can create tests like
   * 1. Filter by avatar
   * 2. Filter by "Only My Issues" buton
   * 3. Filter by "Recently Updated" button
   */

  const getSearchInput = () => cy.get('[data-testid="board-filters"]').find('input');
});
