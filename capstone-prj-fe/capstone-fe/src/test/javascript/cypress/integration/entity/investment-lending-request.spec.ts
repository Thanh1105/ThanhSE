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

describe('InvestmentLendingRequest e2e test', () => {
  const investmentLendingRequestPageUrl = '/investment-lending-request';
  const investmentLendingRequestPageUrlPattern = new RegExp('/investment-lending-request(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const investmentLendingRequestSample = {};

  let investmentLendingRequest: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/investment-lending-requests+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/investment-lending-requests').as('postEntityRequest');
    cy.intercept('DELETE', '/api/investment-lending-requests/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (investmentLendingRequest) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/investment-lending-requests/${investmentLendingRequest.id}`,
      }).then(() => {
        investmentLendingRequest = undefined;
      });
    }
  });

  it('InvestmentLendingRequests menu should load InvestmentLendingRequests page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('investment-lending-request');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('InvestmentLendingRequest').should('exist');
    cy.url().should('match', investmentLendingRequestPageUrlPattern);
  });

  describe('InvestmentLendingRequest page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(investmentLendingRequestPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create InvestmentLendingRequest page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/investment-lending-request/new$'));
        cy.getEntityCreateUpdateHeading('InvestmentLendingRequest');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', investmentLendingRequestPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/investment-lending-requests',
          body: investmentLendingRequestSample,
        }).then(({ body }) => {
          investmentLendingRequest = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/investment-lending-requests+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [investmentLendingRequest],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(investmentLendingRequestPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details InvestmentLendingRequest page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('investmentLendingRequest');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', investmentLendingRequestPageUrlPattern);
      });

      it('edit button click should load edit InvestmentLendingRequest page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('InvestmentLendingRequest');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', investmentLendingRequestPageUrlPattern);
      });

      it('last delete button click should delete instance of InvestmentLendingRequest', () => {
        cy.intercept('GET', '/api/investment-lending-requests/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('investmentLendingRequest').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', investmentLendingRequestPageUrlPattern);

        investmentLendingRequest = undefined;
      });
    });
  });

  describe('new InvestmentLendingRequest page', () => {
    beforeEach(() => {
      cy.visit(`${investmentLendingRequestPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('InvestmentLendingRequest');
    });

    it('should create an instance of InvestmentLendingRequest', () => {
      cy.get(`[data-cy="status"]`).type('70248').should('have.value', '70248');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        investmentLendingRequest = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', investmentLendingRequestPageUrlPattern);
    });
  });
});
