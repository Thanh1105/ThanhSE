package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.LendingRequest;
import com.mycompany.myapp.repository.LendingRequestRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.LendingRequest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LendingRequestResource {

    private final Logger log = LoggerFactory.getLogger(LendingRequestResource.class);

    private static final String ENTITY_NAME = "lendingRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LendingRequestRepository lendingRequestRepository;

    public LendingRequestResource(LendingRequestRepository lendingRequestRepository) {
        this.lendingRequestRepository = lendingRequestRepository;
    }

    /**
     * {@code POST  /lending-requests} : Create a new lendingRequest.
     *
     * @param lendingRequest the lendingRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lendingRequest, or with status {@code 400 (Bad Request)} if the lendingRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lending-requests")
    public ResponseEntity<LendingRequest> createLendingRequest(@RequestBody LendingRequest lendingRequest) throws URISyntaxException {
        log.debug("REST request to save LendingRequest : {}", lendingRequest);
        if (lendingRequest.getId() != null) {
            throw new BadRequestAlertException("A new lendingRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LendingRequest result = lendingRequestRepository.save(lendingRequest);
        return ResponseEntity
            .created(new URI("/api/lending-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lending-requests/:id} : Updates an existing lendingRequest.
     *
     * @param id the id of the lendingRequest to save.
     * @param lendingRequest the lendingRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lendingRequest,
     * or with status {@code 400 (Bad Request)} if the lendingRequest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lendingRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lending-requests/{id}")
    public ResponseEntity<LendingRequest> updateLendingRequest(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LendingRequest lendingRequest
    ) throws URISyntaxException {
        log.debug("REST request to update LendingRequest : {}, {}", id, lendingRequest);
        if (lendingRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lendingRequest.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lendingRequestRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LendingRequest result = lendingRequestRepository.save(lendingRequest);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lendingRequest.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lending-requests/:id} : Partial updates given fields of an existing lendingRequest, field will ignore if it is null
     *
     * @param id the id of the lendingRequest to save.
     * @param lendingRequest the lendingRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lendingRequest,
     * or with status {@code 400 (Bad Request)} if the lendingRequest is not valid,
     * or with status {@code 404 (Not Found)} if the lendingRequest is not found,
     * or with status {@code 500 (Internal Server Error)} if the lendingRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lending-requests/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LendingRequest> partialUpdateLendingRequest(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LendingRequest lendingRequest
    ) throws URISyntaxException {
        log.debug("REST request to partial update LendingRequest partially : {}, {}", id, lendingRequest);
        if (lendingRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lendingRequest.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lendingRequestRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LendingRequest> result = lendingRequestRepository
            .findById(lendingRequest.getId())
            .map(existingLendingRequest -> {
                if (lendingRequest.getLongId() != null) {
                    existingLendingRequest.setLongId(lendingRequest.getLongId());
                }
                if (lendingRequest.getDescription() != null) {
                    existingLendingRequest.setDescription(lendingRequest.getDescription());
                }
                if (lendingRequest.getTypeOfLending() != null) {
                    existingLendingRequest.setTypeOfLending(lendingRequest.getTypeOfLending());
                }
                if (lendingRequest.getMaxNumberOfInverstor() != null) {
                    existingLendingRequest.setMaxNumberOfInverstor(lendingRequest.getMaxNumberOfInverstor());
                }
                if (lendingRequest.getAvailableMoney() != null) {
                    existingLendingRequest.setAvailableMoney(lendingRequest.getAvailableMoney());
                }
                if (lendingRequest.getAmount() != null) {
                    existingLendingRequest.setAmount(lendingRequest.getAmount());
                }
                if (lendingRequest.getTotal() != null) {
                    existingLendingRequest.setTotal(lendingRequest.getTotal());
                }
                if (lendingRequest.getInterestRate() != null) {
                    existingLendingRequest.setInterestRate(lendingRequest.getInterestRate());
                }
                if (lendingRequest.getStartDate() != null) {
                    existingLendingRequest.setStartDate(lendingRequest.getStartDate());
                }
                if (lendingRequest.getEndDate() != null) {
                    existingLendingRequest.setEndDate(lendingRequest.getEndDate());
                }

                return existingLendingRequest;
            })
            .map(lendingRequestRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lendingRequest.getId().toString())
        );
    }

    /**
     * {@code GET  /lending-requests} : get all the lendingRequests.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lendingRequests in body.
     */
    @GetMapping("/lending-requests")
    public List<LendingRequest> getAllLendingRequests() {
        log.debug("REST request to get all LendingRequests");
        return lendingRequestRepository.findAll();
    }

    /**
     * {@code GET  /lending-requests/:id} : get the "id" lendingRequest.
     *
     * @param id the id of the lendingRequest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lendingRequest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lending-requests/{id}")
    public ResponseEntity<LendingRequest> getLendingRequest(@PathVariable Long id) {
        log.debug("REST request to get LendingRequest : {}", id);
        Optional<LendingRequest> lendingRequest = lendingRequestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lendingRequest);
    }

    /**
     * {@code DELETE  /lending-requests/:id} : delete the "id" lendingRequest.
     *
     * @param id the id of the lendingRequest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lending-requests/{id}")
    public ResponseEntity<Void> deleteLendingRequest(@PathVariable Long id) {
        log.debug("REST request to delete LendingRequest : {}", id);
        lendingRequestRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
