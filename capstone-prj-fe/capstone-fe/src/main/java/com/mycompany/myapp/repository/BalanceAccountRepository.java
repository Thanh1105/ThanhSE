package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.BalanceAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the BalanceAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BalanceAccountRepository extends JpaRepository<BalanceAccount, Long> {}
