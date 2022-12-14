import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './notification.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const NotificationDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const notificationEntity = useAppSelector(state => state.notification.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="notificationDetailsHeading">
          <Translate contentKey="capstoneFeApp.notification.detail.title">Notification</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.id}</dd>
          <dt>
            <span id="typeNoti">
              <Translate contentKey="capstoneFeApp.notification.typeNoti">Type Noti</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.typeNoti}</dd>
          <dt>
            <span id="typeAccount">
              <Translate contentKey="capstoneFeApp.notification.typeAccount">Type Account</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.typeAccount}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="capstoneFeApp.notification.message">Message</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.message}</dd>
          <dt>
            <span id="hasRead">
              <Translate contentKey="capstoneFeApp.notification.hasRead">Has Read</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.hasRead ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="capstoneFeApp.notification.accounts">Accounts</Translate>
          </dt>
          <dd>{notificationEntity.accounts ? notificationEntity.accounts.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/notification" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/notification/${notificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default NotificationDetail;
