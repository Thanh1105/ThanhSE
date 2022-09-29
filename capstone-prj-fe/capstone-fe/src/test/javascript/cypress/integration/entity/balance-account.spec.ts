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

describe('BalanceAccount e2e test', () => {
  const balanceAccountPageUrl = '/balance-account';
  const balanceAccountPageUrlPattern = new RegExp('/balance-account(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const balanceAccountSample = {};

  let balanceAccount: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/balance-accounts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/balance-accounts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/balance-accounts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (balanceAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/balance-accounts/${balanceAccount.id}`,
      }).then(() => {
        balanceAccount = undefined;
      });
    }
  });

  it('BalanceAccounts menu should load BalanceAccounts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('balance-account');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BalanceAccount').should('exist');
    cy.url().should('match', balanceAccountPageUrlPattern);
  });

  describe('BalanceAccount page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(balanceAccountPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BalanceAccount page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/balance-account/new$'));
        cy.getEntityCreateUpdateHeading('BalanceAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', balanceAccountPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/balance-accounts',
          body: balanceAccountSample,
        }).then(({ body }) => {
          balanceAccount = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/balance-accounts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [balanceAccount],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(balanceAccountPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details BalanceAccount page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('balanceAccount');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', balanceAccountPageUrlPattern);
      });

      it('edit button click should load edit BalanceAccount page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BalanceAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', balanceAccountPageUrlPattern);
      });

      it('last delete button click should delete instance of BalanceAccount', () => {
        cy.intercept('GET', '/api/balance-accounts/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('balanceAccount').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', balanceAccountPageUrlPattern);

        balanceAccount = undefined;
      });
    });
  });

  describe('new BalanceAccount page', () => {
    beforeEach(() => {
      cy.visit(`${balanceAccountPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BalanceAccount');
    });

    it('should create an instance of BalanceAccount', () => {
      cy.get(`[data-cy="type"]`).type('38780').should('have.value', '38780');

      cy.get(`[data-cy="balance"]`).type('61471').should('have.value', '61471');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        balanceAccount = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', balanceAccountPageUrlPattern);
    });
  });
});
