import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './balance-account.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const BalanceAccountDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const balanceAccountEntity = useAppSelector(state => state.balanceAccount.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="balanceAccountDetailsHeading">
          <Translate contentKey="capstoneFeApp.balanceAccount.detail.title">BalanceAccount</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{balanceAccountEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="capstoneFeApp.balanceAccount.type">Type</Translate>
            </span>
          </dt>
          <dd>{balanceAccountEntity.type}</dd>
          <dt>
            <span id="balance">
              <Translate contentKey="capstoneFeApp.balanceAccount.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{balanceAccountEntity.balance}</dd>
          <dt>
            <Translate contentKey="capstoneFeApp.balanceAccount.accounts">Accounts</Translate>
          </dt>
          <dd>{balanceAccountEntity.accounts ? balanceAccountEntity.accounts.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/balance-account" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/balance-account/${balanceAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BalanceAccountDetail;
