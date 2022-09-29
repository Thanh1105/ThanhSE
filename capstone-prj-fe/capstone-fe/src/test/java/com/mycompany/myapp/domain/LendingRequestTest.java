package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LendingRequestTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LendingRequest.class);
        LendingRequest lendingRequest1 = new LendingRequest();
        lendingRequest1.setId(1L);
        LendingRequest lendingRequest2 = new LendingRequest();
        lendingRequest2.setId(lendingRequest1.getId());
        assertThat(lendingRequest1).isEqualTo(lendingRequest2);
        lendingRequest2.setId(2L);
        assertThat(lendingRequest1).isNotEqualTo(lendingRequest2);
        lendingRequest1.setId(null);
        assertThat(lendingRequest1).isNotEqualTo(lendingRequest2);
    }
}
