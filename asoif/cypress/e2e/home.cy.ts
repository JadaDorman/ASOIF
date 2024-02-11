describe('House home page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('displays houses list', () => {
    cy.get('#house-list').should('exist')
    cy.get('#house-list > li').should('have.length', 10)
  })

  it('displays house info modal on click', () => {
    cy.get('#house-list').should('exist')
    cy.get('#house-list-item').click()
    cy.get('#house-modal').should('exist')
  })

  it('closes house info modal on click', () => {
    cy.get('#house-list').should('exist')
    cy.get('#house-list-item').click()
    cy.get('#house-modal').should('exist')
    cy.get('#close-modal').click()
    cy.get('#house-modal').should('not.exist')
  })
})