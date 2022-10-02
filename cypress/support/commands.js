// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// import '@4tw/cypress-drag-drop';

import { testid } from './utils';

Cypress.Commands.add('selectOption', (selectName, ...optionLabels) => {
    optionLabels.forEach(optionLabel => {
        cy.get(testid`select:${selectName}`).click('bottomRight');
        cy.get(testid`select-option:${optionLabel}`).click();
    });
});

Cypress.Commands.add('selectShouldContain', (selectName, ...optionLabels) => {
    optionLabels.forEach(optionLabel => {
        cy.get(testid`select:${selectName}`).should('contain', optionLabel);
    });
});

// We don't want to waste time when running e2e on cypress waiting for debounced
// inputs. We can use tick() to speed up time and trigger onChange immediately.
Cypress.Commands.add('debounced', { prevSubject: true }, (input, action, value) => {
    cy.clock();
    cy.wrap(input)[action](value);
    cy.tick(1000);
});

// Sometimes cypress fails to properly wait for api requests to finish which results
// in flaky e2e, and in those cases we need to explicitly tell it to wait
// https://docs.cypress.io/guides/guides/network-requests.html#Flake
Cypress.Commands.add('waitForXHR', (method, url, funcThatTriggersXHR) => {
    const alias = method + url;
    cy.server();
    cy.route(method, url).as(alias);
    funcThatTriggersXHR();
    cy.wait(`@${alias}`);
});

// We're using optimistic updates (not waiting for API response before updating
// the local data and UI) in a lot of places in the app. That's why we want to assert
// both the immediate local UI change in the first assert, and if the change was
// successfully persisted by the API in the second assert after page reload
Cypress.Commands.add('assertReloadAssert', assertFunc => {
    assertFunc();
    cy.reload();
    assertFunc();
});
