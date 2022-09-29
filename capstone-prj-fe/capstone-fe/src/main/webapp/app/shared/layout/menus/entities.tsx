import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/accounts">
      <Translate contentKey="global.menu.entities.accounts" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/balance-account">
      <Translate contentKey="global.menu.entities.balanceAccount" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/account-history">
      <Translate contentKey="global.menu.entities.accountHistory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/lending-request">
      <Translate contentKey="global.menu.entities.lendingRequest" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/lending-category">
      <Translate contentKey="global.menu.entities.lendingCategory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      <Translate contentKey="global.menu.entities.category" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/investment-lending-request">
      <Translate contentKey="global.menu.entities.investmentLendingRequest" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/investment-request">
      <Translate contentKey="global.menu.entities.investmentRequest" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/indentification">
      <Translate contentKey="global.menu.entities.indentification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notification-token">
      <Translate contentKey="global.menu.entities.notificationToken" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notification">
      <Translate contentKey="global.menu.entities.notification" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
