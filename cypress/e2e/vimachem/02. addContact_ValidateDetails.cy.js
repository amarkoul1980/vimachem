/// <reference types="cypress" />

var fx = require('../../fixtures/projectConfiguration.json');         //read the configuration of the project

describe('thinking-tester-signup-add-contact', () => {
  beforeEach(() => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
  })

    it('SignUp with a new user', () => {
      //Click on 'Signup' button and check that 'Add User' page has opened
      cy.get('[id="signup"]').click()
      cy.wait(1000) //Give time to refresh after a click

      //Check that all elements of 'Signup' page are present
      cy.ExpectElementContainsInnerText('[class="main-content"]','Add User')
      cy.get('[id="firstName"]').should('have.value', '')
      cy.get('[id="lastName"]').should('have.value', '')
      cy.get('[id="email"]').should('have.value', '')
      cy.get('[id="password"]').should('have.value', '')
      cy.get('[id="submit"]').should('exist')
      cy.get('[id="cancel"]').should('exist')

      //Fill in the blanks
      cy.get('[id="firstName"]').type(fx.SignupFirstName)
      cy.get('[id="lastName"]').type(fx.SignupLastName)
      cy.get('[id="email"]').type(fx.SignupMail)
      cy.get('[id="password"]').type(fx.SignupPassword)

      //Click 'Submit', and check that 'Contact List' page has been opened
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click

      cy.ExpectElementContainsInnerText('[class="main-content"]','Contact List') //A function made in 'commands.js'
      cy.get('[id="logout"]').should('exist')
      cy.get('[id="add-contact"]').should('exist')
      cy.get('[class="contacts"]').should('exist')
      cy.get('[class="contactTable"]').should('exist')
    })

    it.only('Add a New Contact - Primary Checks, Add contacts', () => {

      //cy.get('[id="email"]').type(fx.LoginMail)
      //cy.get('[id="password"]').type(fx.LoginPassword)
      cy.get('[id="email"]').type(fx.SignupFirstName) // The data of the previously signed up user
      cy.get('[id="password"]').type(fx.SignupLastName) // The data of the previously signed up user
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="add-contact"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('not.be.visible')

      //1. Check that contact validation fails when First Name and/or Last Name are not filled
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //1.1 Both fields are empty
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.')
      
      //1.2 First Name has value, Last Name is empty
      cy.get('[id="firstName"]').type(fx.Contact1FirstName)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','Contact validation failed: lastName: Path `lastName` is required.')

      //1.3 First Name is empty, Last Name has value
      cy.get('[id="firstName"]').clear()
      cy.get('[id="lastName"]').type(fx.Contact1LastName)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','Contact validation failed: firstName: Path `firstName` is required.')

      //2. Add contact with only First and Last Name, and validate on contact list and contact details
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.get('[id="lastName"]').clear()
      cy.get('[id="firstName"]').type(fx.Contact1FirstName)
      cy.get('[id="lastName"]').type(fx.Contact1LastName)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click

      //Check that, in 'Contact List' page, contact has been displayed properly
      cy.ExpectElementContainsInnerText('[class="main-content"]','Contact List')
      cy.get('[id="logout"]').should('exist')
      cy.get('[id="add-contact"]').should('exist')
      cy.get('[class="contacts"]').should('exist')
      cy.get('[class="contactTable"]').should('exist')

      cy.get('[class="contactTableBodyRow"]').eq(0).should('exist').and('contain', fx.Contact1FirstName + ' ' + fx.Contact1LastName) //Check that contact has been added, in the form 'First_Name Last_Name'
      cy.get('[class="contactTableBodyRow"]').eq(0).click() //Click on the row
      cy.wait(1000) //Give time to refresh after a click

      //Check that, in 'Contact List' page, contact has been displayed properly
      cy.ExpectElementContainsInnerText('[class="main-content"]','Contact Details')
      cy.ExpectElementHasInnerText('[id="firstName"]',fx.Contact1FirstName)
      cy.ExpectElementHasInnerText('[id="lastName"]',fx.Contact1LastName)
      //Return to 'Contact List'
      cy.get('[id="return"]').click()

      //3. Add contact with all values
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.get('[id="add-contact"]').click()
      cy.get('[id="firstName"]').type(fx.Contact2FirstName)
      cy.get('[id="lastName"]').type(fx.Contact2LastName)
      cy.get('[id="birthdate"]').type(fx.Contact2DateOfBirth)
      cy.get('[id="email"]').type(fx.Contact2Email)
      cy.get('[id="phone"]').type(fx.Contact2Phone)
      cy.get('[id="street1"]').type(fx.Contact2Address1)
      cy.get('[id="street2"]').type(fx.Contact2Address2)
      cy.get('[id="city"]').type(fx.Contact2City)
      cy.get('[id="stateProvince"]').type(fx.Contact2StateProvince)
      cy.get('[id="postalCode"]').type(fx.Contact2PostalCode)
      cy.get('[id="country"]').type(fx.Contact2Country)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click

      //Check that, in 'Contact List' page, contact has been displayed properly
      cy.ExpectElementContainsInnerText('[class="main-content"]','Contact List')
      cy.get('[id="logout"]').should('exist')
      cy.get('[id="add-contact"]').should('exist')
      cy.get('[class="contacts"]').should('exist')
      cy.get('[class="contactTable"]').should('exist')

      cy.get('[class="contactTableBodyRow"]').eq(0).should('exist').and('contain', fx.Contact2FirstName + ' ' + fx.Contact2LastName) //Check that contact has been added, in the form 'First_Name Last_Name'
      cy.get('[class="contactTableBodyRow"]').eq(0).click() //Click on the row
      cy.wait(1000) //Give time to refresh after a click

      //Check that, in 'Contact List' page, contact has been displayed properly
      cy.ExpectElementContainsInnerText('[class="main-content"]','Contact Details')
      cy.ExpectElementHasInnerText('[id="firstName"]',fx.Contact2FirstName)
      cy.ExpectElementHasInnerText('[id="lastName"]',fx.Contact2LastName)
      cy.ExpectElementHasInnerText('[id="birthdate"]',fx.Contact2DateOfBirth)
      cy.ExpectElementHasInnerText('[id="email"]',fx.Contact2Email)
      cy.ExpectElementHasInnerText('[id="phone"]',fx.Contact2Phone)
      cy.ExpectElementHasInnerText('[id="street1"]',fx.Contact2Address1)
      cy.ExpectElementHasInnerText('[id="street2"]',fx.Contact2Address2)
      cy.ExpectElementHasInnerText('[id="city"]',fx.Contact2City)
      cy.ExpectElementHasInnerText('[id="stateProvince"]',fx.Contact2StateProvince)
      cy.ExpectElementHasInnerText('[id="postalCode"]',fx.Contact2PostalCode)
      cy.ExpectElementHasInnerText('[id="country"]',fx.Contact2Country)
  })
})
