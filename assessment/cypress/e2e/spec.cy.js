describe("Student Entry Form", () => {
  const url = "http://localhost:5173";

  beforeEach(() => {
    cy.visit(url);
  });

  it("1) shows main title and subtitle", () => {
    cy.contains("Student Entry Form").should("be.visible");
    cy.contains("Add students and review the list below.").should("be.visible");
  });

  it("2) shows all form fields, placeholders, buttons, and empty state", () => {
    cy.contains("Name").should("be.visible");
    cy.contains("Age").should("be.visible");
    cy.contains("Grade").should("be.visible");

    cy.get('input[name="name"]').should("have.attr", "placeholder", "e.g. MS Dhoni");
    cy.get('input[name="age"]').should("have.attr", "placeholder", "e.g. 14");
    cy.get('select[name="grade"]').find('option[value=""]').should("contain.text", "Select grade");

    cy.contains("Add Student").should("be.visible").and("not.be.disabled");
    cy.contains("Clear").should("be.visible");

    cy.contains("No students added yet.").should("be.visible");
  });

  it("3) allows entering name, age, grade and submitting", () => {
    cy.get('input[name="name"]').type("Virat Kohli");
    cy.get('input[name="age"]').type("16");
    cy.get('select[name="grade"]').select("8");
    cy.contains("button", "Add Student").click();

    cy.contains("Virat Kohli").should("be.visible");
    cy.contains("Remove").should("be.visible");
  });

  it("4) submitted data appears with remove button", () => {
    cy.get('input[name="name"]').clear().type("Ananya Sharma");
    cy.get('input[name="age"]').clear().type("14");
    cy.get('select[name="grade"]').select("5");
    cy.contains("button", "Add Student").click();

    cy.contains("Ananya Sharma").should("exist");
    cy.contains("14").should("exist");
    cy.contains("Class 5").should("exist");
    cy.contains("Remove").should("be.visible");

    cy.contains("Remove").click();
    cy.contains("No students added yet.").should("be.visible");
  });
});
