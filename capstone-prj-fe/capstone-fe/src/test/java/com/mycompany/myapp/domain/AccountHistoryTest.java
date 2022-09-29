package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AccountHistoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountHistory.class);
        AccountHistory accountHistory1 = new AccountHistory();
        accountHistory1.setId(1L);
        AccountHistory accountHistory2 = new AccountHistory();
        accountHistory2.setId(accountHistory1.getId());
        assertThat(accountHistory1).isEqualTo(accountHistory2);
        accountHistory2.setId(2L);
        assertThat(accountHistory1).isNotEqualTo(accountHistory2);
        accountHistory1.setId(null);
        assertThat(accountHistory1).isNotEqualTo(accountHistory2);
    }
}
