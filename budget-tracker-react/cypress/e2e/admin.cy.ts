describe("Admin access", () => {

  it("allows admin to open admin dashboard", () => {

    cy.visit("/login");

    cy.get('input[placeholder="Username"]').type("useradmin");
    cy.get('input[placeholder="Password"]').type("123");
    cy.contains("Sign In").click();

    cy.contains("Admin").click();

    cy.url().should("include", "/admin");
    cy.contains("Admin Dashboard").should("be.visible");
  });

});
