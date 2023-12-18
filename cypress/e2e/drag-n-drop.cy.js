import { KeyCodes } from '../support/keyCodes';

describe('Issues drag & drop functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`);
  });

  it('Should move issue to another list (from "Backlog" to "Seleted For Development")', () => {
    cy.get('[data-testid="board-list:backlog"]').should(
      'contain',
      firstIssueTitle
    );
    cy.get('[data-testid="board-list:selected"]').should(
      'not.contain',
      firstIssueTitle
    );
    moveFirstIssue(KeyCodes.ARROW_RIGHT);

    cy.assertReloadAssert(() => {
      cy.get('[data-testid="board-list:backlog"]').should(
        'not.contain',
        firstIssueTitle
      );
      cy.get('[data-testid="board-list:selected"]').should(
        'contain',
        firstIssueTitle
      );
    });
  });

  it('Should move issue within single list (within "Backlog")', () => {
    getIssueAtIndex(0).should('contain', firstIssueTitle);
    getIssueAtIndex(1).should('contain', secondIssueTitle);
    moveFirstIssue(KeyCodes.ARROW_DOWN);

    cy.assertReloadAssert(() => {
      getIssueAtIndex(0).should('contain', secondIssueTitle);
      getIssueAtIndex(1).should('contain', firstIssueTitle);
    });
  });

  const firstIssueTitle = 'This is an issue of type: Task.';
  const secondIssueTitle = "Click on an issue to see what's behind it.";

  const getIssueAtIndex = (index) =>
    cy.get('[data-testid="list-issue"]').eq(index);

  const moveFirstIssue = (directionKeyCode) => {
    // This function comes from support/commands.js file
    cy.waitForXHR('PUT', '/issues/**', () => {
      getIssueAtIndex(0)
        .focus()
        .trigger('keydown', { keyCode: KeyCodes.SPACE })
        .trigger('keydown', { keyCode: directionKeyCode, force: true })
        .trigger('keydown', { keyCode: KeyCodes.SPACE, force: true });
    });
  };
});
