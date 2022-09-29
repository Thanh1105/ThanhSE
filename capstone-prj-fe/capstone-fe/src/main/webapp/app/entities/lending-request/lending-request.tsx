import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './lending-request.reducer';
import { ILendingRequest } from 'app/shared/model/lending-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LendingRequest = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const lendingRequestList = useAppSelector(state => state.lendingRequest.entities);
  const loading = useAppSelector(state => state.lendingRequest.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="lending-request-heading" data-cy="LendingRequestHeading">
        <Translate contentKey="capstoneFeApp.lendingRequest.home.title">Lending Requests</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="capstoneFeApp.lendingRequest.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="capstoneFeApp.lendingRequest.home.createLabel">Create new Lending Request</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {lendingRequestList && lendingRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.longId">Long Id</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.typeOfLending">Type Of Lending</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.maxNumberOfInverstor">Max Number Of Inverstor</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.availableMoney">Available Money</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.total">Total</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.interestRate">Interest Rate</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.lendingRequest.accounts">Accounts</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {lendingRequestList.map((lendingRequest, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${lendingRequest.id}`} color="link" size="sm">
                      {lendingRequest.id}
                    </Button>
                  </td>
                  <td>{lendingRequest.longId}</td>
                  <td>{lendingRequest.description}</td>
                  <td>{lendingRequest.typeOfLending}</td>
                  <td>{lendingRequest.maxNumberOfInverstor}</td>
                  <td>{lendingRequest.availableMoney}</td>
                  <td>{lendingRequest.amount}</td>
                  <td>{lendingRequest.total}</td>
                  <td>{lendingRequest.interestRate}</td>
                  <td>
                    {lendingRequest.startDate ? <TextFormat type="date" value={lendingRequest.startDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {lendingRequest.endDate ? <TextFormat type="date" value={lendingRequest.endDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {lendingRequest.accounts ? <Link to={`accounts/${lendingRequest.accounts.id}`}>{lendingRequest.accounts.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${lendingRequest.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${lendingRequest.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${lendingRequest.id}/delete`}
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
              <Translate contentKey="capstoneFeApp.lendingRequest.home.notFound">No Lending Requests found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LendingRequest;
