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

describe('NotificationToken e2e test', () => {
  const notificationTokenPageUrl = '/notification-token';
  const notificationTokenPageUrlPattern = new RegExp('/notification-token(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const notificationTokenSample = {};

  let notificationToken: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/notification-tokens+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/notification-tokens').as('postEntityRequest');
    cy.intercept('DELETE', '/api/notification-tokens/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (notificationToken) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/notification-tokens/${notificationToken.id}`,
      }).then(() => {
        notificationToken = undefined;
      });
    }
  });

  it('NotificationTokens menu should load NotificationTokens page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('notification-token');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('NotificationToken').should('exist');
    cy.url().should('match', notificationTokenPageUrlPattern);
  });

  describe('NotificationToken page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(notificationTokenPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create NotificationToken page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/notification-token/new$'));
        cy.getEntityCreateUpdateHeading('NotificationToken');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', notificationTokenPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/notification-tokens',
          body: notificationTokenSample,
        }).then(({ body }) => {
          notificationToken = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/notification-tokens+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [notificationToken],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(notificationTokenPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details NotificationToken page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('notificationToken');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', notificationTokenPageUrlPattern);
      });

      it('edit button click should load edit NotificationToken page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('NotificationToken');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', notificationTokenPageUrlPattern);
      });

      it('last delete button click should delete instance of NotificationToken', () => {
        cy.intercept('GET', '/api/notification-tokens/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('notificationToken').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', notificationTokenPageUrlPattern);

        notificationToken = undefined;
      });
    });
  });

  describe('new NotificationToken page', () => {
    beforeEach(() => {
      cy.visit(`${notificationTokenPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('NotificationToken');
    });

    it('should create an instance of NotificationToken', () => {
      cy.get(`[data-cy="token"]`).type('transmitter Lira').should('have.value', 'transmitter Lira');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        notificationToken = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', notificationTokenPageUrlPattern);
    });
  });
});
