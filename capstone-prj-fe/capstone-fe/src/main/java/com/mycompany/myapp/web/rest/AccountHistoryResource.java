package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.AccountHistory;
import com.mycompany.myapp.repository.AccountHistoryRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.AccountHistory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AccountHistoryResource {

    private final Logger log = LoggerFactory.getLogger(AccountHistoryResource.class);

    private static final String ENTITY_NAME = "accountHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccountHistoryRepository accountHistoryRepository;

    public AccountHistoryResource(AccountHistoryRepository accountHistoryRepository) {
        this.accountHistoryRepository = accountHistoryRepository;
    }

    /**
     * {@code POST  /account-histories} : Create a new accountHistory.
     *
     * @param accountHistory the accountHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accountHistory, or with status {@code 400 (Bad Request)} if the accountHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/account-histories")
    public ResponseEntity<AccountHistory> createAccountHistory(@RequestBody AccountHistory accountHistory) throws URISyntaxException {
        log.debug("REST request to save AccountHistory : {}", accountHistory);
        if (accountHistory.getId() != null) {
            throw new BadRequestAlertException("A new accountHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountHistory result = accountHistoryRepository.save(accountHistory);
        return ResponseEntity
            .created(new URI("/api/account-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /account-histories/:id} : Updates an existing accountHistory.
     *
     * @param id the id of the accountHistory to save.
     * @param accountHistory the accountHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountHistory,
     * or with status {@code 400 (Bad Request)} if the accountHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accountHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/account-histories/{id}")
    public ResponseEntity<AccountHistory> updateAccountHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountHistory accountHistory
    ) throws URISyntaxException {
        log.debug("REST request to update AccountHistory : {}, {}", id, accountHistory);
        if (accountHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountHistory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountHistoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AccountHistory result = accountHistoryRepository.save(accountHistory);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /account-histories/:id} : Partial updates given fields of an existing accountHistory, field will ignore if it is null
     *
     * @param id the id of the accountHistory to save.
     * @param accountHistory the accountHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountHistory,
     * or with status {@code 400 (Bad Request)} if the accountHistory is not valid,
     * or with status {@code 404 (Not Found)} if the accountHistory is not found,
     * or with status {@code 500 (Internal Server Error)} if the accountHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/account-histories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AccountHistory> partialUpdateAccountHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountHistory accountHistory
    ) throws URISyntaxException {
        log.debug("REST request to partial update AccountHistory partially : {}, {}", id, accountHistory);
        if (accountHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountHistory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountHistoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AccountHistory> result = accountHistoryRepository
            .findById(accountHistory.getId())
            .map(existingAccountHistory -> {
                if (accountHistory.getTransactionName() != null) {
                    existingAccountHistory.setTransactionName(accountHistory.getTransactionName());
                }
                if (accountHistory.getAmount() != null) {
                    existingAccountHistory.setAmount(accountHistory.getAmount());
                }
                if (accountHistory.getSenderId() != null) {
                    existingAccountHistory.setSenderId(accountHistory.getSenderId());
                }
                if (accountHistory.getReceiverId() != null) {
                    existingAccountHistory.setReceiverId(accountHistory.getReceiverId());
                }
                if (accountHistory.getType() != null) {
                    existingAccountHistory.setType(accountHistory.getType());
                }
                if (accountHistory.getStatus() != null) {
                    existingAccountHistory.setStatus(accountHistory.getStatus());
                }
                if (accountHistory.getNote() != null) {
                    existingAccountHistory.setNote(accountHistory.getNote());
                }

                return existingAccountHistory;
            })
            .map(accountHistoryRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountHistory.getId().toString())
        );
    }

    /**
     * {@code GET  /account-histories} : get all the accountHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accountHistories in body.
     */
    @GetMapping("/account-histories")
    public List<AccountHistory> getAllAccountHistories() {
        log.debug("REST request to get all AccountHistories");
        return accountHistoryRepository.findAll();
    }

    /**
     * {@code GET  /account-histories/:id} : get the "id" accountHistory.
     *
     * @param id the id of the accountHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accountHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/account-histories/{id}")
    public ResponseEntity<AccountHistory> getAccountHistory(@PathVariable Long id) {
        log.debug("REST request to get AccountHistory : {}", id);
        Optional<AccountHistory> accountHistory = accountHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountHistory);
    }

    /**
     * {@code DELETE  /account-histories/:id} : delete the "id" accountHistory.
     *
     * @param id the id of the accountHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/account-histories/{id}")
    public ResponseEntity<Void> deleteAccountHistory(@PathVariable Long id) {
        log.debug("REST request to delete AccountHistory : {}", id);
        accountHistoryRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
