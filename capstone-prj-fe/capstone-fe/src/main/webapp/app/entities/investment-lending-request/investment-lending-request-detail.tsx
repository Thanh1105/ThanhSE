import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './investment-lending-request.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const InvestmentLendingRequestDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const investmentLendingRequestEntity = useAppSelector(state => state.investmentLendingRequest.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="investmentLendingRequestDetailsHeading">
          <Translate contentKey="capstoneFeApp.investmentLendingRequest.detail.title">InvestmentLendingRequest</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{investmentLendingRequestEntity.id}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="capstoneFeApp.investmentLendingRequest.status">Status</Translate>
            </span>
          </dt>
          <dd>{investmentLendingRequestEntity.status}</dd>
          <dt>
            <Translate contentKey="capstoneFeApp.investmentLendingRequest.lendingRequest">Lending Request</Translate>
          </dt>
          <dd>{investmentLendingRequestEntity.lendingRequest ? investmentLendingRequestEntity.lendingRequest.id : ''}</dd>
          <dt>
            <Translate contentKey="capstoneFeApp.investmentLendingRequest.investmentRequest">Investment Request</Translate>
          </dt>
          <dd>{investmentLendingRequestEntity.investmentRequest ? investmentLendingRequestEntity.investmentRequest.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/investment-lending-request" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/investment-lending-request/${investmentLendingRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InvestmentLendingRequestDetail;
