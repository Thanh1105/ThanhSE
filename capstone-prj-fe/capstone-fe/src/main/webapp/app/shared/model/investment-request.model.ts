import { IInvestmentLendingRequest } from 'app/shared/model/investment-lending-request.model';
import { IAccounts } from 'app/shared/model/accounts.model';

export interface IInvestmentRequest {
  id?: number;
  amount?: number | null;
  discount?: number | null;
  actuallyReceived?: number | null;
  investmentLendingRequests?: IInvestmentLendingRequest[] | null;
  accounts?: IAccounts | null;
}

export const defaultValue: Readonly<IInvestmentRequest> = {};
