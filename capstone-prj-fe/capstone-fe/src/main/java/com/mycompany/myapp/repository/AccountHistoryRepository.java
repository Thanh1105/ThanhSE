package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AccountHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AccountHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountHistoryRepository extends JpaRepository<AccountHistory, Long> {}
