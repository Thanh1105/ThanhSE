import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './investment-request.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const InvestmentRequestDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const investmentRequestEntity = useAppSelector(state => state.investmentRequest.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="investmentRequestDetailsHeading">
          <Translate contentKey="capstoneFeApp.investmentRequest.detail.title">InvestmentRequest</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{investmentRequestEntity.id}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="capstoneFeApp.investmentRequest.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{investmentRequestEntity.amount}</dd>
          <dt>
            <span id="discount">
              <Translate contentKey="capstoneFeApp.investmentRequest.discount">Discount</Translate>
            </span>
          </dt>
          <dd>{investmentRequestEntity.discount}</dd>
          <dt>
            <span id="actuallyReceived">
              <Translate contentKey="capstoneFeApp.investmentRequest.actuallyReceived">Actually Received</Translate>
            </span>
          </dt>
          <dd>{investmentRequestEntity.actuallyReceived}</dd>
          <dt>
            <Translate contentKey="capstoneFeApp.investmentRequest.accounts">Accounts</Translate>
          </dt>
          <dd>{investmentRequestEntity.accounts ? investmentRequestEntity.accounts.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/investment-request" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/investment-request/${investmentRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InvestmentRequestDetail;
