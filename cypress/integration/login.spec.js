describe("Login", () => {
  it("should login and logout successfully", () => {
    cy.login();

    // assert that user display name is shown on nav bar
    cy.get("li.identifier")
      .first()
      .then(($el) => {
        const diplayText = $el[0].innerText.trim();
        expect(diplayText).to.equal(Cypress.env("username"));
      });

    // assert that we are at the home page
    cy.location().then((location) => {
      const currentLocation = location.pathname.split("/").reverse()[0];
      expect(currentLocation).to.equal("home.page");
    });

    cy.logout();

    // assert that we are back at the login page
    cy.location().then((location) => {
      const currentLocation = location.pathname.split("/").reverse()[0];
      console.log("currentLocation", currentLocation);
      expect(currentLocation).to.equal("login.htm");
    });
  });
});
