import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Indentification from './indentification';
import IndentificationDetail from './indentification-detail';
import IndentificationUpdate from './indentification-update';
import IndentificationDeleteDialog from './indentification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IndentificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IndentificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IndentificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Indentification} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={IndentificationDeleteDialog} />
  </>
);

export default Routes;
