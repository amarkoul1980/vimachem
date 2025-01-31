/// <reference types="cypress" />

var fx = require('../../fixtures/projectConfiguration.json');         //read the configuration of the project

describe('thinking-tester-contact-list', () => {
  beforeEach(() => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
  })

    it('Check for Initial Content', () => {
      cy.get('[class="welcome-message"]').eq(0).should('contain', 'Welcome! This application is for testing purposes only.')
      cy.get('[class="welcome-message"]').eq(1).should('contain', 'The API documentation')
      cy.get('[id="error"]').should('exist').and('not.be.visible')
      cy.get('[id="email"]').should('have.value', '')
      cy.get('[id="password"]').should('have.value', '')
      cy.get('[id="submit"]').should('exist')
      cy.get('[id="signup"]').should('exist')
    })

    it('Login with a non-existing user', () => {

      //1. Click 'Submit' without entering any value
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','Incorrect username or password') //A function made in 'commands.js'

      //2. Insert invalid email
      cy.get('[id="email"]').type(fx.InvalidEmail)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','Incorrect username or password')

      //3. Insert password and click 'Submit' without entering email
      cy.get('[id="password"]').type(fx.FakePassword)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','Incorrect username or password')

      //4. Insert wrong-nonexisting credentials
      cy.get('[id="email"]').type(fx.FakeEmail)
      cy.get('[id="password"]').type(fx.FakePassword)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','Incorrect username or password')
    })

    it('Login with an existing user', () => {
      cy.get('[id="email"]').type(fx.LoginMail)
      cy.get('[id="password"]').type(fx.LoginPassword)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click

      cy.ExpectElementContainsInnerText('[class="main-content"]','Contact List') //A function made in 'commands.js'
      cy.get('[id="logout"]').should('exist')
      cy.get('[id="add-contact"]').should('exist')
      cy.get('[class="contacts"]').should('exist')
      cy.get('[class="contactTable"]').should('exist')
    })

    it('Signup', () => {
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

      //Click 'Submit' without entering any value
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.') 

      //Insert some, but not all of them, data
      cy.get('[id="firstName"]').type(fx.SignupFirstName)
      cy.get('[id="lastName"]').type(fx.SignupLastName)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.ExpectElementHasInnerText('[id="error"]','User validation failed: email: Email is invalid, password: Path `password` is required.') 

      //Click on 'Cancel' button and check that 'Home' page has opened

      cy.get('[id="cancel"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[class="welcome-message"]').eq(0).should('contain', 'Welcome! This application is for testing purposes only.')
      cy.get('[class="welcome-message"]').eq(1).should('contain', 'The API documentation')
      cy.get('[id="error"]').should('exist').and('not.be.visible')
      cy.get('[id="email"]').should('have.value', '')
      cy.get('[id="password"]').should('have.value', '')
      cy.get('[id="submit"]').should('exist')
      cy.get('[id="signup"]').should('exist')
    })

})
