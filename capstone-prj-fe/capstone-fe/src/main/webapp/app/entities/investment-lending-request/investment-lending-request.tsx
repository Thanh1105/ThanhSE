import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './investment-lending-request.reducer';
import { IInvestmentLendingRequest } from 'app/shared/model/investment-lending-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const InvestmentLendingRequest = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const investmentLendingRequestList = useAppSelector(state => state.investmentLendingRequest.entities);
  const loading = useAppSelector(state => state.investmentLendingRequest.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="investment-lending-request-heading" data-cy="InvestmentLendingRequestHeading">
        <Translate contentKey="capstoneFeApp.investmentLendingRequest.home.title">Investment Lending Requests</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="capstoneFeApp.investmentLendingRequest.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="capstoneFeApp.investmentLendingRequest.home.createLabel">
              Create new Investment Lending Request
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {investmentLendingRequestList && investmentLendingRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentLendingRequest.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentLendingRequest.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentLendingRequest.lendingRequest">Lending Request</Translate>
                </th>
                <th>
                  <Translate contentKey="capstoneFeApp.investmentLendingRequest.investmentRequest">Investment Request</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {investmentLendingRequestList.map((investmentLendingRequest, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${investmentLendingRequest.id}`} color="link" size="sm">
                      {investmentLendingRequest.id}
                    </Button>
                  </td>
                  <td>{investmentLendingRequest.status}</td>
                  <td>
                    {investmentLendingRequest.lendingRequest ? (
                      <Link to={`lending-request/${investmentLendingRequest.lendingRequest.id}`}>
                        {investmentLendingRequest.lendingRequest.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {investmentLendingRequest.investmentRequest ? (
                      <Link to={`investment-request/${investmentLendingRequest.investmentRequest.id}`}>
                        {investmentLendingRequest.investmentRequest.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${investmentLendingRequest.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${investmentLendingRequest.id}/edit`}
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
                        to={`${match.url}/${investmentLendingRequest.id}/delete`}
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
              <Translate contentKey="capstoneFeApp.investmentLendingRequest.home.notFound">No Investment Lending Requests found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default InvestmentLendingRequest;
