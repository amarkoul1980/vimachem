// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Verifies the InnerText of an Element is equal to an expected value
Cypress.Commands.add("ExpectElementHasInnerText", (elementSelector, expectedValue) =>
    {
        cy.get(elementSelector).then(($elementAttribute) =>
        {
            expect(expectedValue).to.equal($elementAttribute[0].innerText)
        })
    })

Cypress.Commands.add("ExpectElementContainsInnerText", (elementSelector, expectedValue) =>
    {
        cy.get(elementSelector).then(($elementAttribute) => {            
            expect($elementAttribute[0].innerText).to.contain(expectedValue)
        })
     })