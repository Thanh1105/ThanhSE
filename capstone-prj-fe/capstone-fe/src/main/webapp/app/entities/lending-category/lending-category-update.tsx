import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ILendingRequest } from 'app/shared/model/lending-request.model';
import { getEntities as getLendingRequests } from 'app/entities/lending-request/lending-request.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './lending-category.reducer';
import { ILendingCategory } from 'app/shared/model/lending-category.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LendingCategoryUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const lendingRequests = useAppSelector(state => state.lendingRequest.entities);
  const categories = useAppSelector(state => state.category.entities);
  const lendingCategoryEntity = useAppSelector(state => state.lendingCategory.entity);
  const loading = useAppSelector(state => state.lendingCategory.loading);
  const updating = useAppSelector(state => state.lendingCategory.updating);
  const updateSuccess = useAppSelector(state => state.lendingCategory.updateSuccess);
  const handleClose = () => {
    props.history.push('/lending-category');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getLendingRequests({}));
    dispatch(getCategories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...lendingCategoryEntity,
      ...values,
      lendingRequest: lendingRequests.find(it => it.id.toString() === values.lendingRequest.toString()),
      category: categories.find(it => it.id.toString() === values.category.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...lendingCategoryEntity,
          lendingRequest: lendingCategoryEntity?.lendingRequest?.id,
          category: lendingCategoryEntity?.category?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.lendingCategory.home.createOrEditLabel" data-cy="LendingCategoryCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.lendingCategory.home.createOrEditLabel">Create or edit a LendingCategory</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="lending-category-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                id="lending-category-lendingRequest"
                name="lendingRequest"
                data-cy="lendingRequest"
                label={translate('capstoneFeApp.lendingCategory.lendingRequest')}
                type="select"
              >
                <option value="" key="0" />
                {lendingRequests
                  ? lendingRequests.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="lending-category-category"
                name="category"
                data-cy="category"
                label={translate('capstoneFeApp.lendingCategory.category')}
                type="select"
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/lending-category" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LendingCategoryUpdate;
