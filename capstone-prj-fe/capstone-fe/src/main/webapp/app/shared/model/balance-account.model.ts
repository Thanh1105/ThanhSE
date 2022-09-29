import { IAccountHistory } from 'app/shared/model/account-history.model';
import { IAccounts } from 'app/shared/model/accounts.model';

export interface IBalanceAccount {
  id?: number;
  type?: number | null;
  balance?: number | null;
  accountHistories?: IAccountHistory[] | null;
  accounts?: IAccounts | null;
}

export const defaultValue: Readonly<IBalanceAccount> = {};
