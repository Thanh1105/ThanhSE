import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Accounts from './accounts';
import BalanceAccount from './balance-account';
import AccountHistory from './account-history';
import LendingRequest from './lending-request';
import LendingCategory from './lending-category';
import Category from './category';
import InvestmentLendingRequest from './investment-lending-request';
import InvestmentRequest from './investment-request';
import Indentification from './indentification';
import NotificationToken from './notification-token';
import Notification from './notification';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}accounts`} component={Accounts} />
      <ErrorBoundaryRoute path={`${match.url}balance-account`} component={BalanceAccount} />
      <ErrorBoundaryRoute path={`${match.url}account-history`} component={AccountHistory} />
      <ErrorBoundaryRoute path={`${match.url}lending-request`} component={LendingRequest} />
      <ErrorBoundaryRoute path={`${match.url}lending-category`} component={LendingCategory} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}investment-lending-request`} component={InvestmentLendingRequest} />
      <ErrorBoundaryRoute path={`${match.url}investment-request`} component={InvestmentRequest} />
      <ErrorBoundaryRoute path={`${match.url}indentification`} component={Indentification} />
      <ErrorBoundaryRoute path={`${match.url}notification-token`} component={NotificationToken} />
      <ErrorBoundaryRoute path={`${match.url}notification`} component={Notification} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
