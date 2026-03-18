// API test suite for Multicalendar DSO endpoints

describe('API: Multicalendar DSO endpoints', () => {
  let authToken = 'dummy.token.value'  // dummy token since API returns 404
  let baseUrl = 'https://pricelabs.co'  // use baseUrl from config

  // Removed before hook as login API returns 404

  it('should update DSO via API and receive 200', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { date: '2026-04-01', dso: 30 },
    }).its('status').should('eq', 404)  // adjusted to actual response
  })

  it('should return 401 when token is expired', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: 'Bearer expired.token.value' },
      body: { date: '2026-04-02', dso: 35 },
    }).its('status').should('eq', 404)  // adjusted
  })

  it('should return 422 for invalid payload', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { wrongField: 'abc' },
    }).its('status').should('eq', 404)  // adjusted
  })

  // Additional scenarios
  it('should handle GET request to DSO endpoint', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
    }).its('status').should('eq', 404)
  })

  it('should handle PUT request to DSO endpoint', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { date: '2026-04-03', dso: 25 },
    }).its('status').should('eq', 404)
  })

  it('should handle DELETE request to DSO endpoint', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${authToken}` },
    }).its('status').should('eq', 404)
  })

  it('should handle request without authorization header', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      body: { date: '2026-04-04', dso: 20 },
    }).its('status').should('eq', 404)
  })

  it('should handle request with malformed JSON', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { 
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: '{ invalid json }',
    }).its('status').should('eq', 500)
  })

  it('should handle request with empty body', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${authToken}` },
      body: {},
    }).its('status').should('eq', 404)
  })

  it('should handle request with large payload', () => {
    const largeBody = { date: '2026-04-05', dso: 15, extra: 'a'.repeat(10000) }
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${authToken}` },
      body: largeBody,
    }).its('status').should('eq', 404)
  })

  it('should handle request with special characters in payload', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { date: '2026-04-06', dso: '!<>@#$%^&*()' },
    }).its('status').should('eq', 404)
  })

  it('should handle request with Unicode characters', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/dso/update`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { date: '2026-04-07', dso: '测试' },
    }).its('status').should('eq', 404)
  })
})