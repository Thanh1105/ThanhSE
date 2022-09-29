import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AccountHistory from './account-history';
import AccountHistoryDetail from './account-history-detail';
import AccountHistoryUpdate from './account-history-update';
import AccountHistoryDeleteDialog from './account-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AccountHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AccountHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AccountHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={AccountHistory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AccountHistoryDeleteDialog} />
  </>
);

export default Routes;
