import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BalanceAccount from './balance-account';
import BalanceAccountDetail from './balance-account-detail';
import BalanceAccountUpdate from './balance-account-update';
import BalanceAccountDeleteDialog from './balance-account-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BalanceAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BalanceAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BalanceAccountDetail} />
      <ErrorBoundaryRoute path={match.url} component={BalanceAccount} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BalanceAccountDeleteDialog} />
  </>
);

export default Routes;
