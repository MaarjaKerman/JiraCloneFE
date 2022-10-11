const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://jira.ivorreic.com/project/board',
    defaultCommandTimeout: 30000,
    projectId: "nb4inc",
  },
});
