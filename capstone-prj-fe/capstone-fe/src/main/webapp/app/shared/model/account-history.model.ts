import { IBalanceAccount } from 'app/shared/model/balance-account.model';

export interface IAccountHistory {
  id?: number;
  transactionName?: string | null;
  amount?: number | null;
  senderId?: number | null;
  receiverId?: number | null;
  type?: number | null;
  status?: string | null;
  note?: string | null;
  balanceAccount?: IBalanceAccount | null;
}

export const defaultValue: Readonly<IAccountHistory> = {};
