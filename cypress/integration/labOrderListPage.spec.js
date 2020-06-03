describe("LabOrderList Page", () => {

  beforeEach(() => {
    cy.login();
    cy.server()
      // TODO: mocking calls to the system settings doesn't update state, somehow we would have to stub the redux stores with these
      // .fetchSystemSettiings()
      .fetchOrders()
      .fetchEncounters();
    cy.visit('/openmrs/owa/labworkflow/index.html#/')
  });

  it("should route to this page", () => {
    cy.navigateToLabWorkflow();
  });

  it("should search for a patient by name", () => {
    const patientName = "Test Patient 4";
    cy.get('[placeholder="Search for patient"]').clear().type(patientName);

    cy.get(".rt-tbody")
      .children()
      .should("have.length", 1)
      .get(".rt-td.lab-order-list-cell-name")
      .children()
      .should("have.text", patientName);
  });

  it("should search for a patient by EMR ID", () => {
    const emrID = "Y640L8";
    cy.get('[placeholder="Search for patient"]').clear().type(emrID);

    cy.get(".rt-tbody")
      .children()
      .should("have.length", 1)
      .get(".rt-td.lab-order-list-cell-emr-id")
      .children()
      .should("have.text", emrID);
  });

  it("should filter patients by order status of ordered", () => {
    cy.get('[placeholder="Search for patient"]').clear();
    cy.get("#test-status-dropdown").select("Ordered");
    cy.get(".rt-tbody").children().should("have.length", 2);
  });

  it("should filter patients by order status of reported", () => {
    cy.get('[placeholder="Search for patient"]').clear();
    cy.get("#test-status-dropdown").select("Reported");
    cy.get(".rt-tbody").children().should("have.length", 1);
  });

  it("should filter patients by order status of taken", () => {
    cy.get('[placeholder="Search for patient"]').clear();
    cy.get("#test-status-dropdown").select("Taken");
    cy.get(".rt-tbody").children().should("have.length", 1);
  });

  it("should filter patients by Test Type", () => {
    cy.get('[placeholder="Search for patient"]').clear();
    cy.get("#test-status-dropdown").select("All");
    cy.get("#test-type-dropdown").select("Panel coagulation");
    cy.get(".rt-tbody").children().should("have.length", 1);
  });

  after(() => {
    cy.logout();
  });
});
