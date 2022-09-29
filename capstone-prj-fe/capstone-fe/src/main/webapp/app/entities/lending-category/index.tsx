import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LendingCategory from './lending-category';
import LendingCategoryDetail from './lending-category-detail';
import LendingCategoryUpdate from './lending-category-update';
import LendingCategoryDeleteDialog from './lending-category-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LendingCategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LendingCategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LendingCategoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={LendingCategory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LendingCategoryDeleteDialog} />
  </>
);

export default Routes;
