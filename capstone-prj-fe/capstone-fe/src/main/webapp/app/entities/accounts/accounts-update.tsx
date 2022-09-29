import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './accounts.reducer';
import { IAccounts } from 'app/shared/model/accounts.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AccountsUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const accountsEntity = useAppSelector(state => state.accounts.entity);
  const loading = useAppSelector(state => state.accounts.loading);
  const updating = useAppSelector(state => state.accounts.updating);
  const updateSuccess = useAppSelector(state => state.accounts.updateSuccess);
  const handleClose = () => {
    props.history.push('/accounts');
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
    values.birth = convertDateTimeToServer(values.birth);

    const entity = {
      ...accountsEntity,
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
      ? {
          birth: displayDefaultDateTime(),
        }
      : {
          ...accountsEntity,
          birth: convertDateTimeFromServer(accountsEntity.birth),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.accounts.home.createOrEditLabel" data-cy="AccountsCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.accounts.home.createOrEditLabel">Create or edit a Accounts</Translate>
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
                  id="accounts-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('capstoneFeApp.accounts.googleId')}
                id="accounts-googleId"
                name="googleId"
                data-cy="googleId"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.lastName')}
                id="accounts-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.firstName')}
                id="accounts-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.password')}
                id="accounts-password"
                name="password"
                data-cy="password"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.email')}
                id="accounts-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.phoneNumber')}
                id="accounts-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.birth')}
                id="accounts-birth"
                name="birth"
                data-cy="birth"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.gender')}
                id="accounts-gender"
                name="gender"
                data-cy="gender"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.creditScore')}
                id="accounts-creditScore"
                name="creditScore"
                data-cy="creditScore"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.averageRating')}
                id="accounts-averageRating"
                name="averageRating"
                data-cy="averageRating"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.isSuperUser')}
                id="accounts-isSuperUser"
                name="isSuperUser"
                data-cy="isSuperUser"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accounts.status')}
                id="accounts-status"
                name="status"
                data-cy="status"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/accounts" replace color="info">
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

export default AccountsUpdate;
