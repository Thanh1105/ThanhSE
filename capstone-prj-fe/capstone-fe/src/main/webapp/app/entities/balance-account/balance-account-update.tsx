import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAccounts } from 'app/shared/model/accounts.model';
import { getEntities as getAccounts } from 'app/entities/accounts/accounts.reducer';
import { getEntity, updateEntity, createEntity, reset } from './balance-account.reducer';
import { IBalanceAccount } from 'app/shared/model/balance-account.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const BalanceAccountUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const accounts = useAppSelector(state => state.accounts.entities);
  const balanceAccountEntity = useAppSelector(state => state.balanceAccount.entity);
  const loading = useAppSelector(state => state.balanceAccount.loading);
  const updating = useAppSelector(state => state.balanceAccount.updating);
  const updateSuccess = useAppSelector(state => state.balanceAccount.updateSuccess);
  const handleClose = () => {
    props.history.push('/balance-account');
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
      ...balanceAccountEntity,
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
          ...balanceAccountEntity,
          accounts: balanceAccountEntity?.accounts?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.balanceAccount.home.createOrEditLabel" data-cy="BalanceAccountCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.balanceAccount.home.createOrEditLabel">Create or edit a BalanceAccount</Translate>
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
                  id="balance-account-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('capstoneFeApp.balanceAccount.type')}
                id="balance-account-type"
                name="type"
                data-cy="type"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.balanceAccount.balance')}
                id="balance-account-balance"
                name="balance"
                data-cy="balance"
                type="text"
              />
              <ValidatedField
                id="balance-account-accounts"
                name="accounts"
                data-cy="accounts"
                label={translate('capstoneFeApp.balanceAccount.accounts')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/balance-account" replace color="info">
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

export default BalanceAccountUpdate;
