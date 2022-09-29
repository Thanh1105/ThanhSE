package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Indentification;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Indentification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IndentificationRepository extends JpaRepository<Indentification, Long> {}
