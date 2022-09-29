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

describe('AccountHistory e2e test', () => {
  const accountHistoryPageUrl = '/account-history';
  const accountHistoryPageUrlPattern = new RegExp('/account-history(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const accountHistorySample = {};

  let accountHistory: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/account-histories+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/account-histories').as('postEntityRequest');
    cy.intercept('DELETE', '/api/account-histories/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (accountHistory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/account-histories/${accountHistory.id}`,
      }).then(() => {
        accountHistory = undefined;
      });
    }
  });

  it('AccountHistories menu should load AccountHistories page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('account-history');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AccountHistory').should('exist');
    cy.url().should('match', accountHistoryPageUrlPattern);
  });

  describe('AccountHistory page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(accountHistoryPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AccountHistory page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/account-history/new$'));
        cy.getEntityCreateUpdateHeading('AccountHistory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', accountHistoryPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/account-histories',
          body: accountHistorySample,
        }).then(({ body }) => {
          accountHistory = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/account-histories+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [accountHistory],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(accountHistoryPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details AccountHistory page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('accountHistory');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', accountHistoryPageUrlPattern);
      });

      it('edit button click should load edit AccountHistory page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AccountHistory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', accountHistoryPageUrlPattern);
      });

      it('last delete button click should delete instance of AccountHistory', () => {
        cy.intercept('GET', '/api/account-histories/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('accountHistory').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', accountHistoryPageUrlPattern);

        accountHistory = undefined;
      });
    });
  });

  describe('new AccountHistory page', () => {
    beforeEach(() => {
      cy.visit(`${accountHistoryPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('AccountHistory');
    });

    it('should create an instance of AccountHistory', () => {
      cy.get(`[data-cy="transactionName"]`).type('Uzbekistan').should('have.value', 'Uzbekistan');

      cy.get(`[data-cy="amount"]`).type('66544').should('have.value', '66544');

      cy.get(`[data-cy="senderId"]`).type('14227').should('have.value', '14227');

      cy.get(`[data-cy="receiverId"]`).type('44355').should('have.value', '44355');

      cy.get(`[data-cy="type"]`).type('95716').should('have.value', '95716');

      cy.get(`[data-cy="status"]`).type('viral Soap').should('have.value', 'viral Soap');

      cy.get(`[data-cy="note"]`).type('Refined Streamlined').should('have.value', 'Refined Streamlined');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        accountHistory = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', accountHistoryPageUrlPattern);
    });
  });
});
