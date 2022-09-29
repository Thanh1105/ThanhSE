package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.NotificationToken;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NotificationToken entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationTokenRepository extends JpaRepository<NotificationToken, Long> {}
