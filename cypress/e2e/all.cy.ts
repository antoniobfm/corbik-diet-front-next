describe('sign in', () => {
  it('should be able to sign in', () => {
    cy.visit('/')

		cy.getBySel("login-button").click();

  })
})

export {}
