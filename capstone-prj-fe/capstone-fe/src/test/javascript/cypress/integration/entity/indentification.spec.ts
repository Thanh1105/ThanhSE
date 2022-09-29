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

describe('Indentification e2e test', () => {
  const indentificationPageUrl = '/indentification';
  const indentificationPageUrlPattern = new RegExp('/indentification(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const indentificationSample = {};

  let indentification: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/indentifications+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/indentifications').as('postEntityRequest');
    cy.intercept('DELETE', '/api/indentifications/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (indentification) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/indentifications/${indentification.id}`,
      }).then(() => {
        indentification = undefined;
      });
    }
  });

  it('Indentifications menu should load Indentifications page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('indentification');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Indentification').should('exist');
    cy.url().should('match', indentificationPageUrlPattern);
  });

  describe('Indentification page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(indentificationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Indentification page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/indentification/new$'));
        cy.getEntityCreateUpdateHeading('Indentification');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', indentificationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/indentifications',
          body: indentificationSample,
        }).then(({ body }) => {
          indentification = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/indentifications+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [indentification],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(indentificationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Indentification page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('indentification');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', indentificationPageUrlPattern);
      });

      it('edit button click should load edit Indentification page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Indentification');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', indentificationPageUrlPattern);
      });

      it('last delete button click should delete instance of Indentification', () => {
        cy.intercept('GET', '/api/indentifications/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('indentification').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', indentificationPageUrlPattern);

        indentification = undefined;
      });
    });
  });

  describe('new Indentification page', () => {
    beforeEach(() => {
      cy.visit(`${indentificationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Indentification');
    });

    it('should create an instance of Indentification', () => {
      cy.get(`[data-cy="indentifyCard1"]`)
        .type('Director Re-contextualized Colon')
        .should('have.value', 'Director Re-contextualized Colon');

      cy.get(`[data-cy="indentifyCard2"]`).type('monetize Berkshire').should('have.value', 'monetize Berkshire');

      cy.get(`[data-cy="drivingLicense1"]`).type('auxiliary').should('have.value', 'auxiliary');

      cy.get(`[data-cy="drivingLicense2"]`).type('deliver hack').should('have.value', 'deliver hack');

      cy.get(`[data-cy="status"]`).type('50923').should('have.value', '50923');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        indentification = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', indentificationPageUrlPattern);
    });
  });
});
