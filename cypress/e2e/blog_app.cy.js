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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testimies', password: 'strongpass42' })
      cy.visit('')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('Test blog')
      cy.get('#authorInput').type('Test Author')
      cy.get('#urlInput').type('http://my.example.com')
      cy.contains('button', 'create').click()

      cy.contains('Test blog')
      cy.contains('Test Author')
      cy.contains('view').click()
      cy.contains('http://my.example.com')
      cy.contains('likes 0')
      cy.contains('Test Author')
      cy.contains('hide')
    })
  })
})