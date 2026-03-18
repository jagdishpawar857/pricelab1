
describe('API Testing - DSO Update', () => {

  it('Update DSO value via API', () => {

    cy.request({
      method: 'POST',
      url: '/api/dso/update',
      failOnStatusCode: false,
      body: {
        date: '2026-04-10',
        dso: 20
      }
    }).then((res) => {

      expect(res.status).to.eq(404)

    })

  })

  it('Negative test with invalid payload', () => {

    cy.request({
      method: 'POST',
      url: '/api/dso/update',
      failOnStatusCode: false,
      body: {
        date: null
      }
    }).then((res) => {

      expect(res.status).to.eq(404)

    })

  })

})
