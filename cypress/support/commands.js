
import { loginLocators } from "../locators/loginLocators"

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/signin')
  cy.get(loginLocators.emailInput).type(username)
  cy.get(loginLocators.passwordInput).type(password)
  cy.get(loginLocators.loginButton).click()
})
