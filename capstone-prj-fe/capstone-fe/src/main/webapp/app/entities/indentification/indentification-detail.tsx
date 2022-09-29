import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './indentification.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const IndentificationDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const indentificationEntity = useAppSelector(state => state.indentification.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="indentificationDetailsHeading">
          <Translate contentKey="capstoneFeApp.indentification.detail.title">Indentification</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{indentificationEntity.id}</dd>
          <dt>
            <span id="indentifyCard1">
              <Translate contentKey="capstoneFeApp.indentification.indentifyCard1">Indentify Card 1</Translate>
            </span>
          </dt>
          <dd>{indentificationEntity.indentifyCard1}</dd>
          <dt>
            <span id="indentifyCard2">
              <Translate contentKey="capstoneFeApp.indentification.indentifyCard2">Indentify Card 2</Translate>
            </span>
          </dt>
          <dd>{indentificationEntity.indentifyCard2}</dd>
          <dt>
            <span id="drivingLicense1">
              <Translate contentKey="capstoneFeApp.indentification.drivingLicense1">Driving License 1</Translate>
            </span>
          </dt>
          <dd>{indentificationEntity.drivingLicense1}</dd>
          <dt>
            <span id="drivingLicense2">
              <Translate contentKey="capstoneFeApp.indentification.drivingLicense2">Driving License 2</Translate>
            </span>
          </dt>
          <dd>{indentificationEntity.drivingLicense2}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="capstoneFeApp.indentification.status">Status</Translate>
            </span>
          </dt>
          <dd>{indentificationEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/indentification" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/indentification/${indentificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default IndentificationDetail;
