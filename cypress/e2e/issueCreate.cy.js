import { testid } from '../support/utils';

describe('Issue create', () => {
  beforeEach(() => {
    // cy.resetDatabase();
    // cy.createTestAccount();
    cy.visit('/');
    cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
      cy.visit(url + '/settings?modal-issue-create=true');
    });
  });

  it('validates form and creates issue successfully', () => {
    cy.get(testid`modal:issue-create`).within(() => {
      cy.get('button[type="submit"]').click();
      cy.get(testid`form-field:title`).should('contain', 'This field is required');

      cy.selectOption('type', 'Story');
      cy.get('input[name="title"]').type('TEST_TITLE');
      cy.get('.ql-editor').type('TEST_DESCRIPTION');
      cy.selectOption('reporterId', 'Baby Yoda');
      cy.selectOption('userIds', 'Lord Gaben', 'Baby Yoda');
      cy.selectOption('priority', 'High');

      cy.get('button[type="submit"]').click();
    });

    cy.get(testid`modal:issue-create`).should('not.exist');
    cy.contains('Issue has been successfully created.').should('exist');
    cy.location('pathname').should('equal', '/project/board');
    cy.location('search').should('be.empty');

    cy.contains(testid`list-issue`, 'TEST_TITLE')
      .should('have.descendants', testid`avatar:Gaben`)
      .and('have.descendants', testid`avatar:Yoda`)
      .and('have.descendants', testid`icon:story`);
  });
});
