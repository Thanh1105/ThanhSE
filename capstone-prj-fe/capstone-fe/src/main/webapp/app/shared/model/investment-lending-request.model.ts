import { ILendingRequest } from 'app/shared/model/lending-request.model';
import { IInvestmentRequest } from 'app/shared/model/investment-request.model';

export interface IInvestmentLendingRequest {
  id?: number;
  status?: number | null;
  lendingRequest?: ILendingRequest | null;
  investmentRequest?: IInvestmentRequest | null;
}

export const defaultValue: Readonly<IInvestmentLendingRequest> = {};
