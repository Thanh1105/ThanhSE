import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAccounts } from 'app/shared/model/accounts.model';
import { getEntities as getAccounts } from 'app/entities/accounts/accounts.reducer';
import { getEntity, updateEntity, createEntity, reset } from './investment-request.reducer';
import { IInvestmentRequest } from 'app/shared/model/investment-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const InvestmentRequestUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const accounts = useAppSelector(state => state.accounts.entities);
  const investmentRequestEntity = useAppSelector(state => state.investmentRequest.entity);
  const loading = useAppSelector(state => state.investmentRequest.loading);
  const updating = useAppSelector(state => state.investmentRequest.updating);
  const updateSuccess = useAppSelector(state => state.investmentRequest.updateSuccess);
  const handleClose = () => {
    props.history.push('/investment-request');
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
      ...investmentRequestEntity,
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
          ...investmentRequestEntity,
          accounts: investmentRequestEntity?.accounts?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.investmentRequest.home.createOrEditLabel" data-cy="InvestmentRequestCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.investmentRequest.home.createOrEditLabel">Create or edit a InvestmentRequest</Translate>
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
                  id="investment-request-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('capstoneFeApp.investmentRequest.amount')}
                id="investment-request-amount"
                name="amount"
                data-cy="amount"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.investmentRequest.discount')}
                id="investment-request-discount"
                name="discount"
                data-cy="discount"
                type="text"
              />
              <ValidatedField
                label={translate('capstoneFeApp.investmentRequest.actuallyReceived')}
                id="investment-request-actuallyReceived"
                name="actuallyReceived"
                data-cy="actuallyReceived"
                type="text"
              />
              <ValidatedField
                id="investment-request-accounts"
                name="accounts"
                data-cy="accounts"
                label={translate('capstoneFeApp.investmentRequest.accounts')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/investment-request" replace color="info">
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

export default InvestmentRequestUpdate;
