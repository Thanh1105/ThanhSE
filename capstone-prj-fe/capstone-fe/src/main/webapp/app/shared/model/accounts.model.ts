import dayjs from 'dayjs';
import { IBalanceAccount } from 'app/shared/model/balance-account.model';
import { INotification } from 'app/shared/model/notification.model';
import { INotificationToken } from 'app/shared/model/notification-token.model';
import { IInvestmentRequest } from 'app/shared/model/investment-request.model';
import { ILendingRequest } from 'app/shared/model/lending-request.model';

export interface IAccounts {
  id?: number;
  googleId?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  password?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  birth?: string | null;
  gender?: boolean | null;
  creditScore?: number | null;
  averageRating?: number | null;
  isSuperUser?: boolean | null;
  status?: string | null;
  balanceAccounts?: IBalanceAccount[] | null;
  notifications?: INotification[] | null;
  notificationTokens?: INotificationToken[] | null;
  investmentRequests?: IInvestmentRequest[] | null;
  lendingRequests?: ILendingRequest[] | null;
}

export const defaultValue: Readonly<IAccounts> = {
  gender: false,
  isSuperUser: false,
};
