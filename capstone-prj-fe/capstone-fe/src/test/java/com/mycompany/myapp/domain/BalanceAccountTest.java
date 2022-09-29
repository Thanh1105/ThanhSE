package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BalanceAccountTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BalanceAccount.class);
        BalanceAccount balanceAccount1 = new BalanceAccount();
        balanceAccount1.setId(1L);
        BalanceAccount balanceAccount2 = new BalanceAccount();
        balanceAccount2.setId(balanceAccount1.getId());
        assertThat(balanceAccount1).isEqualTo(balanceAccount2);
        balanceAccount2.setId(2L);
        assertThat(balanceAccount1).isNotEqualTo(balanceAccount2);
        balanceAccount1.setId(null);
        assertThat(balanceAccount1).isNotEqualTo(balanceAccount2);
    }
}
