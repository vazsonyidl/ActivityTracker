describe('E2e test cases for Task page - edit functionality', () => {
  beforeEach(() => {
    setUpEditTest();
  });

  it('should edit active task', () => {
    cy.get('[data-testid="task-card"]').first().within(() => {
      cy.get('[data-testid="edit-task-btn"]').click();
    });

    cy.get('[data-testid="manage-task-dialog"]').should('be.visible');
    const descriptionInput = cy.get('[data-testid="task-description-input"]');
    descriptionInput.should('have.value', 'Supertask');
    descriptionInput.clear();

    cy.get('[data-testid="save-task-btn"]').should('be.disabled');
  });
});

function setUpEditTest() {
  interceptGetTask();
  cy.visit('/');
  cy.wait('@getTasksForEdit');
}

export function interceptGetTask() {
  cy.intercept({
    url: '/task',
    method: 'GET',
  }, {
    statusCode: 200,
    fixture: 'task/getTask.mock'
  }).as('getTasksForEdit');
}
