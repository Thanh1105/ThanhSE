import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './account-history.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AccountHistoryDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const accountHistoryEntity = useAppSelector(state => state.accountHistory.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="accountHistoryDetailsHeading">
          <Translate contentKey="capstoneFeApp.accountHistory.detail.title">AccountHistory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{accountHistoryEntity.id}</dd>
          <dt>
            <span id="transactionName">
              <Translate contentKey="capstoneFeApp.accountHistory.transactionName">Transaction Name</Translate>
            </span>
          </dt>
          <dd>{accountHistoryEntity.transactionName}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="capstoneFeApp.accountHistory.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{accountHistoryEntity.amount}</dd>
          <dt>
            <span id="senderId">
              <Translate contentKey="capstoneFeApp.accountHistory.senderId">Sender Id</Translate>
            </span>
          </dt>
          <dd>{accountHistoryEntity.senderId}</dd>
          <dt>
            <span id="receiverId">
              <Translate contentKey="capstoneFeApp.accountHistory.receiverId">Receiver Id</Translate>
            </span>
          </dt>
          <dd>{accountHistoryEntity.receiverId}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="capstoneFeApp.accountHistory.type">Type</Translate>
            </span>
          </dt>
          <dd>{accountHistoryEntity.type}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="capstoneFeApp.accountHistory.status">Status</Translate>
            </span>
          </dt>
          <dd>{accountHistoryEntity.status}</dd>
          <dt>
            <span id="note">
              <Translate contentKey="capstoneFeApp.accountHistory.note">Note</Translate>
            </span>
          </dt>
          <dd>{accountHistoryEntity.note}</dd>
          <dt>
            <Translate contentKey="capstoneFeApp.accountHistory.balanceAccount">Balance Account</Translate>
          </dt>
          <dd>{accountHistoryEntity.balanceAccount ? accountHistoryEntity.balanceAccount.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/account-history" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-history/${accountHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AccountHistoryDetail;
