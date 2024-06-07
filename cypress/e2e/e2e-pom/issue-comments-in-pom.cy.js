import IssueComments from "../../pages/IssueComments";

const issueTitle = "This is an issue of type: Task.";

describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(issueTitle).click();
    });
  });

  //Assignment 1//
  it("Should create a comment successfully, edit it and delete", () => {
   IssueComments.addComment();
   IssueComments.editComment();
   IssueComments.deleteComment();
  });
});

