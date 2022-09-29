import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './accounts.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AccountsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const accountsEntity = useAppSelector(state => state.accounts.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="accountsDetailsHeading">
          <Translate contentKey="capstoneFeApp.accounts.detail.title">Accounts</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.id}</dd>
          <dt>
            <span id="googleId">
              <Translate contentKey="capstoneFeApp.accounts.googleId">Google Id</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.googleId}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="capstoneFeApp.accounts.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.lastName}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="capstoneFeApp.accounts.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.firstName}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="capstoneFeApp.accounts.password">Password</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.password}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="capstoneFeApp.accounts.email">Email</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="capstoneFeApp.accounts.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.phoneNumber}</dd>
          <dt>
            <span id="birth">
              <Translate contentKey="capstoneFeApp.accounts.birth">Birth</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.birth ? <TextFormat value={accountsEntity.birth} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="capstoneFeApp.accounts.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.gender ? 'true' : 'false'}</dd>
          <dt>
            <span id="creditScore">
              <Translate contentKey="capstoneFeApp.accounts.creditScore">Credit Score</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.creditScore}</dd>
          <dt>
            <span id="averageRating">
              <Translate contentKey="capstoneFeApp.accounts.averageRating">Average Rating</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.averageRating}</dd>
          <dt>
            <span id="isSuperUser">
              <Translate contentKey="capstoneFeApp.accounts.isSuperUser">Is Super User</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.isSuperUser ? 'true' : 'false'}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="capstoneFeApp.accounts.status">Status</Translate>
            </span>
          </dt>
          <dd>{accountsEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/accounts" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/accounts/${accountsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AccountsDetail;
