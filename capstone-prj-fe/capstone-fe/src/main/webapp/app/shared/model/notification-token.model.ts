import { IAccounts } from 'app/shared/model/accounts.model';

export interface INotificationToken {
  id?: number;
  token?: string | null;
  accounts?: IAccounts | null;
}

export const defaultValue: Readonly<INotificationToken> = {};
