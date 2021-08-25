describe('User session', () => {

  it('Load login screen', () => {
    cy.visit('http://localhost:8080/');
  });

  it('Is on login screen', () => {
    cy.contains('h2', 'Bienvenido al panel de gestión de semillas');
  });

  it('User login', ()=>{
    cy.get('#login-email').type('admin@gmail.com');
    cy.get('#login-password').type('123456');
    cy.get('#login-enter').click();
  });

  it('Is on dashboard screen', () => {
    cy.contains('h2', 'Dashboard');
  });

  it('User logout', ()=>{
    cy.get('#user-options-dropdown').click();
    cy.get('#logout-button').click();
  });

  it('Is on login screen', () => {
    cy.contains('h2', 'Bienvenido al panel de gestión de semillas');
  });

});
