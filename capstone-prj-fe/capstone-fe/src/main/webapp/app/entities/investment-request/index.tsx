import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InvestmentRequest from './investment-request';
import InvestmentRequestDetail from './investment-request-detail';
import InvestmentRequestUpdate from './investment-request-update';
import InvestmentRequestDeleteDialog from './investment-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InvestmentRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InvestmentRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InvestmentRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={InvestmentRequest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InvestmentRequestDeleteDialog} />
  </>
);

export default Routes;
