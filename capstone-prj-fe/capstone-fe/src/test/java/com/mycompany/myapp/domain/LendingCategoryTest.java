package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LendingCategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LendingCategory.class);
        LendingCategory lendingCategory1 = new LendingCategory();
        lendingCategory1.setId(1L);
        LendingCategory lendingCategory2 = new LendingCategory();
        lendingCategory2.setId(lendingCategory1.getId());
        assertThat(lendingCategory1).isEqualTo(lendingCategory2);
        lendingCategory2.setId(2L);
        assertThat(lendingCategory1).isNotEqualTo(lendingCategory2);
        lendingCategory1.setId(null);
        assertThat(lendingCategory1).isNotEqualTo(lendingCategory2);
    }
}
