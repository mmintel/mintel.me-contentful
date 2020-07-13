describe('Pages', () => {
  const pages = require('../fixtures/pages.json');

  pages.items.forEach(page => {
    describe(page.fields.title, {
      waitForAnimations: false
    }, () => {
      before(() => {
        cy.log('Testing page', JSON.stringify(page))
        cy.visit(page.fields.slug === 'home' ? '/' : `${page.fields.slug}`)
      })

      it('should have correct title', () => {
        cy.title().should('eq', page.fields.title)
      })

      it('should have valid html', () => {
        cy.htmlvalidate()
      })
    })
  })
})