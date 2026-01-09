describe("Register flow", () => {

  it("registers a new user and redirects to dashboard", () => {

    cy.visit("http://localhost:5173/register");

    cy.get('input[placeholder="Username"]').type("newuser123");
    cy.get('input[placeholder="Email"]').type("newuser123@mail.com");
    cy.get('input[placeholder="Password"]').type("123456");

    cy.get('[data-cy="register-submit"]').click();


    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard").should("exist");
  });

});
