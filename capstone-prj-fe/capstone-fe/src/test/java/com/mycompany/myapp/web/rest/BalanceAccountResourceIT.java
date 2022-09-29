package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.BalanceAccount;
import com.mycompany.myapp.repository.BalanceAccountRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link BalanceAccountResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BalanceAccountResourceIT {

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;

    private static final Float DEFAULT_BALANCE = 1F;
    private static final Float UPDATED_BALANCE = 2F;

    private static final String ENTITY_API_URL = "/api/balance-accounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BalanceAccountRepository balanceAccountRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBalanceAccountMockMvc;

    private BalanceAccount balanceAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BalanceAccount createEntity(EntityManager em) {
        BalanceAccount balanceAccount = new BalanceAccount().type(DEFAULT_TYPE).balance(DEFAULT_BALANCE);
        return balanceAccount;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BalanceAccount createUpdatedEntity(EntityManager em) {
        BalanceAccount balanceAccount = new BalanceAccount().type(UPDATED_TYPE).balance(UPDATED_BALANCE);
        return balanceAccount;
    }

    @BeforeEach
    public void initTest() {
        balanceAccount = createEntity(em);
    }

    @Test
    @Transactional
    void createBalanceAccount() throws Exception {
        int databaseSizeBeforeCreate = balanceAccountRepository.findAll().size();
        // Create the BalanceAccount
        restBalanceAccountMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(balanceAccount))
            )
            .andExpect(status().isCreated());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeCreate + 1);
        BalanceAccount testBalanceAccount = balanceAccountList.get(balanceAccountList.size() - 1);
        assertThat(testBalanceAccount.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBalanceAccount.getBalance()).isEqualTo(DEFAULT_BALANCE);
    }

    @Test
    @Transactional
    void createBalanceAccountWithExistingId() throws Exception {
        // Create the BalanceAccount with an existing ID
        balanceAccount.setId(1L);

        int databaseSizeBeforeCreate = balanceAccountRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBalanceAccountMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(balanceAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBalanceAccounts() throws Exception {
        // Initialize the database
        balanceAccountRepository.saveAndFlush(balanceAccount);

        // Get all the balanceAccountList
        restBalanceAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(balanceAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.doubleValue())));
    }

    @Test
    @Transactional
    void getBalanceAccount() throws Exception {
        // Initialize the database
        balanceAccountRepository.saveAndFlush(balanceAccount);

        // Get the balanceAccount
        restBalanceAccountMockMvc
            .perform(get(ENTITY_API_URL_ID, balanceAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(balanceAccount.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingBalanceAccount() throws Exception {
        // Get the balanceAccount
        restBalanceAccountMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewBalanceAccount() throws Exception {
        // Initialize the database
        balanceAccountRepository.saveAndFlush(balanceAccount);

        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();

        // Update the balanceAccount
        BalanceAccount updatedBalanceAccount = balanceAccountRepository.findById(balanceAccount.getId()).get();
        // Disconnect from session so that the updates on updatedBalanceAccount are not directly saved in db
        em.detach(updatedBalanceAccount);
        updatedBalanceAccount.type(UPDATED_TYPE).balance(UPDATED_BALANCE);

        restBalanceAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBalanceAccount.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBalanceAccount))
            )
            .andExpect(status().isOk());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
        BalanceAccount testBalanceAccount = balanceAccountList.get(balanceAccountList.size() - 1);
        assertThat(testBalanceAccount.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBalanceAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void putNonExistingBalanceAccount() throws Exception {
        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();
        balanceAccount.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBalanceAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, balanceAccount.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(balanceAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBalanceAccount() throws Exception {
        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();
        balanceAccount.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBalanceAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(balanceAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBalanceAccount() throws Exception {
        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();
        balanceAccount.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBalanceAccountMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(balanceAccount)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBalanceAccountWithPatch() throws Exception {
        // Initialize the database
        balanceAccountRepository.saveAndFlush(balanceAccount);

        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();

        // Update the balanceAccount using partial update
        BalanceAccount partialUpdatedBalanceAccount = new BalanceAccount();
        partialUpdatedBalanceAccount.setId(balanceAccount.getId());

        partialUpdatedBalanceAccount.balance(UPDATED_BALANCE);

        restBalanceAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBalanceAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBalanceAccount))
            )
            .andExpect(status().isOk());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
        BalanceAccount testBalanceAccount = balanceAccountList.get(balanceAccountList.size() - 1);
        assertThat(testBalanceAccount.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBalanceAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void fullUpdateBalanceAccountWithPatch() throws Exception {
        // Initialize the database
        balanceAccountRepository.saveAndFlush(balanceAccount);

        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();

        // Update the balanceAccount using partial update
        BalanceAccount partialUpdatedBalanceAccount = new BalanceAccount();
        partialUpdatedBalanceAccount.setId(balanceAccount.getId());

        partialUpdatedBalanceAccount.type(UPDATED_TYPE).balance(UPDATED_BALANCE);

        restBalanceAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBalanceAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBalanceAccount))
            )
            .andExpect(status().isOk());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
        BalanceAccount testBalanceAccount = balanceAccountList.get(balanceAccountList.size() - 1);
        assertThat(testBalanceAccount.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBalanceAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void patchNonExistingBalanceAccount() throws Exception {
        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();
        balanceAccount.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBalanceAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, balanceAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(balanceAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBalanceAccount() throws Exception {
        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();
        balanceAccount.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBalanceAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(balanceAccount))
            )
            .andExpect(status().isBadRequest());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBalanceAccount() throws Exception {
        int databaseSizeBeforeUpdate = balanceAccountRepository.findAll().size();
        balanceAccount.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBalanceAccountMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(balanceAccount))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the BalanceAccount in the database
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBalanceAccount() throws Exception {
        // Initialize the database
        balanceAccountRepository.saveAndFlush(balanceAccount);

        int databaseSizeBeforeDelete = balanceAccountRepository.findAll().size();

        // Delete the balanceAccount
        restBalanceAccountMockMvc
            .perform(delete(ENTITY_API_URL_ID, balanceAccount.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BalanceAccount> balanceAccountList = balanceAccountRepository.findAll();
        assertThat(balanceAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
