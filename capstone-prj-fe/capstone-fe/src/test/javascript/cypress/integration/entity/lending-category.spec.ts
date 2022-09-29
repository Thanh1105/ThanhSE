import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('LendingCategory e2e test', () => {
  const lendingCategoryPageUrl = '/lending-category';
  const lendingCategoryPageUrlPattern = new RegExp('/lending-category(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const lendingCategorySample = {};

  let lendingCategory: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/lending-categories+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/lending-categories').as('postEntityRequest');
    cy.intercept('DELETE', '/api/lending-categories/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (lendingCategory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/lending-categories/${lendingCategory.id}`,
      }).then(() => {
        lendingCategory = undefined;
      });
    }
  });

  it('LendingCategories menu should load LendingCategories page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('lending-category');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('LendingCategory').should('exist');
    cy.url().should('match', lendingCategoryPageUrlPattern);
  });

  describe('LendingCategory page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(lendingCategoryPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create LendingCategory page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/lending-category/new$'));
        cy.getEntityCreateUpdateHeading('LendingCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lendingCategoryPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/lending-categories',
          body: lendingCategorySample,
        }).then(({ body }) => {
          lendingCategory = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/lending-categories+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [lendingCategory],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(lendingCategoryPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details LendingCategory page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('lendingCategory');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lendingCategoryPageUrlPattern);
      });

      it('edit button click should load edit LendingCategory page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LendingCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lendingCategoryPageUrlPattern);
      });

      it('last delete button click should delete instance of LendingCategory', () => {
        cy.intercept('GET', '/api/lending-categories/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('lendingCategory').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lendingCategoryPageUrlPattern);

        lendingCategory = undefined;
      });
    });
  });

  describe('new LendingCategory page', () => {
    beforeEach(() => {
      cy.visit(`${lendingCategoryPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('LendingCategory');
    });

    it('should create an instance of LendingCategory', () => {
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        lendingCategory = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', lendingCategoryPageUrlPattern);
    });
  });
});
