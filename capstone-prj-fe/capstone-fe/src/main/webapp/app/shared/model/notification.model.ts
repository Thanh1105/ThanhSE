import { IAccounts } from 'app/shared/model/accounts.model';

export interface INotification {
  id?: number;
  typeNoti?: number | null;
  typeAccount?: number | null;
  message?: string | null;
  hasRead?: boolean | null;
  accounts?: IAccounts | null;
}

export const defaultValue: Readonly<INotification> = {
  hasRead: false,
};
