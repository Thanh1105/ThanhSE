import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './lending-category.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LendingCategoryDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const lendingCategoryEntity = useAppSelector(state => state.lendingCategory.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="lendingCategoryDetailsHeading">
          <Translate contentKey="capstoneFeApp.lendingCategory.detail.title">LendingCategory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{lendingCategoryEntity.id}</dd>
          <dt>
            <Translate contentKey="capstoneFeApp.lendingCategory.lendingRequest">Lending Request</Translate>
          </dt>
          <dd>{lendingCategoryEntity.lendingRequest ? lendingCategoryEntity.lendingRequest.id : ''}</dd>
          <dt>
            <Translate contentKey="capstoneFeApp.lendingCategory.category">Category</Translate>
          </dt>
          <dd>{lendingCategoryEntity.category ? lendingCategoryEntity.category.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/lending-category" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lending-category/${lendingCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LendingCategoryDetail;
