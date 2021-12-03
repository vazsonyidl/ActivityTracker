describe('E2E test cases for Task Page - basic GET', () => {
  beforeEach(() => {
    setUpGetTests()
  });

  it('should display basic items', () => {
    cy.get('[data-testid="task-card"]').should('have.length', 2);
  });

  it('should show task description', () => {
    cy.get('[data-testid="task-card"]').first().should('contain.text', 'Supertask');
  });
});

function setUpGetTests() {
  interceptGetTask();
  cy.visit('/');
  cy.wait('@getTasks');
}

export function interceptGetTask() {
  cy.intercept({
    url: '/task',
    method: 'GET',
  }, {
    statusCode: 200,
    fixture: 'task/getTask.mock'
  }).as('getTasks');
}


