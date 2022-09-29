import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './accounts.reducer';
import { IAccounts } from 'app/shared/model/accounts.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Accounts = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const accountsList = useAppSelector(state => state.accounts.entities);
  const loading = useAppSelector(state => state.accounts.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="accounts-heading" data-cy="AccountsHeading">
        <Translate contentKey="capstoneFeApp.accounts.home.title">Accounts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="capstoneFeApp.accounts.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="capstoneFeApp.accounts.home.createLabel">Create new Accounts</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {accountsList && accountsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.googleId">Google Id</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.birth">Birth</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.creditScore">Credit Score</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.averageRating">Average Rating</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.isSuperUser">Is Super User</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.accounts.status">Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {accountsList.map((accounts, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${accounts.id}`} color="link" size="sm">
                      {accounts.id}
                    </Button>
                  </td>
                  <td>{accounts.googleId}</td>
                  <td>{accounts.lastName}</td>
                  <td>{accounts.firstName}</td>
                  <td>{accounts.password}</td>
                  <td>{accounts.email}</td>
                  <td>{accounts.phoneNumber}</td>
                  <td>{accounts.birth ? <TextFormat type="date" value={accounts.birth} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{accounts.gender ? 'true' : 'false'}</td>
                  <td>{accounts.creditScore}</td>
                  <td>{accounts.averageRating}</td>
                  <td>{accounts.isSuperUser ? 'true' : 'false'}</td>
                  <td>{accounts.status}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${accounts.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accounts.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accounts.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="capstoneFeApp.accounts.home.notFound">No Accounts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Accounts;
