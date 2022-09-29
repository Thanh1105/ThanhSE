package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.InvestmentLendingRequest;
import com.mycompany.myapp.repository.InvestmentLendingRequestRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.InvestmentLendingRequest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InvestmentLendingRequestResource {

    private final Logger log = LoggerFactory.getLogger(InvestmentLendingRequestResource.class);

    private static final String ENTITY_NAME = "investmentLendingRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvestmentLendingRequestRepository investmentLendingRequestRepository;

    public InvestmentLendingRequestResource(InvestmentLendingRequestRepository investmentLendingRequestRepository) {
        this.investmentLendingRequestRepository = investmentLendingRequestRepository;
    }

    /**
     * {@code POST  /investment-lending-requests} : Create a new investmentLendingRequest.
     *
     * @param investmentLendingRequest the investmentLendingRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new investmentLendingRequest, or with status {@code 400 (Bad Request)} if the investmentLendingRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/investment-lending-requests")
    public ResponseEntity<InvestmentLendingRequest> createInvestmentLendingRequest(
        @RequestBody InvestmentLendingRequest investmentLendingRequest
    ) throws URISyntaxException {
        log.debug("REST request to save InvestmentLendingRequest : {}", investmentLendingRequest);
        if (investmentLendingRequest.getId() != null) {
            throw new BadRequestAlertException("A new investmentLendingRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvestmentLendingRequest result = investmentLendingRequestRepository.save(investmentLendingRequest);
        return ResponseEntity
            .created(new URI("/api/investment-lending-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /investment-lending-requests/:id} : Updates an existing investmentLendingRequest.
     *
     * @param id the id of the investmentLendingRequest to save.
     * @param investmentLendingRequest the investmentLendingRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated investmentLendingRequest,
     * or with status {@code 400 (Bad Request)} if the investmentLendingRequest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the investmentLendingRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/investment-lending-requests/{id}")
    public ResponseEntity<InvestmentLendingRequest> updateInvestmentLendingRequest(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InvestmentLendingRequest investmentLendingRequest
    ) throws URISyntaxException {
        log.debug("REST request to update InvestmentLendingRequest : {}, {}", id, investmentLendingRequest);
        if (investmentLendingRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, investmentLendingRequest.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!investmentLendingRequestRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InvestmentLendingRequest result = investmentLendingRequestRepository.save(investmentLendingRequest);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, investmentLendingRequest.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /investment-lending-requests/:id} : Partial updates given fields of an existing investmentLendingRequest, field will ignore if it is null
     *
     * @param id the id of the investmentLendingRequest to save.
     * @param investmentLendingRequest the investmentLendingRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated investmentLendingRequest,
     * or with status {@code 400 (Bad Request)} if the investmentLendingRequest is not valid,
     * or with status {@code 404 (Not Found)} if the investmentLendingRequest is not found,
     * or with status {@code 500 (Internal Server Error)} if the investmentLendingRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/investment-lending-requests/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InvestmentLendingRequest> partialUpdateInvestmentLendingRequest(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InvestmentLendingRequest investmentLendingRequest
    ) throws URISyntaxException {
        log.debug("REST request to partial update InvestmentLendingRequest partially : {}, {}", id, investmentLendingRequest);
        if (investmentLendingRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, investmentLendingRequest.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!investmentLendingRequestRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InvestmentLendingRequest> result = investmentLendingRequestRepository
            .findById(investmentLendingRequest.getId())
            .map(existingInvestmentLendingRequest -> {
                if (investmentLendingRequest.getStatus() != null) {
                    existingInvestmentLendingRequest.setStatus(investmentLendingRequest.getStatus());
                }

                return existingInvestmentLendingRequest;
            })
            .map(investmentLendingRequestRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, investmentLendingRequest.getId().toString())
        );
    }

    /**
     * {@code GET  /investment-lending-requests} : get all the investmentLendingRequests.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of investmentLendingRequests in body.
     */
    @GetMapping("/investment-lending-requests")
    public List<InvestmentLendingRequest> getAllInvestmentLendingRequests() {
        log.debug("REST request to get all InvestmentLendingRequests");
        return investmentLendingRequestRepository.findAll();
    }

    /**
     * {@code GET  /investment-lending-requests/:id} : get the "id" investmentLendingRequest.
     *
     * @param id the id of the investmentLendingRequest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the investmentLendingRequest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/investment-lending-requests/{id}")
    public ResponseEntity<InvestmentLendingRequest> getInvestmentLendingRequest(@PathVariable Long id) {
        log.debug("REST request to get InvestmentLendingRequest : {}", id);
        Optional<InvestmentLendingRequest> investmentLendingRequest = investmentLendingRequestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(investmentLendingRequest);
    }

    /**
     * {@code DELETE  /investment-lending-requests/:id} : delete the "id" investmentLendingRequest.
     *
     * @param id the id of the investmentLendingRequest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/investment-lending-requests/{id}")
    public ResponseEntity<Void> deleteInvestmentLendingRequest(@PathVariable Long id) {
        log.debug("REST request to delete InvestmentLendingRequest : {}", id);
        investmentLendingRequestRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
