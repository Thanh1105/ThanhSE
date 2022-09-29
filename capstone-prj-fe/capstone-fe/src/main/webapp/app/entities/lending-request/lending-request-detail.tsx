import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './lending-request.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LendingRequestDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const lendingRequestEntity = useAppSelector(state => state.lendingRequest.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="lendingRequestDetailsHeading">
          <Translate contentKey="capstoneFeApp.lendingRequest.detail.title">LendingRequest</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.id}</dd>
          <dt>
            <span id="longId">
              <Translate contentKey="capstoneFeApp.lendingRequest.longId">Long Id</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.longId}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="capstoneFeApp.lendingRequest.description">Description</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.description}</dd>
          <dt>
            <span id="typeOfLending">
              <Translate contentKey="capstoneFeApp.lendingRequest.typeOfLending">Type Of Lending</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.typeOfLending}</dd>
          <dt>
            <span id="maxNumberOfInverstor">
              <Translate contentKey="capstoneFeApp.lendingRequest.maxNumberOfInverstor">Max Number Of Inverstor</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.maxNumberOfInverstor}</dd>
          <dt>
            <span id="availableMoney">
              <Translate contentKey="capstoneFeApp.lendingRequest.availableMoney">Available Money</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.availableMoney}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="capstoneFeApp.lendingRequest.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.amount}</dd>
          <dt>
            <span id="total">
              <Translate contentKey="capstoneFeApp.lendingRequest.total">Total</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.total}</dd>
          <dt>
            <span id="interestRate">
              <Translate contentKey="capstoneFeApp.lendingRequest.interestRate">Interest Rate</Translate>
            </span>
          </dt>
          <dd>{lendingRequestEntity.interestRate}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="capstoneFeApp.lendingRequest.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {lendingRequestEntity.startDate ? (
              <TextFormat value={lendingRequestEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="capstoneFeApp.lendingRequest.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {lendingRequestEntity.endDate ? <TextFormat value={lendingRequestEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="capstoneFeApp.lendingRequest.accounts">Accounts</Translate>
          </dt>
          <dd>{lendingRequestEntity.accounts ? lendingRequestEntity.accounts.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/lending-request" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lending-request/${lendingRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LendingRequestDetail;
