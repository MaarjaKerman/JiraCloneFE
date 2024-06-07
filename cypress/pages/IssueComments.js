import { faker } from "@faker-js/faker";

class IssueComments {
  constructor() {
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.addingComment = "Add a comment...";
    this.commentText = 'textarea[placeholder="Add a comment..."]';
    this.issueComment = '[data-testid="issue-comment"]';
    this.saveButton = "button:contains('Save')";
    this.editButton = "Edit";
    this.deleteButton = "Delete";
    this.deleteConfirmation = '[data-testid="modal:confirm"]';
    this.confirmationButton = "Delete comment";

    this.originalComment = faker.lorem.words(4);
    this.commentEdited = faker.lorem.words(8);
  }

  getIssueDetailModal() {
    return cy.get(this.issueDetailModal);
  }

  addComment() {
    this.getIssueDetailModal().within(() => {
      cy.contains(this.addingComment).click();
      cy.get(this.commentText).type(this.originalComment);
      cy.get(this.saveButton).click().should("not.exist");
      cy.contains(this.addingComment).should("exist");
      cy.get(this.issueComment)
        .should("exist")
        .and("contain", this.originalComment);
    });
  }

  editComment() {
    this.getIssueDetailModal().within(() => {
      cy.get(this.issueComment)
        .first()
        .should("contain",this.originalComment)
        .contains(this.editButton).click()
        .should("not.exist");
      cy.get(this.commentText)
        .should("contain", this.originalComment)
        .clear()
        .type(this.commentEdited); 
      cy.get(this.saveButton).click().should("not.exist");
      cy.get(this.issueComment).should("contain", this.commentEdited);  
    });
  }

  deleteComment() {
    this.getIssueDetailModal().within(() => {
      cy.contains(this.commentEdited).click();
      cy.contains(this.deleteButton).click();
    });
    cy.get(this.deleteConfirmation)
      .should("be.visible")
      .contains(this.confirmationButton)
      .click();
    cy.get(this.deleteConfirmation).should("not.exist");
  }
}
export default new IssueComments();