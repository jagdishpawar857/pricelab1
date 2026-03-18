
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // baseUrl for login (pricelabs.co), post-login uses cy.origin for app.pricelabs.co
    baseUrl: process.env.CYPRESS_baseUrl || "https://pricelabs.co",
    experimentalOriginDependencies: true,
    setupNodeEvents(on, config) {
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  }
});
