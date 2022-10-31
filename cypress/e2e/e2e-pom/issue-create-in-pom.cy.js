/**
 * Workshop #14
 * This is an example file and approach for OOP in Cypress
 */

import IssueModal from "../../pages/IssueModal";

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'http://34.247.67.214:8080/project').then((url) => {
      cy.visit(url + '/settings?modal-issue-create=true');
    });
  });

  const issueDetails = {
    title: "TEST_TITLE",
    type: "Bug",
    description: "TEST_DESCRIPTION",
    assignee: "Lord Gaben",
  };

  const EXPECTED_AMOUNT_OF_ISSUES = '5';

  it('Should create issue successfully', () => {
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
  });
});
