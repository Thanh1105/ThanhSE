import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InvestmentLendingRequest from './investment-lending-request';
import InvestmentLendingRequestDetail from './investment-lending-request-detail';
import InvestmentLendingRequestUpdate from './investment-lending-request-update';
import InvestmentLendingRequestDeleteDialog from './investment-lending-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InvestmentLendingRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InvestmentLendingRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InvestmentLendingRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={InvestmentLendingRequest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InvestmentLendingRequestDeleteDialog} />
  </>
);

export default Routes;
