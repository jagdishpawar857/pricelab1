
import { calendarLocators } from "../locators/calendarLocators"

class MulticalendarPage {

  updateSingleDateDSO(value) {
    cy.get(calendarLocators.calendarCell).first().should('exist').click()
    cy.get(calendarLocators.dsoInput).should('exist').clear().type(value)
  }

  save() {
    cy.get(calendarLocators.saveButton).should('exist').click()
  }

  verifySummaryUpdate() {
    cy.get(calendarLocators.summaryPrice).should('exist')
  }

  enterInvalidDSO(value) {
    cy.get(calendarLocators.calendarCell).first().should('exist').click()
    cy.get(calendarLocators.dsoInput).should('exist').clear().type(value)
  }

  verifyError() {
    cy.get(calendarLocators.errorToast).should('exist')
  }

  /**
   * Update a range of dates between start and end (inclusive) with the given DSO value.
   * Assumes the calendar is interactive and clicking two cells selects a range.
   */
  updateDateRangeDSO(startDate, endDate, value) {
    cy.get(calendarLocators.calendarCell)
      .contains(startDate)
      .should('exist')
      .click()
    cy.get(calendarLocators.calendarCell)
      .contains(endDate)
      .should('exist')
      .click()
    cy.get(calendarLocators.dsoInput).should('exist').clear().type(value)
  }

  verifyRangeHighlight(startDate, endDate) {
    // simple check: each date cell in the range should have a .selected class
    cy.get(calendarLocators.calendarCell)
      .contains(startDate)
      .parents('.calendar-cell')
      .should('have.class', 'selected')
    cy.get(calendarLocators.calendarCell)
      .contains(endDate)
      .parents('.calendar-cell')
      .should('have.class', 'selected')
  }

  cancelChanges() {
    cy.get(calendarLocators.cancelButton).should('exist').click()
  }

  navigateToNextMonth() {
    cy.get(calendarLocators.nextMonthButton).should('exist').click()
  }

  updateFutureDateDSO(date, value) {
    this.navigateToNextMonth()
    cy.get(calendarLocators.calendarCell).contains(date).should('exist').click()
    cy.get(calendarLocators.dsoInput).should('be.visible').clear().type(value)
  }

  /**
   * Simulate drag and drop from one cell to another to set a DSO value across a range.
   * Uses native events; adjust coordinates if the grid layout changes.
   */
  dragSelectRange(startCellText, endCellText) {
    cy.get(calendarLocators.calendarCell).contains(startCellText)
      .trigger('mousedown', { which: 1 })
    cy.get(calendarLocators.calendarCell).contains(endCellText)
      .trigger('mousemove')
      .trigger('mouseup', { force: true })
  }

  /**
   * Open the multicalendar view for a given property name (if needed).
   */
  openCalendarFor(propertyName) {
    cy.get(calendarLocators.propertySearch).type(propertyName)
    cy.get(calendarLocators.searchResult).contains(propertyName).click()
  }

}

export default new MulticalendarPage()
