describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Testi Mies',
      username: 'testimies',
      password: 'strongpass42'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('username').find('input').type('testimies')
      cy.contains('password').find('input').type('strongpass42')
      cy.contains('login').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('username').find('input').type('testimies')
      cy.contains('password').find('input').type('wrongpass')
      cy.contains('login').click()
      cy.contains('wrong credentials')
    })
  })
})