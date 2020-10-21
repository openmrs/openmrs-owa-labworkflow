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

import { MOCKS } from "./constants";

Cypress.Commands.add(
  "login",
  (
    username = Cypress.env("username"),
    password = Cypress.env("password"),
  ) => {
    const token = window.btoa(`${username}:${password}`);
    cy.request({
      method: "GET",
      url: "/openmrs/ws/rest/v1/session",
      headers: {
        Authorization: `Basic ${token}`
      },
    });
  }
);

Cypress.Commands.add("logout", () => {
  // ennsure user is logged in before using this command
  cy.get("li.logout").find("a").click();
});

Cypress.Commands.add("mockSession", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "/openmrs/ws/rest/v1/appui/session",
    response: "fixture:session.json",
    status: 200
  });
});

Cypress.Commands.add("mockPatients", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: `/openmrs/ws/rest/v1/patient?q=*`,
    response: "fixture:patients.json",
    status: 200
  })
})

Cypress.Commands.add("mockOrders", () => {
  cy.server();
  cy.fixture('orders').then(orders => {
    console.log(orders);
    cy.route("GET", new RegExp("/openmrs/ws/rest/v1/order.*fulfillerStatus=&.*concepts=&.*"), orders);
    cy.route("GET", new RegExp("/openmrs/ws/rest/v1/order.*fulfillerStatus=RECEIVED&.*"), {
      results: orders.results.filter(o => o.fulfillerStatus == null)
    });
    cy.route("GET", new RegExp("/openmrs/ws/rest/v1/order.*fulfillerStatus=COMPLETED&.*"), {
      results: orders.results.filter(o => o.fulfillerStatus == "COMPLETED")
    });
    cy.route("GET", new RegExp(`/openmrs/ws/rest/v1/order.*concepts=3cd692c8-26fe-102b-80cb-0017a47871b2.*`), {
      results: orders.results.filter(o => o.concept.uuid == "3cd692c8-26fe-102b-80cb-0017a47871b2")
    });
  })
  
});

Cypress.Commands.add("mockEncounters", () => {
  cy.server();
  MOCKS.ENCOUNTERS.forEach((mock) => {
    cy.route({
      method: "GET",
      url: mock.URL,
      response: mock.RESPONSE,
      status: 200,
    });
  });
});

Cypress.Commands.add("mockConcepts", () => {
  cy.server();
  MOCKS.CONCEPTS.forEach((mock) => {
    cy.route({
      method: "GET",
      url: mock.URL,
      response: mock.RESPONSE,
      status: 200,
    });
  });
});

Cypress.Commands.add("mockSystemSettings", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.dateAndTimeFormat.URL,
    response: MOCKS.SYSTEM_SETTIINGS.dateAndTimeFormat.RESPONSE,
    status: 200,
  });
  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.labResultsEntryEncounterType.URL,
    response: MOCKS.SYSTEM_SETTIINGS.labResultsEntryEncounterType.RESPONSE,
    status: 200,
  });

  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.didNotPerformQuestion.URL,
    response: MOCKS.SYSTEM_SETTIINGS.didNotPerformQuestion.RESPONSE,
    status: 200,
  });
  // TODO: nneed to figure out why Uncommenting this makes the fetchOrders request fails
  // cy.route({
  //   method: 'GET',
  //   url: MOCKS.SYSTEM_SETTIINGS.testOrderType.URL,
  //   response: MOCKS.SYSTEM_SETTIINGS.testOrderType.RESPONSE,
  //   status: 200,
  // });

  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.didNotPerformAnswer.URL,
    response: MOCKS.SYSTEM_SETTIINGS.didNotPerformAnswer.RESPONSE,
    status: 200,
  });
  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.testOrderNumberConcept.URL,
    response: MOCKS.SYSTEM_SETTIINGS.testOrderNumberConcept.RESPONSE,
    status: 200,
  });
  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.locationOfLaboratory.URL,
    response: MOCKS.SYSTEM_SETTIINGS.locationOfLaboratory.RESPONSE,
    status: 200,
  });
  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.estimatedCollectionDateQuestion.URL,
    response: MOCKS.SYSTEM_SETTIINGS.estimatedCollectionDateQuestion.RESPONSE,
    status: 200,
  });

  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.estimatedCollectionDateAnswer.URL,
    response: MOCKS.SYSTEM_SETTIINGS.estimatedCollectionDateAnswer.RESPONSE,
    status: 200,
  });

  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.didNotPerformReason.URL,
    response: MOCKS.SYSTEM_SETTIINGS.didNotPerformReason.RESPONSE,
    status: 200,
  });

  cy.route({
    method: "GET",
    url: MOCKS.SYSTEM_SETTIINGS.labResultsDateConcept.URL,
    response: MOCKS.SYSTEM_SETTIINGS.labResultsDateConcept.RESPONSE,
    status: 200,
  });
});

Cypress.Commands.add("navigateToLabWorkflow", () => {
  cy.visit("/openmrs/owa/labworkflow/index.html#/");
});
