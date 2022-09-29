import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ILendingRequest } from 'app/shared/model/lending-request.model';
import { getEntities as getLendingRequests } from 'app/entities/lending-request/lending-request.reducer';
import { IInvestmentRequest } from 'app/shared/model/investment-request.model';
import { getEntities as getInvestmentRequests } from 'app/entities/investment-request/investment-request.reducer';
import { getEntity, updateEntity, createEntity, reset } from './investment-lending-request.reducer';
import { IInvestmentLendingRequest } from 'app/shared/model/investment-lending-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const InvestmentLendingRequestUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const lendingRequests = useAppSelector(state => state.lendingRequest.entities);
  const investmentRequests = useAppSelector(state => state.investmentRequest.entities);
  const investmentLendingRequestEntity = useAppSelector(state => state.investmentLendingRequest.entity);
  const loading = useAppSelector(state => state.investmentLendingRequest.loading);
  const updating = useAppSelector(state => state.investmentLendingRequest.updating);
  const updateSuccess = useAppSelector(state => state.investmentLendingRequest.updateSuccess);
  const handleClose = () => {
    props.history.push('/investment-lending-request');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getLendingRequests({}));
    dispatch(getInvestmentRequests({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...investmentLendingRequestEntity,
      ...values,
      lendingRequest: lendingRequests.find(it => it.id.toString() === values.lendingRequest.toString()),
      investmentRequest: investmentRequests.find(it => it.id.toString() === values.investmentRequest.toString()),
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
          ...investmentLendingRequestEntity,
          lendingRequest: investmentLendingRequestEntity?.lendingRequest?.id,
          investmentRequest: investmentLendingRequestEntity?.investmentRequest?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="capstoneFeApp.investmentLendingRequest.home.createOrEditLabel" data-cy="InvestmentLendingRequestCreateUpdateHeading">
            <Translate contentKey="capstoneFeApp.investmentLendingRequest.home.createOrEditLabel">
              Create or edit a InvestmentLendingRequest
            </Translate>
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
                  id="investment-lending-request-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('capstoneFeApp.investmentLendingRequest.status')}
                id="investment-lending-request-status"
                name="status"
                data-cy="status"
                type="text"
              />
              <ValidatedField
                id="investment-lending-request-lendingRequest"
                name="lendingRequest"
                data-cy="lendingRequest"
                label={translate('capstoneFeApp.investmentLendingRequest.lendingRequest')}
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
                id="investment-lending-request-investmentRequest"
                name="investmentRequest"
                data-cy="investmentRequest"
                label={translate('capstoneFeApp.investmentLendingRequest.investmentRequest')}
                type="select"
              >
                <option value="" key="0" />
                {investmentRequests
                  ? investmentRequests.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/investment-lending-request" replace color="info">
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

export default InvestmentLendingRequestUpdate;
