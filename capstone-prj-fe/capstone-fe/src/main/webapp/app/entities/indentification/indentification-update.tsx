import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './indentification.reducer';
import { IIndentification } from 'app/shared/model/indentification.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const IndentificationUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const indentificationEntity = useAppSelector(state => state.indentification.entity);
  const loading = useAppSelector(state => state.indentification.loading);
  const updating = useAppSelector(state => state.indentification.updating);
  const updateSuccess = useAppSelector(state => state.indentification.updateSuccess);
  const handleClose = () => {
    props.history.push('/indentification');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...indentificationEntity,
      ...values,
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
          ...indentificationEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.indentification.home.createOrEditLabel" data-cy="IndentificationCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.indentification.home.createOrEditLabel">Create or edit a Indentification</Translate>
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
                  id="indentification-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('capstoneFeApp.indentification.indentifyCard1')}
                id="indentification-indentifyCard1"
                name="indentifyCard1"
                data-cy="indentifyCard1"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.indentification.indentifyCard2')}
                id="indentification-indentifyCard2"
                name="indentifyCard2"
                data-cy="indentifyCard2"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.indentification.drivingLicense1')}
                id="indentification-drivingLicense1"
                name="drivingLicense1"
                data-cy="drivingLicense1"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.indentification.drivingLicense2')}
                id="indentification-drivingLicense2"
                name="drivingLicense2"
                data-cy="drivingLicense2"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.indentification.status')}
                id="indentification-status"
                name="status"
                data-cy="status"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/indentification" replace color="info">
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

export default IndentificationUpdate;
