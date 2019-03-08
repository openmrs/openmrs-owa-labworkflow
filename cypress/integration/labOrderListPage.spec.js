describe('LabOrderList Page', () => {
  beforeEach(()  => {
    cy.login();
  });
  it('should route to this page', () => {
    cy.navigateToLabWorkflow();
    cy.wait(5000);
  });
  it('should search for a patient by name', () => {

  });
  it('should search for a patient by EMR ID', () => {

  });
  it('should filter patients by order status of ordered', () => {

  });
  it('should filter patients by order status of reported', () => {

  });
  it('should filter patients by order status of taken', () => {

  });
  it('should filter patients by Test Type', () => {

  });
  it('should navigate to the lab result entry page when an order is clicked', () => {

  });
})