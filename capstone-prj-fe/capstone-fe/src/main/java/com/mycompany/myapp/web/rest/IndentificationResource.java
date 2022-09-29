package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Indentification;
import com.mycompany.myapp.repository.IndentificationRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Indentification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IndentificationResource {

    private final Logger log = LoggerFactory.getLogger(IndentificationResource.class);

    private static final String ENTITY_NAME = "indentification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IndentificationRepository indentificationRepository;

    public IndentificationResource(IndentificationRepository indentificationRepository) {
        this.indentificationRepository = indentificationRepository;
    }

    /**
     * {@code POST  /indentifications} : Create a new indentification.
     *
     * @param indentification the indentification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new indentification, or with status {@code 400 (Bad Request)} if the indentification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/indentifications")
    public ResponseEntity<Indentification> createIndentification(@RequestBody Indentification indentification) throws URISyntaxException {
        log.debug("REST request to save Indentification : {}", indentification);
        if (indentification.getId() != null) {
            throw new BadRequestAlertException("A new indentification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Indentification result = indentificationRepository.save(indentification);
        return ResponseEntity
            .created(new URI("/api/indentifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /indentifications/:id} : Updates an existing indentification.
     *
     * @param id the id of the indentification to save.
     * @param indentification the indentification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated indentification,
     * or with status {@code 400 (Bad Request)} if the indentification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the indentification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/indentifications/{id}")
    public ResponseEntity<Indentification> updateIndentification(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Indentification indentification
    ) throws URISyntaxException {
        log.debug("REST request to update Indentification : {}, {}", id, indentification);
        if (indentification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, indentification.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!indentificationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Indentification result = indentificationRepository.save(indentification);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, indentification.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /indentifications/:id} : Partial updates given fields of an existing indentification, field will ignore if it is null
     *
     * @param id the id of the indentification to save.
     * @param indentification the indentification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated indentification,
     * or with status {@code 400 (Bad Request)} if the indentification is not valid,
     * or with status {@code 404 (Not Found)} if the indentification is not found,
     * or with status {@code 500 (Internal Server Error)} if the indentification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/indentifications/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Indentification> partialUpdateIndentification(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Indentification indentification
    ) throws URISyntaxException {
        log.debug("REST request to partial update Indentification partially : {}, {}", id, indentification);
        if (indentification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, indentification.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!indentificationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Indentification> result = indentificationRepository
            .findById(indentification.getId())
            .map(existingIndentification -> {
                if (indentification.getIndentifyCard1() != null) {
                    existingIndentification.setIndentifyCard1(indentification.getIndentifyCard1());
                }
                if (indentification.getIndentifyCard2() != null) {
                    existingIndentification.setIndentifyCard2(indentification.getIndentifyCard2());
                }
                if (indentification.getDrivingLicense1() != null) {
                    existingIndentification.setDrivingLicense1(indentification.getDrivingLicense1());
                }
                if (indentification.getDrivingLicense2() != null) {
                    existingIndentification.setDrivingLicense2(indentification.getDrivingLicense2());
                }
                if (indentification.getStatus() != null) {
                    existingIndentification.setStatus(indentification.getStatus());
                }

                return existingIndentification;
            })
            .map(indentificationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, indentification.getId().toString())
        );
    }

    /**
     * {@code GET  /indentifications} : get all the indentifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of indentifications in body.
     */
    @GetMapping("/indentifications")
    public List<Indentification> getAllIndentifications() {
        log.debug("REST request to get all Indentifications");
        return indentificationRepository.findAll();
    }

    /**
     * {@code GET  /indentifications/:id} : get the "id" indentification.
     *
     * @param id the id of the indentification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the indentification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/indentifications/{id}")
    public ResponseEntity<Indentification> getIndentification(@PathVariable Long id) {
        log.debug("REST request to get Indentification : {}", id);
        Optional<Indentification> indentification = indentificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(indentification);
    }

    /**
     * {@code DELETE  /indentifications/:id} : delete the "id" indentification.
     *
     * @param id the id of the indentification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/indentifications/{id}")
    public ResponseEntity<Void> deleteIndentification(@PathVariable Long id) {
        log.debug("REST request to delete Indentification : {}", id);
        indentificationRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
