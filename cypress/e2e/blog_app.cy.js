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

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'Test blog', author: 'Test Author', url: 'http://my.example.com' })
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted by owner', function() {
      cy.createBlog({ title: 'Test blog', author: 'Test Author', url: 'http://my.example.com' })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('Test blog').should('not.exist')
      cy.contains('Test Author').should('not.exist')
    })

    it('A blog cannot be deleted by non-owner', function() {
      cy.createBlog({ title: 'Test blog', author: 'Test Author', url: 'http://my.example.com' })
      cy.contains('logout').click()
      const user = {
        name: 'Testi Mies 2',
        username: 'testimies2',
        password: 'strongpass4242'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      cy.login({ username: 'testimies2', password: 'strongpass4242' })
      cy.visit('')
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })
  })
})