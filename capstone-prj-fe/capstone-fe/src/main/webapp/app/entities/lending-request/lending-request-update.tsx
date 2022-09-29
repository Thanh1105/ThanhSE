import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAccounts } from 'app/shared/model/accounts.model';
import { getEntities as getAccounts } from 'app/entities/accounts/accounts.reducer';
import { getEntity, updateEntity, createEntity, reset } from './lending-request.reducer';
import { ILendingRequest } from 'app/shared/model/lending-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LendingRequestUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const accounts = useAppSelector(state => state.accounts.entities);
  const lendingRequestEntity = useAppSelector(state => state.lendingRequest.entity);
  const loading = useAppSelector(state => state.lendingRequest.loading);
  const updating = useAppSelector(state => state.lendingRequest.updating);
  const updateSuccess = useAppSelector(state => state.lendingRequest.updateSuccess);
  const handleClose = () => {
    props.history.push('/lending-request');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getAccounts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    const entity = {
      ...lendingRequestEntity,
      ...values,
      accounts: accounts.find(it => it.id.toString() === values.accounts.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          startDate: displayDefaultDateTime(),
          endDate: displayDefaultDateTime(),
        }
      : {
          ...lendingRequestEntity,
          startDate: convertDateTimeFromServer(lendingRequestEntity.startDate),
          endDate: convertDateTimeFromServer(lendingRequestEntity.endDate),
          accounts: lendingRequestEntity?.accounts?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.lendingRequest.home.createOrEditLabel" data-cy="LendingRequestCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.lendingRequest.home.createOrEditLabel">Create or edit a LendingRequest</Translate>
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
                  id="lending-request-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.longId')}
                id="lending-request-longId"
                name="longId"
                data-cy="longId"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.description')}
                id="lending-request-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.typeOfLending')}
                id="lending-request-typeOfLending"
                name="typeOfLending"
                data-cy="typeOfLending"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.maxNumberOfInverstor')}
                id="lending-request-maxNumberOfInverstor"
                name="maxNumberOfInverstor"
                data-cy="maxNumberOfInverstor"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.availableMoney')}
                id="lending-request-availableMoney"
                name="availableMoney"
                data-cy="availableMoney"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.amount')}
                id="lending-request-amount"
                name="amount"
                data-cy="amount"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.total')}
                id="lending-request-total"
                name="total"
                data-cy="total"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.interestRate')}
                id="lending-request-interestRate"
                name="interestRate"
                data-cy="interestRate"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.startDate')}
                id="lending-request-startDate"
                name="startDate"
                data-cy="startDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('capstoneFeApp.lendingRequest.endDate')}
                id="lending-request-endDate"
                name="endDate"
                data-cy="endDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="lending-request-accounts"
                name="accounts"
                data-cy="accounts"
                label={translate('capstoneFeApp.lendingRequest.accounts')}
                type="select"
              >
                <option value="" key="0" />
                {accounts
                  ? accounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/lending-request" replace color="info">
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

export default LendingRequestUpdate;
