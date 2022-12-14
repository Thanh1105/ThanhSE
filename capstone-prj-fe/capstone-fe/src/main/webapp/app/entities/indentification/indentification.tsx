import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './indentification.reducer';
import { IIndentification } from 'app/shared/model/indentification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Indentification = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const indentificationList = useAppSelector(state => state.indentification.entities);
  const loading = useAppSelector(state => state.indentification.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="indentification-heading" data-cy="IndentificationHeading">
        <Translate contentKey="capstoneFeApp.indentification.home.title">Indentifications</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="capstoneFeApp.indentification.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="capstoneFeApp.indentification.home.createLabel">Create new Indentification</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {indentificationList && indentificationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="capstoneFeApp.indentification.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.indentification.indentifyCard1">Indentify Card 1</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.indentification.indentifyCard2">Indentify Card 2</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.indentification.drivingLicense1">Driving License 1</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.indentification.drivingLicense2">Driving License 2</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.indentification.status">Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {indentificationList.map((indentification, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${indentification.id}`} color="link" size="sm">
                      {indentification.id}
                    </Button>
                  </td>
                  <td>{indentification.indentifyCard1}</td>
                  <td>{indentification.indentifyCard2}</td>
                  <td>{indentification.drivingLicense1}</td>
                  <td>{indentification.drivingLicense2}</td>
                  <td>{indentification.status}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${indentification.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${indentification.id}/edit`}
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
                        to={`${match.url}/${indentification.id}/delete`}
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
              <Translate contentKey="capstoneFeApp.indentification.home.notFound">No Indentifications found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Indentification;
