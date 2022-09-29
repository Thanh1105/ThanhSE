import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './investment-request.reducer';
import { IInvestmentRequest } from 'app/shared/model/investment-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const InvestmentRequest = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const investmentRequestList = useAppSelector(state => state.investmentRequest.entities);
  const loading = useAppSelector(state => state.investmentRequest.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="investment-request-heading" data-cy="InvestmentRequestHeading">
        <Translate contentKey="capstoneFeApp.investmentRequest.home.title">Investment Requests</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="capstoneFeApp.investmentRequest.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="capstoneFeApp.investmentRequest.home.createLabel">Create new Investment Request</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {investmentRequestList && investmentRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentRequest.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentRequest.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentRequest.discount">Discount</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentRequest.actuallyReceived">Actually Received</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentRequest.accounts">Accounts</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {investmentRequestList.map((investmentRequest, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${investmentRequest.id}`} color="link" size="sm">
                      {investmentRequest.id}
                    </Button>
                  </td>
                  <td>{investmentRequest.amount}</td>
                  <td>{investmentRequest.discount}</td>
                  <td>{investmentRequest.actuallyReceived}</td>
                  <td>
                    {investmentRequest.accounts ? (
                      <Link to={`accounts/${investmentRequest.accounts.id}`}>{investmentRequest.accounts.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${investmentRequest.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${investmentRequest.id}/edit`}
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
                        to={`${match.url}/${investmentRequest.id}/delete`}
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
              <Translate contentKey="capstoneFeApp.investmentRequest.home.notFound">No Investment Requests found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default InvestmentRequest;
