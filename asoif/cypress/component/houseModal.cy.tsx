import React from 'react'
import HouseModal from '../../src/app/components/houseModal'
import { SWORN_MEMBER_FIXTURE } from '../fixtures/house'


describe('<HouseModal /> tests', () => {
  it('renders with sworn members', () => {
    cy.mount(<HouseModal houseName={'House Ambrose'} swornMembers={SWORN_MEMBER_FIXTURE} isModalOpen={true} handleCloseModal={function (): void {
      cy.get('h1').should('have.text', 'House Ambrose')
      cy.get('table').should('have.length.greaterThan',  0)
    } } />)
  })

  it('displays `This house has no members` when no sworn members', () => {
    cy.mount(<HouseModal houseName={'House Algood'} swornMembers={[]} isModalOpen={true} handleCloseModal={function (): void {
      cy.get('h1').should('have.text', 'House Algood')
      cy.get('table').should('have.length', 0)
      cy.get('p').should('have.text', 'This house has no members.')
    } } />)
  })
})