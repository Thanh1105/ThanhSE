import dayjs from 'dayjs';
import { ILendingCategory } from 'app/shared/model/lending-category.model';
import { IInvestmentLendingRequest } from 'app/shared/model/investment-lending-request.model';
import { IAccounts } from 'app/shared/model/accounts.model';

export interface ILendingRequest {
  id?: number;
  longId?: number | null;
  description?: string | null;
  typeOfLending?: number | null;
  maxNumberOfInverstor?: number | null;
  availableMoney?: number | null;
  amount?: number | null;
  total?: number | null;
  interestRate?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  lendingCategories?: ILendingCategory[] | null;
  investmentLendingRequests?: IInvestmentLendingRequest[] | null;
  accounts?: IAccounts | null;
}

export const defaultValue: Readonly<ILendingRequest> = {};
