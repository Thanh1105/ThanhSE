import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import accounts from 'app/entities/accounts/accounts.reducer';
// prettier-ignore
import balanceAccount from 'app/entities/balance-account/balance-account.reducer';
// prettier-ignore
import accountHistory from 'app/entities/account-history/account-history.reducer';
// prettier-ignore
import lendingRequest from 'app/entities/lending-request/lending-request.reducer';
// prettier-ignore
import lendingCategory from 'app/entities/lending-category/lending-category.reducer';
// prettier-ignore
import category from 'app/entities/category/category.reducer';
// prettier-ignore
import investmentLendingRequest from 'app/entities/investment-lending-request/investment-lending-request.reducer';
// prettier-ignore
import investmentRequest from 'app/entities/investment-request/investment-request.reducer';
// prettier-ignore
import indentification from 'app/entities/indentification/indentification.reducer';
// prettier-ignore
import notificationToken from 'app/entities/notification-token/notification-token.reducer';
// prettier-ignore
import notification from 'app/entities/notification/notification.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  accounts,
  balanceAccount,
  accountHistory,
  lendingRequest,
  lendingCategory,
  category,
  investmentLendingRequest,
  investmentRequest,
  indentification,
  notificationToken,
  notification,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
