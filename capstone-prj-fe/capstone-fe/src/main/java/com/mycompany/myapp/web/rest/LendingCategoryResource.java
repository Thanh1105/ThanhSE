package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.LendingCategory;
import com.mycompany.myapp.repository.LendingCategoryRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.LendingCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LendingCategoryResource {

    private final Logger log = LoggerFactory.getLogger(LendingCategoryResource.class);

    private static final String ENTITY_NAME = "lendingCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LendingCategoryRepository lendingCategoryRepository;

    public LendingCategoryResource(LendingCategoryRepository lendingCategoryRepository) {
        this.lendingCategoryRepository = lendingCategoryRepository;
    }

    /**
     * {@code POST  /lending-categories} : Create a new lendingCategory.
     *
     * @param lendingCategory the lendingCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lendingCategory, or with status {@code 400 (Bad Request)} if the lendingCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lending-categories")
    public ResponseEntity<LendingCategory> createLendingCategory(@RequestBody LendingCategory lendingCategory) throws URISyntaxException {
        log.debug("REST request to save LendingCategory : {}", lendingCategory);
        if (lendingCategory.getId() != null) {
            throw new BadRequestAlertException("A new lendingCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LendingCategory result = lendingCategoryRepository.save(lendingCategory);
        return ResponseEntity
            .created(new URI("/api/lending-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lending-categories/:id} : Updates an existing lendingCategory.
     *
     * @param id the id of the lendingCategory to save.
     * @param lendingCategory the lendingCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lendingCategory,
     * or with status {@code 400 (Bad Request)} if the lendingCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lendingCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lending-categories/{id}")
    public ResponseEntity<LendingCategory> updateLendingCategory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LendingCategory lendingCategory
    ) throws URISyntaxException {
        log.debug("REST request to update LendingCategory : {}, {}", id, lendingCategory);
        if (lendingCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lendingCategory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lendingCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LendingCategory result = lendingCategoryRepository.save(lendingCategory);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lendingCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lending-categories/:id} : Partial updates given fields of an existing lendingCategory, field will ignore if it is null
     *
     * @param id the id of the lendingCategory to save.
     * @param lendingCategory the lendingCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lendingCategory,
     * or with status {@code 400 (Bad Request)} if the lendingCategory is not valid,
     * or with status {@code 404 (Not Found)} if the lendingCategory is not found,
     * or with status {@code 500 (Internal Server Error)} if the lendingCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lending-categories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LendingCategory> partialUpdateLendingCategory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LendingCategory lendingCategory
    ) throws URISyntaxException {
        log.debug("REST request to partial update LendingCategory partially : {}, {}", id, lendingCategory);
        if (lendingCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lendingCategory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lendingCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LendingCategory> result = lendingCategoryRepository
            .findById(lendingCategory.getId())
            .map(existingLendingCategory -> {
                return existingLendingCategory;
            })
            .map(lendingCategoryRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lendingCategory.getId().toString())
        );
    }

    /**
     * {@code GET  /lending-categories} : get all the lendingCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lendingCategories in body.
     */
    @GetMapping("/lending-categories")
    public List<LendingCategory> getAllLendingCategories() {
        log.debug("REST request to get all LendingCategories");
        return lendingCategoryRepository.findAll();
    }

    /**
     * {@code GET  /lending-categories/:id} : get the "id" lendingCategory.
     *
     * @param id the id of the lendingCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lendingCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lending-categories/{id}")
    public ResponseEntity<LendingCategory> getLendingCategory(@PathVariable Long id) {
        log.debug("REST request to get LendingCategory : {}", id);
        Optional<LendingCategory> lendingCategory = lendingCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lendingCategory);
    }

    /**
     * {@code DELETE  /lending-categories/:id} : delete the "id" lendingCategory.
     *
     * @param id the id of the lendingCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lending-categories/{id}")
    public ResponseEntity<Void> deleteLendingCategory(@PathVariable Long id) {
        log.debug("REST request to delete LendingCategory : {}", id);
        lendingCategoryRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
