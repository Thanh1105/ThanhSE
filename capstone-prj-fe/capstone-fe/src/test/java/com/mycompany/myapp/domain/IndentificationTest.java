package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class IndentificationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Indentification.class);
        Indentification indentification1 = new Indentification();
        indentification1.setId(1L);
        Indentification indentification2 = new Indentification();
        indentification2.setId(indentification1.getId());
        assertThat(indentification1).isEqualTo(indentification2);
        indentification2.setId(2L);
        assertThat(indentification1).isNotEqualTo(indentification2);
        indentification1.setId(null);
        assertThat(indentification1).isNotEqualTo(indentification2);
    }
}
