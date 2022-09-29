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

describe('Accounts e2e test', () => {
  const accountsPageUrl = '/accounts';
  const accountsPageUrlPattern = new RegExp('/accounts(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const accountsSample = {};

  let accounts: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/accounts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/accounts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/accounts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (accounts) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/accounts/${accounts.id}`,
      }).then(() => {
        accounts = undefined;
      });
    }
  });

  it('Accounts menu should load Accounts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('accounts');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Accounts').should('exist');
    cy.url().should('match', accountsPageUrlPattern);
  });

  describe('Accounts page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(accountsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Accounts page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/accounts/new$'));
        cy.getEntityCreateUpdateHeading('Accounts');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', accountsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/accounts',
          body: accountsSample,
        }).then(({ body }) => {
          accounts = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/accounts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [accounts],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(accountsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Accounts page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('accounts');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', accountsPageUrlPattern);
      });

      it('edit button click should load edit Accounts page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Accounts');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', accountsPageUrlPattern);
      });

      it('last delete button click should delete instance of Accounts', () => {
        cy.intercept('GET', '/api/accounts/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('accounts').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', accountsPageUrlPattern);

        accounts = undefined;
      });
    });
  });

  describe('new Accounts page', () => {
    beforeEach(() => {
      cy.visit(`${accountsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Accounts');
    });

    it('should create an instance of Accounts', () => {
      cy.get(`[data-cy="googleId"]`).type('Rico').should('have.value', 'Rico');

      cy.get(`[data-cy="lastName"]`).type('Bins').should('have.value', 'Bins');

      cy.get(`[data-cy="firstName"]`).type('Marquise').should('have.value', 'Marquise');

      cy.get(`[data-cy="password"]`).type('Frozen SSL').should('have.value', 'Frozen SSL');

      cy.get(`[data-cy="email"]`).type('Sadie_Gleason42@gmail.com').should('have.value', 'Sadie_Gleason42@gmail.com');

      cy.get(`[data-cy="phoneNumber"]`).type('AI Rial payment').should('have.value', 'AI Rial payment');

      cy.get(`[data-cy="birth"]`).type('2022-06-01T16:38').should('have.value', '2022-06-01T16:38');

      cy.get(`[data-cy="gender"]`).should('not.be.checked');
      cy.get(`[data-cy="gender"]`).click().should('be.checked');

      cy.get(`[data-cy="creditScore"]`).type('21427').should('have.value', '21427');

      cy.get(`[data-cy="averageRating"]`).type('87186').should('have.value', '87186');

      cy.get(`[data-cy="isSuperUser"]`).should('not.be.checked');
      cy.get(`[data-cy="isSuperUser"]`).click().should('be.checked');

      cy.get(`[data-cy="status"]`).type('Technician Avon Tuna').should('have.value', 'Technician Avon Tuna');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        accounts = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', accountsPageUrlPattern);
    });
  });
});
