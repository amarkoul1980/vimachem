/// <reference types="cypress" />

var fx = require('../../fixtures/projectConfiguration.json');         //read the configuration of the project

describe('thinking-tester-delete-contact', () => {
  beforeEach(() => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
  })

    it('Delete an existing contact', () => {
      //Login
      cy.get('[id="email"]').type(fx.SignupFirstName)
      cy.get('[id="password"]').type(fx.SignupLastName)
      //cy.get('[id="email"]').type(fx.LoginMail)
      //cy.get('[id="password"]').type(fx.LoginPassword)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click

      cy.ExpectElementContainsInnerText('[class="main-content"]','Contact List') //A function made in 'commands.js'
      cy.get('[id="logout"]').should('exist')
      cy.get('[id="add-contact"]').should('exist')
      cy.get('[class="contacts"]').should('exist')
      cy.get('[class="contactTable"]').should('exist')

      //Check if there are any rows to delete or not
      cy.get('[class="contactTable"]').then($tbody =>
      {
        // const rows = $tbody.find('tr')
        // cy.log(rows.length)
        if($tbody.find('[class="contactTableBodyRow"]').length > 0)
        {
          cy.get('[class="contactTableBodyRow"]').eq(0).click() //Click on the first row, in order to delete it
          cy.wait(1000) //Give time to refresh after a click
    
          //Check that, in 'Contact List' page, contact has been displayed properly
          cy.ExpectElementContainsInnerText('[class="main-content"]','Contact Details')
          cy.ExpectElementHasInnerText('[id="firstName"]',fx.SignupFirstName)
          cy.ExpectElementHasInnerText('[id="lastName"]',fx.SignupLastName)
          //cy.ExpectElementHasInnerText('[id="firstName"]',fx.Contact2FirstName)
          //cy.ExpectElementHasInnerText('[id="lastName"]',fx.Contact2LastName)
          
          cy.get('[id="delete"]').click() //Click on the first row, in order to delete it

          cy.ExpectElementContainsInnerText('[class="main-content"]','Contact List') //Make sure that the site has returned to Contacts List

          cy.get('[class="contactTableBodyRow"]').eq(0).should('exist').and('not.contain', fx.SignupFirstName + ' ' + fx.SignupLastName) //Check that contact has been added, in the form 'First_Name Last_Name'
          //cy.get('[class="contactTableBodyRow"]').eq(0).should('exist').and('not.contain', fx.Contact2FirstName + ' ' + fx.Contact2LastName) //Check that contact has been added, in the form 'First_Name Last_Name'
        }
        else
        {
          cy.log('There is not any contact to delete')
        }
     })
  })
})