package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LendingRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LendingRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LendingRequestRepository extends JpaRepository<LendingRequest, Long> {}
