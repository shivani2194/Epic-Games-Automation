describe('Search bar Epic Game', function() {

    beforeEach(function() {
        cy.intercept('GET', '/browse').as('visit')
        cy.visit('/browse')
        cy.wait('@visit').its('response.statusCode').should('equal', 200)
    })

    it('Should be visible ', function() {
        cy.get('[data-testid=search-bar]')
    });

    it('should have a placeholder and search icon ', function() {
        cy.get('[data-testid=search-bar]').should('have.attr', 'placeholder', 'Search')
        cy.get('.css-hd88k9-Icon__wrapper-SearchBar-styles__searchIconOpen')
    });

    it('Clear should be disabled when there is no search input', function() {
        cy.get('.css-o2vcjz-SearchBar-styles__invisible').should('have.attr', 'aria-label', 'Clear Search').should('have.attr', 'aria-hidden', 'true')
    });

    it('Clear should be enabled when there is a search input', function() {
        cy.get('[data-testid=search-bar]').type('roc')
        cy.get('.css-682sma').should('have.attr', 'aria-label', 'Clear Search').should('have.attr', 'aria-hidden', 'false')
    });

    it('Auto search', function() {
        Cypress.env("gameSearchData").forEach(search => {
            cy.get("[data-testid=search-bar]").type(search.searchStr.slice(0, 3))
            cy.wait(1000)
            cy.get("div.css-zgal9t-DiscoverCardLayout__component").within(() => {
                cy.get("a").should($a => {
                    const href = $a.map((_i, el) => {
                        return Cypress.$(el).attr("href")
                    });
                    expect((href.get()).includes(search.assertUrl)).to.be.true
                });
            });
            cy.get('.css-682sma').should('have.attr', 'aria-label', 'Clear Search').should('have.attr', 'aria-hidden', 'false').click()
        });
    });
})