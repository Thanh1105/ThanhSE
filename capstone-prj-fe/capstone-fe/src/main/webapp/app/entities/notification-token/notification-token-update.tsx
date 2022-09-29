import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAccounts } from 'app/shared/model/accounts.model';
import { getEntities as getAccounts } from 'app/entities/accounts/accounts.reducer';
import { getEntity, updateEntity, createEntity, reset } from './notification-token.reducer';
import { INotificationToken } from 'app/shared/model/notification-token.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const NotificationTokenUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const accounts = useAppSelector(state => state.accounts.entities);
  const notificationTokenEntity = useAppSelector(state => state.notificationToken.entity);
  const loading = useAppSelector(state => state.notificationToken.loading);
  const updating = useAppSelector(state => state.notificationToken.updating);
  const updateSuccess = useAppSelector(state => state.notificationToken.updateSuccess);
  const handleClose = () => {
    props.history.push('/notification-token');
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
    const entity = {
      ...notificationTokenEntity,
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
      ? {}
      : {
          ...notificationTokenEntity,
          accounts: notificationTokenEntity?.accounts?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.notificationToken.home.createOrEditLabel" data-cy="NotificationTokenCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.notificationToken.home.createOrEditLabel">Create or edit a NotificationToken</Translate>
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
                  id="notification-token-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('capstoneFeApp.notificationToken.token')}
                id="notification-token-token"
                name="token"
                data-cy="token"
                type="text"
              />
              <ValidatedField
                id="notification-token-accounts"
                name="accounts"
                data-cy="accounts"
                label={translate('capstoneFeApp.notificationToken.accounts')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/notification-token" replace color="info">
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

export default NotificationTokenUpdate;
