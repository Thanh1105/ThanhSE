package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LendingCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LendingCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LendingCategoryRepository extends JpaRepository<LendingCategory, Long> {}
