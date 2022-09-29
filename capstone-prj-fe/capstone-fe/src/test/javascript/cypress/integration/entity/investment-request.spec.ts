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

describe('InvestmentRequest e2e test', () => {
  const investmentRequestPageUrl = '/investment-request';
  const investmentRequestPageUrlPattern = new RegExp('/investment-request(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const investmentRequestSample = {};

  let investmentRequest: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/investment-requests+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/investment-requests').as('postEntityRequest');
    cy.intercept('DELETE', '/api/investment-requests/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (investmentRequest) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/investment-requests/${investmentRequest.id}`,
      }).then(() => {
        investmentRequest = undefined;
      });
    }
  });

  it('InvestmentRequests menu should load InvestmentRequests page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('investment-request');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('InvestmentRequest').should('exist');
    cy.url().should('match', investmentRequestPageUrlPattern);
  });

  describe('InvestmentRequest page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(investmentRequestPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create InvestmentRequest page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/investment-request/new$'));
        cy.getEntityCreateUpdateHeading('InvestmentRequest');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', investmentRequestPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/investment-requests',
          body: investmentRequestSample,
        }).then(({ body }) => {
          investmentRequest = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/investment-requests+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [investmentRequest],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(investmentRequestPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details InvestmentRequest page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('investmentRequest');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', investmentRequestPageUrlPattern);
      });

      it('edit button click should load edit InvestmentRequest page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('InvestmentRequest');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', investmentRequestPageUrlPattern);
      });

      it('last delete button click should delete instance of InvestmentRequest', () => {
        cy.intercept('GET', '/api/investment-requests/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('investmentRequest').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', investmentRequestPageUrlPattern);

        investmentRequest = undefined;
      });
    });
  });

  describe('new InvestmentRequest page', () => {
    beforeEach(() => {
      cy.visit(`${investmentRequestPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('InvestmentRequest');
    });

    it('should create an instance of InvestmentRequest', () => {
      cy.get(`[data-cy="amount"]`).type('35267').should('have.value', '35267');

      cy.get(`[data-cy="discount"]`).type('54378').should('have.value', '54378');

      cy.get(`[data-cy="actuallyReceived"]`).type('23268').should('have.value', '23268');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        investmentRequest = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', investmentRequestPageUrlPattern);
    });
  });
});
