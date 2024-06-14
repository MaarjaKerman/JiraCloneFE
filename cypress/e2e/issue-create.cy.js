// Variables
import { faker } from "@faker-js/faker";
const randomTitle = faker.word.words({ count: 1 });
const randomDescription = faker.word.words({ count: { min: 2, max: 6 } });

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", `${Cypress.env("baseUrl")}project/board`);
    cy.visit("/board?modal-issue-create=true");
  });

  it("Should create an issue and validate it successfully", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get(".ql-editor").type("TEST_DESCRIPTION");
      cy.get('input[name="title"]').type("TEST_TITLE");
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]').click();
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    const backlogList = cy
      .get('[data-testid="board-list:backlog"]')
      .should("be.visible");

    backlogList.within(() => {
      cy.get('[data-testid="list-issue"]')
        .should("have.length", "5")
        .first()
        .find("p")
        .contains("TEST_TITLE")
        .siblings()
        .within(() => {
          cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
          cy.get('[data-testid="icon:story"]').should("be.visible");
        });
    });

    backlogList.contains("TEST_TITLE").within(() => {
      cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
      cy.get('[data-testid="icon:story"]').should("be.visible");
    });
  });

  it("Should validate title is required field if missing", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="form-field:title"]').should(
        "contain",
        "This field is required"
      );
    });
  });

   //Assignment 2- Test case 1//
  it("Should create another issue and validate it successfully,", () => {
    cy.get('[data-testid="modal:issue-create"]', { timeout: 40000 }).within(
      () => {
        cy.get(".ql-editor").type("My bug description");
        cy.get(".ql-editor").should("have.text", "My bug description");
        cy.get('input[name="title"]').type("Bug");
        cy.get('input[name="title"]').should("have.value", "Bug");
        cy.get('[data-testid="select:type"]').click();
        cy.get('[data-testid="select-option:Bug"]')
          .wait(1000)
          .trigger("mouseover")
          .trigger("click");

        cy.get('[data-testid="icon:bug"]').should("be.visible");
        cy.get('[data-testid="select:reporterId"]').click();
        cy.get('[data-testid="select-option:Pickle Rick"]').click();
        cy.get('[data-testid="form-field:userIds"]').click();
        cy.get('[data-testid="select-option:Lord Gaben"]').click();
        cy.get('[data-testid="form-field:priority"]').click();
        cy.get('[data-testid="select-option:Highest"]').click();
        cy.get('button[type="submit"]').click();
      }
    );

    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("Bug")
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
            cy.get('[data-testid="icon:bug"]').should("be.visible");
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains("Bug")
      .within(() => {
        cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
        cy.get('[data-testid="icon:bug"]').should("be.visible");
      });
  });

  //Assignment 2- Test case 2//
it("Should create an issue with random data plugin", () => {
  cy.get('[data-testid="modal:issue-create"]', { timeout: 40000 }).should("be.visible").within(() => {
    cy.get(".ql-editor").type(randomDescription);
    cy.get(".ql-editor").should("have.text", randomDescription);
    cy.get('input[name="title"]').type(randomTitle);
    cy.get('input[name="title"]').should("have.value", randomTitle);
    cy.get('[data-testid="select:type"]')
      .should("contain", "Task")
      .wait(1000)
      .trigger("mouseover")
      .trigger("click");
  })

    cy.get('[data-testid="icon:task"]').should("be.visible");
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Baby Yoda"]').click();
    cy.get('[data-testid="form-field:priority"]').click();
    cy.get('[data-testid="select-option:Low"]').click();
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    cy.get('[data-testid="board-list:backlog"]', { timeout: 60000 })
      .should("be.visible")
      .and("have.length", 1)
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", 5)
          .first()
          .find("p")
          .contains(randomTitle)
          .siblings()
          .within(() => {
            cy.get('[data-testid="icon:task"]').should("be.visible");
          });
      });
    });

  // Assignment 3 - Task 3
  it("Should verify removing unnecessary spaces on the board view", () => {
    const title = "   Hello World!      ";
    const description = faker.lorem.sentence(2);
    const trimTitle = title.trim();

    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get(".ql-editor").type(description);
      cy.get('input[name="title"]').type(title);
      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.get('[data-testid="list-issue"]').contains(trimTitle).click();
    });

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('textarea[placeholder="Short summary"]').clear().type(trimTitle);
      cy.get('[data-testid="icon:close"]').click();
    });
  })
});
