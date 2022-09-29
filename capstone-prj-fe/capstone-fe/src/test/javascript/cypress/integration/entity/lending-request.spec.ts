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

describe('LendingRequest e2e test', () => {
  const lendingRequestPageUrl = '/lending-request';
  const lendingRequestPageUrlPattern = new RegExp('/lending-request(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const lendingRequestSample = {};

  let lendingRequest: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/lending-requests+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/lending-requests').as('postEntityRequest');
    cy.intercept('DELETE', '/api/lending-requests/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (lendingRequest) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/lending-requests/${lendingRequest.id}`,
      }).then(() => {
        lendingRequest = undefined;
      });
    }
  });

  it('LendingRequests menu should load LendingRequests page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('lending-request');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('LendingRequest').should('exist');
    cy.url().should('match', lendingRequestPageUrlPattern);
  });

  describe('LendingRequest page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(lendingRequestPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create LendingRequest page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/lending-request/new$'));
        cy.getEntityCreateUpdateHeading('LendingRequest');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lendingRequestPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/lending-requests',
          body: lendingRequestSample,
        }).then(({ body }) => {
          lendingRequest = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/lending-requests+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [lendingRequest],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(lendingRequestPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details LendingRequest page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('lendingRequest');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lendingRequestPageUrlPattern);
      });

      it('edit button click should load edit LendingRequest page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LendingRequest');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lendingRequestPageUrlPattern);
      });

      it('last delete button click should delete instance of LendingRequest', () => {
        cy.intercept('GET', '/api/lending-requests/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('lendingRequest').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lendingRequestPageUrlPattern);

        lendingRequest = undefined;
      });
    });
  });

  describe('new LendingRequest page', () => {
    beforeEach(() => {
      cy.visit(`${lendingRequestPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('LendingRequest');
    });

    it('should create an instance of LendingRequest', () => {
      cy.get(`[data-cy="longId"]`).type('18562').should('have.value', '18562');

      cy.get(`[data-cy="description"]`).type('China Forward program').should('have.value', 'China Forward program');

      cy.get(`[data-cy="typeOfLending"]`).type('87009').should('have.value', '87009');

      cy.get(`[data-cy="maxNumberOfInverstor"]`).type('80780').should('have.value', '80780');

      cy.get(`[data-cy="availableMoney"]`).type('2148').should('have.value', '2148');

      cy.get(`[data-cy="amount"]`).type('19540').should('have.value', '19540');

      cy.get(`[data-cy="total"]`).type('85936').should('have.value', '85936');

      cy.get(`[data-cy="interestRate"]`).type('17570').should('have.value', '17570');

      cy.get(`[data-cy="startDate"]`).type('2022-06-02T07:45').should('have.value', '2022-06-02T07:45');

      cy.get(`[data-cy="endDate"]`).type('2022-06-02T11:15').should('have.value', '2022-06-02T11:15');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        lendingRequest = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', lendingRequestPageUrlPattern);
    });
  });
});
