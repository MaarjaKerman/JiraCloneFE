import IssueTimeTracking from "../../pages/IssueTimeTracking";
import { faker } from "@faker-js/faker";

describe("Issue time tracking", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  const issueDetails = {
    title: "Test Issue Title",
    description: "Test Issue Description",
  };

  const expectedAmountIssues = 5;
  const initialTimeEstimation = 10;
  const updatedTimeEstimation = 20;
  const spentTime = 2;
  const remainingTime = 5;

  it("Should add, edit and remove time estimation successfully", () => {
    IssueTimeTracking.createIssue(issueDetails);
    IssueTimeTracking.ensureIssueVisible(expectedAmountIssues, issueDetails);
    IssueTimeTracking.addEstimation(issueDetails);
    IssueTimeTracking.ensureEstimationSaved();
    IssueTimeTracking.updateEstimation();
    IssueTimeTracking.ensureEstimationUpdated();
    IssueTimeTracking.removeEstimation();
    IssueTimeTracking.ensureEstimationRemoved();
  });

  it("Should log and remove time successfully", () => {
    IssueTimeTracking.createIssue(issueDetails);
    IssueTimeTracking.ensureIssueVisible(expectedAmountIssues, issueDetails);
    IssueTimeTracking.logTime(issueDetails, spentTime, remainingTime);
    IssueTimeTracking.ensureTimeLogged(issueDetails, spentTime, remainingTime);
    IssueTimeTracking.removeLoggedTime(issueDetails,spentTime,remainingTime);
    IssueTimeTracking.ensureTimeRemoved(issueDetails, spentTime, remainingTime);
});
});
