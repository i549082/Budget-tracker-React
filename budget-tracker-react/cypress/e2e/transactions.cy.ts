describe("Transactions", () => {

  beforeEach(() => {

    cy.visit("/login");

    cy.get('input[placeholder="Username"]').type("user");
    cy.get('input[placeholder="Password"]').type("123");
    cy.contains("Sign In").click();

    cy.url().should("include", "/dashboard");
  });

  it("adds a new transaction", () => {

    cy.contains("Transactions").click();

    cy.get("select").first().select("BANK");

    cy.get("select").eq(1).select("INCOME");

    cy.get('input[type="number"]').type("100");

    cy.get("textarea").type("Salary");

    cy.contains("Add Transaction").click();

    cy.contains("Transaction added successfully").should("be.visible");
  });

});
