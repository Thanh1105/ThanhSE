package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.InvestmentLendingRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InvestmentLendingRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvestmentLendingRequestRepository extends JpaRepository<InvestmentLendingRequest, Long> {}
