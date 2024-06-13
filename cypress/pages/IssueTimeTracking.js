class IssueTimeTracking {
  constructor() {
    this.issueModal = '[data-testid="modal:issue-create"]';
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.titleInput = 'input[name="title"]';
    this.descriptionInput = ".ql-editor";
    this.submitButton = 'button[type="submit"]';
    this.backlogList = '[data-testid="board-list:backlog"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.noTimeLogged = "No time logged";
    this.estimationInput = 'input[placeholder="Number"]';
    this.closeDetailModalButton = '[data-testid="icon:close"]';
    this.logTimeIcon = '[data-testid="icon:stopwatch"]';
    this.timeTrackingModal = '[data-testid="modal:tracking"]';
    this.timeInputField = 'input[placeholder="Number"]';
    this.doneButton = 'button:contains("Done")';
  }

  getIssueModal() {
    return cy.get(this.issueModal);
  }

  getIssueDetailModal() {
    return cy.get(this.issueDetailModal);
  }

  typeTitle(title) {
    cy.get(this.titleInput).wait(3000).type(title);
  }

  typeDescription(description) {
    cy.get(this.descriptionInput).type(description);
  }

  //Creating a new issue for the time tracking tests//
  createIssue(issueDetails) {
    this.getIssueModal().within(() => {
      this.typeDescription(issueDetails.description);
      this.typeTitle(issueDetails.title);
      cy.get(this.submitButton).click();
    });
  }

  ensureIssueVisible(expectedAmountIssues, issueDetails) {
    cy.get(this.issueModal).should("not.exist");
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");
    cy.get(this.backlogList)
      .should("be.visible")
      .and("have.length", 1)
      .within(() => {
        cy.get(this.issuesList)
          .should("have.length", expectedAmountIssues)
          .first()
          .find("p")
          .contains(issueDetails.title);
      });
  }

//Adding initial estimated time and confirming the visibility//
  addEstimation(issueDetails) {
    cy.get(this.backlogList).contains(issueDetails.title).click();
    cy.contains(issueDetails.title, { timeout: 10000 }).should("be.visible");
    cy.get(this.issueDetailModal, { timeout: 60000 }).within(() => {
      cy.contains(this.noTimeLogged).should("be.visible");
      cy.get(this.estimationInput).type("10");
      cy.get(this.closeDetailModalButton).first().click();
      cy.get(this.issueDetailModal).should("not.exist");
    });
  }

  ensureEstimationSaved() {
    cy.get(this.issuesList).first().click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.estimationInput).should("have.value", "10");
      cy.get(this.closeDetailModalButton).first().click();
      cy.get(this.issueDetailModal).should("not.exist");
    });
  }

  //Updating the estimated time and confirming the update//
  updateEstimation() {
    cy.get(this.issuesList).first().click();
    cy.get(this.issueDetailModal, { timeout: 60000 }).within(() => {
      cy.get(this.estimationInput).clear().type("20");
      cy.get(this.closeDetailModalButton).first().click();
      cy.get(this.issueDetailModal).should("not.exist");
    });
  }

  ensureEstimationUpdated() {
    cy.get(this.issuesList).first().click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.estimationInput).should("have.value", "20");
      cy.get(this.closeDetailModalButton).first().click();
      cy.get(this.issueDetailModal).should("not.exist");
    });
  }

  //Removing the estimated time and confirming the removal//
  removeEstimation() {
    cy.get(this.issuesList).first().click();
    cy.get(this.issueDetailModal, { timeout: 60000 }).within(() => {
      cy.get(this.estimationInput).clear();
      cy.get(this.closeDetailModalButton).first().click();
      cy.get(this.issueDetailModal).should("not.exist");
    });
  }

  ensureEstimationRemoved() {
    cy.get(this.issueDetailModal).should("not.exist");
    cy.get(this.issuesList).first().click();
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(this.noTimeLogged).should("be.visible");
      cy.get(this.closeDetailModalButton).first().click();
      cy.get(this.issueDetailModal).should("not.exist");
    });
  }

  //Logging spent time and remaining time and confirming the visibility//
  logTime(issueDetails, spentTime, remainingTime) {
    cy.get(this.backlogList).contains(issueDetails.title).click();
    cy.get(this.issueDetailModal, { timeout: 60000 }).within(() => {
      cy.get(this.logTimeIcon).click();
    });
    cy.get(this.timeTrackingModal).within(() => {
      cy.get(this.timeInputField)
        .eq(0)
        .type(spentTime)
        .should("have.attr", "value", spentTime)
        .should("be.visible");
      cy.get(this.timeInputField)
        .eq(1)
        .type(remainingTime)
        .should("have.attr", "value", remainingTime)
        .should("be.visible");
      cy.get(this.doneButton).click();
    });
    cy.contains(this.noTimeLogged).should("not.exist");
    cy.get(this.closeDetailModalButton).click();
  }

  ensureTimeLogged(issueDetails,spentTime, remainingTime) {
    cy.get(this.backlogList).contains(issueDetails.title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(`${spentTime}h logged`).should("be.visible");
      cy.contains(`${remainingTime}h remaining`).should("be.visible");
    });
  }

//Removing the logged time for both spent and remaining and confirming the removal//
  removeLoggedTime(issueDetails) {
    cy.get(this.backlogList)
      .contains(issueDetails.title)
      .click({ force: true });
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.logTimeIcon).click();
    });
    cy.get(this.timeTrackingModal).within(() => {
      cy.get(this.timeInputField)
        .eq(0)
        .clear()
        .should("have.attr", "value", "");
      cy.get(this.timeInputField)
        .eq(1)
        .clear()
        .should("have.attr", "value", "");
      cy.get(this.doneButton).click();
    });
  }

  ensureTimeRemoved(issueDetails) {
    cy.get(this.backlogList)
      .contains(issueDetails.title)
      .click({ force: true });
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(this.noTimeLogged).should("exist");
      cy.get(this.closeDetailModalButton).first().click();
    });
  }
}

export default new IssueTimeTracking();
