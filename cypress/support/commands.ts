Cypress.Commands.add('getBySel', (selector, options) => {
  return cy.get(`[data-test=${selector}]`, options);
});

export {};
