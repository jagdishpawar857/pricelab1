
import { loginLocators } from "../locators/loginLocators"

class LoginPage {

  visit() {
    cy.visit('/signin')
  }

  login(username, password) {
    cy.get(loginLocators.emailInput).should('be.visible').type(username)
    cy.get(loginLocators.passwordInput).should('be.visible').type(password)
    cy.get(loginLocators.loginButton).should('be.enabled').click()
  }

}

export default new LoginPage()
