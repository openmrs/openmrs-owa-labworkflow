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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (username = Cypress.env('username'), password = Cypress.env('password')) => {
  cy.visit('/openmrs');

  // const getUserName = $el => $el.find('input#username');

  cy.get('body')
    .find('input#username')
    .clear()
    .type(username)
    .should('have.value', username);

  // const getUserPassword = $el => $el.find('input#password');

  cy.get('body')
    .find('input#password')
    .clear()
    .type(password)
    .should('have.value', password);

  // get the first available location
  cy.get('#sessionLocation').get('li').first().click();


  cy.get('body')
    .find('input#login-button')
    .click();
});

Cypress.Commands.add('logout', () => {
  // ennsure user is logged in before using this command
  cy.get('li.logout')
    .find('a')
    .click();
});
