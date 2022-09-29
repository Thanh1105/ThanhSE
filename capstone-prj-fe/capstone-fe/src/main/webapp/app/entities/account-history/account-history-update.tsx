import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IBalanceAccount } from 'app/shared/model/balance-account.model';
import { getEntities as getBalanceAccounts } from 'app/entities/balance-account/balance-account.reducer';
import { getEntity, updateEntity, createEntity, reset } from './account-history.reducer';
import { IAccountHistory } from 'app/shared/model/account-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AccountHistoryUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const balanceAccounts = useAppSelector(state => state.balanceAccount.entities);
  const accountHistoryEntity = useAppSelector(state => state.accountHistory.entity);
  const loading = useAppSelector(state => state.accountHistory.loading);
  const updating = useAppSelector(state => state.accountHistory.updating);
  const updateSuccess = useAppSelector(state => state.accountHistory.updateSuccess);
  const handleClose = () => {
    props.history.push('/account-history');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getBalanceAccounts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...accountHistoryEntity,
      ...values,
      balanceAccount: balanceAccounts.find(it => it.id.toString() === values.balanceAccount.toString()),
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
          ...accountHistoryEntity,
          balanceAccount: accountHistoryEntity?.balanceAccount?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.accountHistory.home.createOrEditLabel" data-cy="AccountHistoryCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.accountHistory.home.createOrEditLabel">Create or edit a AccountHistory</Translate>
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
                  id="account-history-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('capstoneFeApp.accountHistory.transactionName')}
                id="account-history-transactionName"
                name="transactionName"
                data-cy="transactionName"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accountHistory.amount')}
                id="account-history-amount"
                name="amount"
                data-cy="amount"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accountHistory.senderId')}
                id="account-history-senderId"
                name="senderId"
                data-cy="senderId"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accountHistory.receiverId')}
                id="account-history-receiverId"
                name="receiverId"
                data-cy="receiverId"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accountHistory.type')}
                id="account-history-type"
                name="type"
                data-cy="type"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accountHistory.status')}
                id="account-history-status"
                name="status"
                data-cy="status"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.accountHistory.note')}
                id="account-history-note"
                name="note"
                data-cy="note"
                type="text"
              />
              <ValidatedField
                id="account-history-balanceAccount"
                name="balanceAccount"
                data-cy="balanceAccount"
                label={translate('capstoneFeApp.accountHistory.balanceAccount')}
                type="select"
              >
                <option value="" key="0" />
                {balanceAccounts
                  ? balanceAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/account-history" replace color="info">
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

export default AccountHistoryUpdate;
