describe("Login flow", () => {

  it("logs in a normal user and redirects to dashboard", () => {

    cy.visit("http://localhost:5173/login");

    cy.get('input[placeholder="Username"]').type("user");

    cy.get('input[placeholder="Password"]').type("123");

    cy.contains("Sign In").click();

    cy.url().should("include", "/dashboard");

    cy.contains("Dashboard").should("be.visible");
  });

});