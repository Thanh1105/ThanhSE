package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InvestmentRequestTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvestmentRequest.class);
        InvestmentRequest investmentRequest1 = new InvestmentRequest();
        investmentRequest1.setId(1L);
        InvestmentRequest investmentRequest2 = new InvestmentRequest();
        investmentRequest2.setId(investmentRequest1.getId());
        assertThat(investmentRequest1).isEqualTo(investmentRequest2);
        investmentRequest2.setId(2L);
        assertThat(investmentRequest1).isNotEqualTo(investmentRequest2);
        investmentRequest1.setId(null);
        assertThat(investmentRequest1).isNotEqualTo(investmentRequest2);
    }
}
