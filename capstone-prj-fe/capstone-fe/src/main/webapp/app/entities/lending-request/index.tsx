import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LendingRequest from './lending-request';
import LendingRequestDetail from './lending-request-detail';
import LendingRequestUpdate from './lending-request-update';
import LendingRequestDeleteDialog from './lending-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LendingRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LendingRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LendingRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={LendingRequest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LendingRequestDeleteDialog} />
  </>
);

export default Routes;
