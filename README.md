
# PriceLabs Automation QA Assignment

## Architecture
Hybrid Framework using:
- TDD (Mocha describe / context / it)
- Data Driven (fixtures)
- Page Object Model (pages + locators separation)

## Structure
pages -> business logic  
locators -> selectors  
fixtures -> test data  
e2e -> test cases

## Run Tests
Install dependencies and launch Cypress:

```bash
npm install
npx cypress open   # interactive runner
# or npx cypress run for headless execution
```

Configuration is located in `cypress.config.js` (baseUrl, reporter, etc.)

### Environment
The `baseUrl` points to the QA environment and can be overridden with
`CYPRESS_baseUrl` when running tests.

### Global Hooks
A screenshot-on-failure hook is registered in `cypress/support/e2e.js` so
any failing spec will produce an image for the Mochawesome report.


## Reporting
Mochawesome reporter configured.

## Included Specs
- `login.feature.cy.js` – login/logout and authentication verification (valid/invalid creds).
- `multicalendar.feature.cy.js` – full multicalendar UI coverage, drag-and-drop, bulk edits, boundary checks, persistence, component interactions.
- `multicalendar.api.cy.js` – simple API layer tests demonstrating functional and negative requests.

## Credentials (QA environment)
Use the fixture `cypress/fixtures/users.json` or the following:

```
Login URL: https://pricelabs.co/signin
Post-login URL: https://app.pricelabs.co/multicalendar
Username: qa.pricelabs@gmail.com
Password: qg33N$yxJP
```
