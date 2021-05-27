describe('Visit Epic Game', function() {

    beforeEach(function() {
        cy.intercept('GET', '/browse').as('visit')
        cy.intercept('GET', '/p').as('gameVisit')
        cy.visit('/browse')
        cy.wait('@visit').its('response.statusCode').should('equal', 200)
    })

    Cypress.env('gameTitles').forEach((e) => {
        it(`Home page : ${e.game} should function correctly `, () => {
            cy.get("[data-testid=search-bar]").type(e.game)
            cy.wait(5000)
            cy.get('a.css-1a48279-DiscoverCardLayout__link').contains(e.game).click()
            cy.url().should('include', e.href)
            cy.wait('@gameVisit')
            cy.get('.css-12usrln-PDPTitleHeader__headline1 > span').contains(e.game)
        })
    })

    // it('Select each game title and check if goes to its URL', function() {
    //     cy.get('ul.css-1xe22b2-BrowseGrid-styles__cardsContainer').children()
    // });
})