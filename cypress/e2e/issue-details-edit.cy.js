describe("Issue details editing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  it("Should update type, status, assignees, reporter, priority successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click("bottomRight");
      cy.get('[data-testid="select-option:Story"]')
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="select:type"]').should("contain", "Story");

      cy.get('[data-testid="select:status"]').click("bottomRight");
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should("have.text", "Done");

      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should("contain", "Baby Yoda");
      cy.get('[data-testid="select:assignees"]').should(
        "contain",
        "Lord Gaben"
      );

      cy.get('[data-testid="select:reporter"]').click("bottomRight");
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should(
        "have.text",
        "Pickle Rick"
      );

      cy.get('[data-testid="select:priority"]').click("bottomRight");
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should("have.text", "Medium");
    });
  });

  it("Should update title, description successfully", () => {
    const title = "TEST_TITLE";
    const description = "TEST_DESCRIPTION";

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get(".ql-snow").click().should("not.exist");

      cy.get(".ql-editor").clear().type(description);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('textarea[placeholder="Short summary"]').should(
        "have.value",
        title
      );
      cy.get(".ql-snow").should("contain.text", description);
    });
  });

  // Assignment 3, Test 1 //

  const expectedLengthPriority = 5;
  const priorities = [];
  const prioritySelection = '[data-testid="select:priority"]';
  const selectOptions = '[data-testid^="select-option:"]';

  it("Should verify the content of the Priority dropdown", () => {
    getIssueDetailsModal().within(() => {
      cy.get(prioritySelection)
        .invoke("text")
        .then((selectedPriority) => {
          priorities.push(selectedPriority);
          cy.log(`Length of the array: ${priorities.length}`);
        });

      cy.get(prioritySelection).click();
      cy.get(selectOptions)
        .each(($el) => {
          cy.wrap($el)
            .invoke("text")
            .then((priorityOption) => {
              priorities.push(priorityOption);
              cy.log(`Value added: ${priorityOption}`);
              cy.log(`Length of array: ${priorities.length}`);
            });
        })
        .then(() => {
          expect(priorities.length).to.eq(expectedLengthPriority);
          cy.log(`Priorities array: ${priorities}`);
        });
    });
  });

  // Assignment 3, Test 2 //

  it("Should verify that the reporter's name has only characters in it", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:reporter"]').each(($reporter) => {
        cy.wrap($reporter)
          .invoke("text")
          .then((reporterName) => {
            expect(reporterName.trim()).to.match(/^[A-Za-z\s]+$/);
          });
      });
    });
  // Assignment 3, Test 2 //

  it.only("Should verifY that the application is removing unnecessary spaces on the board view", () => {

  });
});
