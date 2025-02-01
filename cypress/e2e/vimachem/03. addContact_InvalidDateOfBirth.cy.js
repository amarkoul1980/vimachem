/// <reference types="cypress" />

var fx = require('../../fixtures/projectConfiguration.json');         //read the configuration of the project

describe('thinking-tester-signup-invalid-date', () => {
  beforeEach(() => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
  })

    it('Add Contact and check for date', () => {

      // cy.get('[id="email"]').type(fx.LoginMail)
      // cy.get('[id="password"]').type(fx.LoginPassword)
      cy.get('[id="email"]').type(fx.SignupMail)
      cy.get('[id="password"]').type(fx.SignupPassword)
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="add-contact"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('not.be.visible')

      //1. Date format different than yyyy-MM-dd
      //NOTE: yyyy-dd-MM is not always wrong (for example, we can type 1980-08-03 or 1980-03-08 - these are different, but valid dates. In this case, no error message will be displayed)
      //NOTE: yyyy/MM/dd is not considered as a wrong format (i.e. replacing '-' with '/')
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.log("1. Date format different than yyyy-MM-dd")

      cy.get('[id="birthdate"]').type(fx.InvalidDate1) //1980-08-03
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('not.contain', 'birthdate: Birthdate is invalid')

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate2) //1980-03-08
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('not.contain', 'birthdate: Birthdate is invalid')

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate3) //08-03-1980
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate4) //08/03/1980
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate5) //1980/03/08
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('not.contain', 'birthdate: Birthdate is invalid')

      //2. Month greater than 12
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.log("2. Month greater than 12")

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate6) //1980-13-03
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

      //3. Month equal to 1, 3, 5, 7, 8, 10 or 12, and date greater than 31
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.log("3. Month equal to 1, 3, 5, 7, 8, 10 or 12, and date greater than 31")

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate7) //1980-01-32
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

      //4. Month equal to 4, 6, 9, 11 and date greater than 30
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.log("4. Month equal to 4, 6, 9, 11 and date greater than 30")

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate8) //1980-04-31
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

      //5. Month equal to 2, a leap year (e.g. 2024 or 2020) and date greater than 29
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.log("5. Month equal to 2, a leap year (e.g. 2024 or 2020) and date greater than 29")

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate9) //1980-02-30
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

      //6. Month equal to 2, not a leap year (e.g. 2025 or 2023) and date greater than 28
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.log("6. Month equal to 2, not a leap year (e.g. 2025 or 2023) and date greater than 28")

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate10) //1981-02-29
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

      //7. Date containing chars or not complete date
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      cy.log("7. Date containing chars or not complete date")

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate11) //1980a-03b-08c
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

      cy.get('[id="birthdate"]').clear()
      cy.get('[id="birthdate"]').type(fx.InvalidDate12) //1980-03
      cy.get('[id="submit"]').click()
      cy.wait(1000) //Give time to refresh after a click
      cy.get('[id="error"]').should('exist').and('contain', 'birthdate: Birthdate is invalid')

})





  // it('displays two todo items by default', () => {
  //   // We use the `cy.get()` command to get all elements that match the selector.
  //   // Then, we use `should` to assert that there are two matched items,
  //   // which are the two default items.
  //   cy.get('.todo-list li').should('have.length', 2)

  //   // We can go even further and check that the default todos each contain
  //   // the correct text. We use the `first` and `last` functions
  //   // to get just the first and last matched elements individually,
  //   // and then perform an assertion with `should`.
  //   cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
  //   cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  // })

  // it('can add new todo items', () => {
  //   // We'll store our item text in a variable so we can reuse it
  //   const newItem = 'Feed the cat'

  //   // Let's get the input element and use the `type` command to
  //   // input our new list item. After typing the content of our item,
  //   // we need to type the enter key as well in order to submit the input.
  //   // This input has a data-test attribute so we'll use that to select the
  //   // element in accordance with best practices:
  //   // https://on.cypress.io/selecting-elements
  //   cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

  //   // Now that we've typed our new item, let's check that it actually was added to the list.
  //   // Since it's the newest item, it should exist as the last element in the list.
  //   // In addition, with the two default items, we should have a total of 3 elements in the list.
  //   // Since assertions yield the element that was asserted on,
  //   // we can chain both of these assertions together into a single statement.
  //   cy.get('.todo-list li')
  //     .should('have.length', 3)
  //     .last()
  //     .should('have.text', newItem)
  // })

  // it('can check off an item as completed', () => {
  //   // In addition to using the `get` command to get an element by selector,
  //   // we can also use the `contains` command to get an element by its contents.
  //   // However, this will yield the <label>, which is lowest-level element that contains the text.
  //   // In order to check the item, we'll find the <input> element for this <label>
  //   // by traversing up the dom to the parent element. From there, we can `find`
  //   // the child checkbox <input> element and use the `check` command to check it.
  //   cy.contains('Pay electric bill')
  //     .parent()
  //     .find('input[type=checkbox]')
  //     .check()

  //   // Now that we've checked the button, we can go ahead and make sure
  //   // that the list element is now marked as completed.
  //   // Again we'll use `contains` to find the <label> element and then use the `parents` command
  //   // to traverse multiple levels up the dom until we find the corresponding <li> element.
  //   // Once we get that element, we can assert that it has the completed class.
  //   cy.contains('Pay electric bill')
  //     .parents('li')
  //     .should('have.class', 'completed')
  // })

  // context('with a checked task', () => {
  //   beforeEach(() => {
  //     // We'll take the command we used above to check off an element
  //     // Since we want to perform multiple tests that start with checking
  //     // one element, we put it in the beforeEach hook
  //     // so that it runs at the start of every test.
  //     cy.contains('Pay electric bill')
  //       .parent()
  //       .find('input[type=checkbox]')
  //       .check()
  //   })

  //   it('can filter for uncompleted tasks', () => {
  //     // We'll click on the "active" button in order to
  //     // display only incomplete items
  //     cy.contains('Active').click()

  //     // After filtering, we can assert that there is only the one
  //     // incomplete item in the list.
  //     cy.get('.todo-list li')
  //       .should('have.length', 1)
  //       .first()
  //       .should('have.text', 'Walk the dog')

  //     // For good measure, let's also assert that the task we checked off
  //     // does not exist on the page.
  //     cy.contains('Pay electric bill').should('not.exist')
  //   })

  //   it('can filter for completed tasks', () => {
  //     // We can perform similar steps as the test above to ensure
  //     // that only completed tasks are shown
  //     cy.contains('Completed').click()

  //     cy.get('.todo-list li')
  //       .should('have.length', 1)
  //       .first()
  //       .should('have.text', 'Pay electric bill')

  //     cy.contains('Walk the dog').should('not.exist')
  //   })

  //   it('can delete all completed tasks', () => {
  //     // First, let's click the "Clear completed" button
  //     // `contains` is actually serving two purposes here.
  //     // First, it's ensuring that the button exists within the dom.
  //     // This button only appears when at least one task is checked
  //     // so this command is implicitly verifying that it does exist.
  //     // Second, it selects the button so we can click it.
  //     cy.contains('Clear completed').click()

  //     // Then we can make sure that there is only one element
  //     // in the list and our element does not exist
  //     cy.get('.todo-list li')
  //       .should('have.length', 1)
  //       .should('not.have.text', 'Pay electric bill')

  //     // Finally, make sure that the clear button no longer exists.
  //     cy.contains('Clear completed').should('not.exist')
  //   })
  // })

})
