import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './notification-token.reducer';
import { INotificationToken } from 'app/shared/model/notification-token.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const NotificationToken = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const notificationTokenList = useAppSelector(state => state.notificationToken.entities);
  const loading = useAppSelector(state => state.notificationToken.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="notification-token-heading" data-cy="NotificationTokenHeading">
        <Translate contentKey="capstoneFeApp.notificationToken.home.title">Notification Tokens</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="capstoneFeApp.notificationToken.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="capstoneFeApp.notificationToken.home.createLabel">Create new Notification Token</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {notificationTokenList && notificationTokenList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="capstoneFeApp.notificationToken.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.notificationToken.token">Token</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.notificationToken.accounts">Accounts</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {notificationTokenList.map((notificationToken, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${notificationToken.id}`} color="link" size="sm">
                      {notificationToken.id}
                    </Button>
                  </td>
                  <td>{notificationToken.token}</td>
                  <td>
                    {notificationToken.accounts ? (
                      <Link to={`accounts/${notificationToken.accounts.id}`}>{notificationToken.accounts.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${notificationToken.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${notificationToken.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${notificationToken.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="capstoneFeApp.notificationToken.home.notFound">No Notification Tokens found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NotificationToken;
