package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.InvestmentRequest;
import com.mycompany.myapp.repository.InvestmentRequestRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.InvestmentRequest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InvestmentRequestResource {

    private final Logger log = LoggerFactory.getLogger(InvestmentRequestResource.class);

    private static final String ENTITY_NAME = "investmentRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvestmentRequestRepository investmentRequestRepository;

    public InvestmentRequestResource(InvestmentRequestRepository investmentRequestRepository) {
        this.investmentRequestRepository = investmentRequestRepository;
    }

    /**
     * {@code POST  /investment-requests} : Create a new investmentRequest.
     *
     * @param investmentRequest the investmentRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new investmentRequest, or with status {@code 400 (Bad Request)} if the investmentRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/investment-requests")
    public ResponseEntity<InvestmentRequest> createInvestmentRequest(@RequestBody InvestmentRequest investmentRequest)
        throws URISyntaxException {
        log.debug("REST request to save InvestmentRequest : {}", investmentRequest);
        if (investmentRequest.getId() != null) {
            throw new BadRequestAlertException("A new investmentRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvestmentRequest result = investmentRequestRepository.save(investmentRequest);
        return ResponseEntity
            .created(new URI("/api/investment-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /investment-requests/:id} : Updates an existing investmentRequest.
     *
     * @param id the id of the investmentRequest to save.
     * @param investmentRequest the investmentRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated investmentRequest,
     * or with status {@code 400 (Bad Request)} if the investmentRequest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the investmentRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/investment-requests/{id}")
    public ResponseEntity<InvestmentRequest> updateInvestmentRequest(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InvestmentRequest investmentRequest
    ) throws URISyntaxException {
        log.debug("REST request to update InvestmentRequest : {}, {}", id, investmentRequest);
        if (investmentRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, investmentRequest.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!investmentRequestRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InvestmentRequest result = investmentRequestRepository.save(investmentRequest);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, investmentRequest.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /investment-requests/:id} : Partial updates given fields of an existing investmentRequest, field will ignore if it is null
     *
     * @param id the id of the investmentRequest to save.
     * @param investmentRequest the investmentRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated investmentRequest,
     * or with status {@code 400 (Bad Request)} if the investmentRequest is not valid,
     * or with status {@code 404 (Not Found)} if the investmentRequest is not found,
     * or with status {@code 500 (Internal Server Error)} if the investmentRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/investment-requests/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InvestmentRequest> partialUpdateInvestmentRequest(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InvestmentRequest investmentRequest
    ) throws URISyntaxException {
        log.debug("REST request to partial update InvestmentRequest partially : {}, {}", id, investmentRequest);
        if (investmentRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, investmentRequest.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!investmentRequestRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InvestmentRequest> result = investmentRequestRepository
            .findById(investmentRequest.getId())
            .map(existingInvestmentRequest -> {
                if (investmentRequest.getAmount() != null) {
                    existingInvestmentRequest.setAmount(investmentRequest.getAmount());
                }
                if (investmentRequest.getDiscount() != null) {
                    existingInvestmentRequest.setDiscount(investmentRequest.getDiscount());
                }
                if (investmentRequest.getActuallyReceived() != null) {
                    existingInvestmentRequest.setActuallyReceived(investmentRequest.getActuallyReceived());
                }

                return existingInvestmentRequest;
            })
            .map(investmentRequestRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, investmentRequest.getId().toString())
        );
    }

    /**
     * {@code GET  /investment-requests} : get all the investmentRequests.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of investmentRequests in body.
     */
    @GetMapping("/investment-requests")
    public List<InvestmentRequest> getAllInvestmentRequests() {
        log.debug("REST request to get all InvestmentRequests");
        return investmentRequestRepository.findAll();
    }

    /**
     * {@code GET  /investment-requests/:id} : get the "id" investmentRequest.
     *
     * @param id the id of the investmentRequest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the investmentRequest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/investment-requests/{id}")
    public ResponseEntity<InvestmentRequest> getInvestmentRequest(@PathVariable Long id) {
        log.debug("REST request to get InvestmentRequest : {}", id);
        Optional<InvestmentRequest> investmentRequest = investmentRequestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(investmentRequest);
    }

    /**
     * {@code DELETE  /investment-requests/:id} : delete the "id" investmentRequest.
     *
     * @param id the id of the investmentRequest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/investment-requests/{id}")
    public ResponseEntity<Void> deleteInvestmentRequest(@PathVariable Long id) {
        log.debug("REST request to delete InvestmentRequest : {}", id);
        investmentRequestRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
