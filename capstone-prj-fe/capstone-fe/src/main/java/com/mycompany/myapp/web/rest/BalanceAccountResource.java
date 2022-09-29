package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.BalanceAccount;
import com.mycompany.myapp.repository.BalanceAccountRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.BalanceAccount}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BalanceAccountResource {

    private final Logger log = LoggerFactory.getLogger(BalanceAccountResource.class);

    private static final String ENTITY_NAME = "balanceAccount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BalanceAccountRepository balanceAccountRepository;

    public BalanceAccountResource(BalanceAccountRepository balanceAccountRepository) {
        this.balanceAccountRepository = balanceAccountRepository;
    }

    /**
     * {@code POST  /balance-accounts} : Create a new balanceAccount.
     *
     * @param balanceAccount the balanceAccount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new balanceAccount, or with status {@code 400 (Bad Request)} if the balanceAccount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/balance-accounts")
    public ResponseEntity<BalanceAccount> createBalanceAccount(@RequestBody BalanceAccount balanceAccount) throws URISyntaxException {
        log.debug("REST request to save BalanceAccount : {}", balanceAccount);
        if (balanceAccount.getId() != null) {
            throw new BadRequestAlertException("A new balanceAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BalanceAccount result = balanceAccountRepository.save(balanceAccount);
        return ResponseEntity
            .created(new URI("/api/balance-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /balance-accounts/:id} : Updates an existing balanceAccount.
     *
     * @param id the id of the balanceAccount to save.
     * @param balanceAccount the balanceAccount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated balanceAccount,
     * or with status {@code 400 (Bad Request)} if the balanceAccount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the balanceAccount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/balance-accounts/{id}")
    public ResponseEntity<BalanceAccount> updateBalanceAccount(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BalanceAccount balanceAccount
    ) throws URISyntaxException {
        log.debug("REST request to update BalanceAccount : {}, {}", id, balanceAccount);
        if (balanceAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, balanceAccount.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!balanceAccountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        BalanceAccount result = balanceAccountRepository.save(balanceAccount);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, balanceAccount.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /balance-accounts/:id} : Partial updates given fields of an existing balanceAccount, field will ignore if it is null
     *
     * @param id the id of the balanceAccount to save.
     * @param balanceAccount the balanceAccount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated balanceAccount,
     * or with status {@code 400 (Bad Request)} if the balanceAccount is not valid,
     * or with status {@code 404 (Not Found)} if the balanceAccount is not found,
     * or with status {@code 500 (Internal Server Error)} if the balanceAccount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/balance-accounts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BalanceAccount> partialUpdateBalanceAccount(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BalanceAccount balanceAccount
    ) throws URISyntaxException {
        log.debug("REST request to partial update BalanceAccount partially : {}, {}", id, balanceAccount);
        if (balanceAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, balanceAccount.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!balanceAccountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BalanceAccount> result = balanceAccountRepository
            .findById(balanceAccount.getId())
            .map(existingBalanceAccount -> {
                if (balanceAccount.getType() != null) {
                    existingBalanceAccount.setType(balanceAccount.getType());
                }
                if (balanceAccount.getBalance() != null) {
                    existingBalanceAccount.setBalance(balanceAccount.getBalance());
                }

                return existingBalanceAccount;
            })
            .map(balanceAccountRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, balanceAccount.getId().toString())
        );
    }

    /**
     * {@code GET  /balance-accounts} : get all the balanceAccounts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of balanceAccounts in body.
     */
    @GetMapping("/balance-accounts")
    public List<BalanceAccount> getAllBalanceAccounts() {
        log.debug("REST request to get all BalanceAccounts");
        return balanceAccountRepository.findAll();
    }

    /**
     * {@code GET  /balance-accounts/:id} : get the "id" balanceAccount.
     *
     * @param id the id of the balanceAccount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the balanceAccount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/balance-accounts/{id}")
    public ResponseEntity<BalanceAccount> getBalanceAccount(@PathVariable Long id) {
        log.debug("REST request to get BalanceAccount : {}", id);
        Optional<BalanceAccount> balanceAccount = balanceAccountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(balanceAccount);
    }

    /**
     * {@code DELETE  /balance-accounts/:id} : delete the "id" balanceAccount.
     *
     * @param id the id of the balanceAccount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/balance-accounts/{id}")
    public ResponseEntity<Void> deleteBalanceAccount(@PathVariable Long id) {
        log.debug("REST request to delete BalanceAccount : {}", id);
        balanceAccountRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
