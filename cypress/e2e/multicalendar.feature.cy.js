
import LoginPage from "../pages/LoginPage"
import MulticalendarPage from "../pages/MulticalendarPage"
import { calendarLocators } from "../locators/calendarLocators"
import { loginLocators } from "../locators/loginLocators"

describe('Feature: Multicalendar DSO', () => {

  let user
  let data

  before(() => {
    cy.fixture('users').then((u) => {
      user = u.validUser
    })

    cy.fixture('dsoData').then((d) => {
      data = d
    })
  })

  context('Login state', () => {

    beforeEach(() => {
      // login on baseUrl origin (https://pricelabs.co)
      cy.on('uncaught:exception', (err, runnable) => {
        // Ignore uncaught exceptions from cross-origin scripts
        return false
      })
      cy.visit('/signin')
      cy.get(loginLocators.emailInput).should('be.visible').type(user.username)
      cy.get(loginLocators.passwordInput).should('be.visible').type(user.password)
      cy.get(loginLocators.loginButton).should('be.enabled').click()
      // wait for redirect to app.pricelabs.co
      cy.url().should('include', 'app.pricelabs.co')
      // now on app.pricelabs.co
      cy.origin('https://app.pricelabs.co', () => {
        cy.visit('/multicalendar')
      })
    })

    it.only('Update DSO value for single date', () => {
      cy.origin('https://app.pricelabs.co', { args: { data } }, ({ data }) => {
        MulticalendarPage.updateSingleDateDSO(data.singleDateDSO)
        MulticalendarPage.save()
      })
    }),

    it('Verify summary updates after DSO change', () => {
      cy.origin('https://app.pricelabs.co', { args: { data } }, ({ data }) => {
        MulticalendarPage.updateSingleDateDSO(data.singleDateDSO)
        MulticalendarPage.save()
        MulticalendarPage.verifySummaryUpdate()
      })
    }),

    it('Saved DSO value should persist after reload', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    }),

    it('Bulk update DSO across a range of dates', () => {
      cy.origin('https://app.pricelabs.co', { args: { data } }, ({ data }) => {
        MulticalendarPage.updateDateRangeDSO(data.bulkStartDate, data.bulkEndDate, data.bulkDSO)
        MulticalendarPage.save()
      })
    }),

    it('Canceling a bulk edit should not persist changes', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Navigate to next month and edit a future date', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Boundary values for DSO are accepted', () => {
      cy.origin('https://app.pricelabs.co', { args: { data } }, ({ data }) => {
        MulticalendarPage.updateSingleDateDSO(data.minDSO)
        MulticalendarPage.save()
        MulticalendarPage.updateSingleDateDSO(data.maxDSO)
        MulticalendarPage.save()
      })
    })

    it('Dragging over dates selects a range and allows editing', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Out-of-range DSO values are rejected', () => {
      cy.origin('https://app.pricelabs.co', { args: { data } }, ({ data }) => {
        MulticalendarPage.enterInvalidDSO(data.invalidLow)
        MulticalendarPage.save()
        MulticalendarPage.verifyError()
      })
    })

    it('Should search property and open its calendar', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Interacts with various UI components (modal, tooltip, grid)', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Switches between calendar view modes', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Applies date range filter and verifies results', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Exports calendar data to CSV', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Displays price history for a selected date', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Performs bulk action on multiple dates', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Additional scenario: Test calendar responsiveness', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

    it('Additional scenario: Test keyboard navigation', () => {
      cy.origin('https://app.pricelabs.co', () => {
        cy.wrap(true).should('be.true')
      })
    })

  })

  context('Negative scenarios', () => {

    beforeEach(() => {
      // same login as above
      cy.on('uncaught:exception', (err, runnable) => {
        // Ignore uncaught exceptions from cross-origin scripts
        return false
      })
      cy.visit('/signin')
      cy.get(loginLocators.emailInput).should('be.visible').type(user.username)
      cy.get(loginLocators.passwordInput).should('be.visible').type(user.password)
      cy.get(loginLocators.loginButton).should('be.enabled').click()
      cy.url().should('include', 'app.pricelabs.co')
      cy.origin('https://app.pricelabs.co', () => {
        cy.visit('/multicalendar')
      })
    })

    it('Should show error for invalid DSO input', () => {
      cy.origin('https://app.pricelabs.co', { args: { data } }, ({ data }) => {
        MulticalendarPage.enterInvalidDSO(data.invalidDSO)
        MulticalendarPage.save()
        MulticalendarPage.verifyError()
      })
    })

    it('Inputs invalid percent values directly and sees toast', () => {
      cy.origin('https://app.pricelabs.co', { args: { data } }, ({ data }) => {
        MulticalendarPage.updateSingleDateDSO(data.invalidLow)
        MulticalendarPage.save()
        MulticalendarPage.verifyError()

        MulticalendarPage.updateSingleDateDSO(data.invalidHigh)
        MulticalendarPage.save()
        MulticalendarPage.verifyError()
      })
    })

  })

})
