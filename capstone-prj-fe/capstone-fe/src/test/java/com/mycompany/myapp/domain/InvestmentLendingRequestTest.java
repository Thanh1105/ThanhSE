package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InvestmentLendingRequestTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvestmentLendingRequest.class);
        InvestmentLendingRequest investmentLendingRequest1 = new InvestmentLendingRequest();
        investmentLendingRequest1.setId(1L);
        InvestmentLendingRequest investmentLendingRequest2 = new InvestmentLendingRequest();
        investmentLendingRequest2.setId(investmentLendingRequest1.getId());
        assertThat(investmentLendingRequest1).isEqualTo(investmentLendingRequest2);
        investmentLendingRequest2.setId(2L);
        assertThat(investmentLendingRequest1).isNotEqualTo(investmentLendingRequest2);
        investmentLendingRequest1.setId(null);
        assertThat(investmentLendingRequest1).isNotEqualTo(investmentLendingRequest2);
    }
}
