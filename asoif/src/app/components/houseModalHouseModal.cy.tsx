import React from 'react'
import HouseModal from './houseModal'

describe('<HouseModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HouseModal />)
  })
})