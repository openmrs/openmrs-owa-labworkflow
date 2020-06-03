import { MOCKS } from "../support/constants";

describe("Lab Result Entry Page", () => {
  describe("Navigate", () => {
    beforeEach(() => {
      cy.login();
      cy.server().fetchOrders().fetchEncounters();
    });

    afterEach(() => {
      cy.navigateToHomePage();
    });

    it("should navigate to the lab result entry page when an ordered order is clicked", () => {
      cy.navigateToLabWorkflow();

      cy.get("#test-status-dropdown").select("Ordered");

      cy.get(".rt-tbody").children().first().click();

      // assert that the current location is the result entry page
      cy.location().then((location) => {
        const curentLocation = location.href.split("/").reverse()[0];

        expect(curentLocation).to.eq("LabResultEntry");
      });
    });

    it("should navigate to the lab result entry page when a reported order is clicked", () => {
      cy.navigateToLabWorkflow();

      cy.get("#test-status-dropdown").select("Reported");

      cy.get(".rt-tbody").children().first().click();

      // assert that the current location is the result entry page
      cy.location().then((location) => {
        const curentLocation = location.href.split("/").reverse()[0];

        expect(curentLocation).to.eq("LabResultEntry");
      });
    });

    it("should navigate to the lab result entry page when a taken order is clicked", () => {
      cy.navigateToLabWorkflow();

      cy.get("#test-status-dropdown").select("Taken");

      cy.get(".rt-tbody").children().first().click();

      // assert that the current location is the result entry page
      cy.location().then((location) => {
        const curentLocation = location.href.split("/").reverse()[0];

        expect(curentLocation).to.eq("LabResultEntry");
      });
    });
  });

  describe("Result Entry", () => {
    beforeEach(() => {
      cy.login();
      cy.navigateToHomePage();
      cy.server().fetchOrders().fetchEncounters();

      cy.fetchConcepts();
    });

    afterEach(() => {
      cy.navigateToHomePage();
    });

    it("should enter results for an ordered order", () => {
      cy.navigateToLabWorkflow();
      cy.get("#test-status-dropdown").select("Ordered");

      cy.get(".rt-tbody").children().first().click();

      // assert that the current location is the result entry page
      cy.location().then((location) => {
        const curentLocation = location.href.split("/").reverse()[0];

        expect(curentLocation).to.eq("LabResultEntry");
      });

      // Enter form values

      // Enter value for Specimen Collection Date
      // TODO: would have liked to selectt he current day but querying that has been troublesome
      cy.get(".specimen-collection-date")
        .find(".react-datepicker__input-container")
        .find("svg")
        .click({ force: true });

      cy.get(".react-datepicker-popper")
        .find(".react-datepicker")
        .find(".react-datepicker__month-container")
        .find(".react-datepicker__month")
        .find(".react-datepicker__week")
        .first()
        .find(".react-datepicker__day")
        .first()
        .click({ force: true });

      // click estimated checkbox
      cy.get(".estimated-checkbox").find(".checkbox").click({ force: true });

      // Select test location
      cy.get(".test-location > div > span > select").select("Other", {
        force: true,
      });

      // Select result date field
      cy.get(".obs-date-field")
        .find(".react-datepicker__input-container")
        .find("svg")
        .click({ force: true });

      cy.get(".react-datepicker-popper")
        .find(".react-datepicker")
        .find(".react-datepicker__month-container")
        .find(".react-datepicker__month")
        .find(".react-datepicker__week")
        .first()
        .find(".react-datepicker__day")
        .first()
        .click({ force: true });

      cy.get(".form-group")
        .find(".obs-component")
        .find("div")
        .find("div")
        .first()
        .find("input")
        .type("7");

      // Click Save form
      cy.get(".btn.btn-success").click({ force: true });

      // Assert that loader is visible
      cy.get(".custom-loader").first().should("be.visible");
    });
  });
});
