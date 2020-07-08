describe("LabOrderList Page", () => {

  beforeEach(() => {
    cy.login();
    cy.server()
      // TODO: mocking calls to the system settings doesn't update state, somehow we would have to stub the redux stores with these
      .mockSession()
      .mockSystemSettings()
      .mockPatients()
      .mockOrders()
      .mockEncounters();
  });

  it("should search for a patient by name", () => {
    cy.navigateToLabWorkflow();
    cy.get('[placeholder="Search for patient"]').clear().type("john{enter}");
    cy.get('[data-cy=patient-search] .name').should(names => {
      expect(names).to.have.length(2);
      expect(names.eq(0)).to.contain("JohnBrown");  // no idea why the names are concatenated
      expect(names.eq(1)).to.contain("JohnSmith");
    });
  });

  it("should filter orders by status", () => {
    cy.navigateToLabWorkflow();
    cy.get("[data-cy=order-list] [role=rowgroup]").should("have.length", 4);

    cy.get("#test-status-dropdown").select("Ordered");
    cy.get("[data-cy=order-list] [role=rowgroup]").should("have.length", 2);

    cy.get("#test-status-dropdown").select("Reported");
    cy.get("[data-cy=order-list] [role=rowgroup]").should("have.length", 1);
  });

  it("should filter patients by Test Type", () => {
    cy.navigateToLabWorkflow();
    cy.get("#test-type-dropdown").select("Lipids");
    cy.get("[data-cy=order-list] [role=rowgroup]").should("have.length", 1);
  });

});
