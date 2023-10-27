describe('The application', () => {

  it('Should display the Load Posts Button', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Load Posts').should('be.visible');
  });


  it('Should execute a GET request to the API', () => {
    cy.visit('http://localhost:3000/');

    cy.intercept('GET', 'https://my-json-server.typicode.com/typicode/demo/posts').as('getPosts');

    cy.get('button').contains('Load Posts').click();

    cy.contains('Loading posts...').should('be.visible');
    cy.get('button').contains('Load Posts').should('be.disabled');

    cy.wait('@getPosts').then((interception) => {
      expect(interception.request.method).to.equal('GET');
    });
  });

  it('Should display a specific error message on failed API request', () => {
    cy.visit('http://localhost:3000/');

    cy.intercept('GET', 'https://my-json-server.typicode.com/typicode/demo/posts', {
      statusCode: 500, 
      body: { error: 'Failed to fetch data' }
    }).as('getPosts');

    cy.get('button').contains('Load Posts').click();

    cy.contains('The posts could not be loaded').should('be.visible');
  });
});
