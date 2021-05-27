/// <reference types="Cypress" />

describe('Filter Epic Game', function() {

    beforeEach(function() {
        cy.intercept('GET', '/browse').as('visit')
        cy.visit('/browse')
        cy.wait('@visit').its('response.statusCode').should('equal', 200)
    })
    Cypress.env('filterSearchData').forEach((search) => {
        it(search.searchStr + ' filter should be visible', function() {
            cy.get('[data-testid=egs-filter-sidebar]').contains(search.searchStr).click()
            cy.url().should('include', search.assertUrl) // => true
            cy.get('[data-testid=egs-filter-sidebar]').contains(search.searchStr).click()
        })
    })
});