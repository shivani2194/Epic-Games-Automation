/// <reference types="Cypress" />

describe('Visit Epic Game', function() {

    beforeEach(function() {
        cy.intercept('GET', '/browse').as('visit')
    })

    it('Should Visit Epic Games ', function() {
        cy.visit('/browse')
        cy.wait('@visit').its('response.statusCode').should('equal', 200)
    })
});