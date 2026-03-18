
import './commands'

// capture screenshots on test failure for reporter integration
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const title = `${runnable.parent.title} -- ${test.title} (failed)`
    cy.screenshot(title)
  }
})
