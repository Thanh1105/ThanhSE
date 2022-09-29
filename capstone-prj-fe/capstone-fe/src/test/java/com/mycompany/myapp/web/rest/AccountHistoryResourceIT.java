package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.AccountHistory;
import com.mycompany.myapp.repository.AccountHistoryRepository;
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
 * Integration tests for the {@link AccountHistoryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AccountHistoryResourceIT {

    private static final String DEFAULT_TRANSACTION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_AMOUNT = 1F;
    private static final Float UPDATED_AMOUNT = 2F;

    private static final Integer DEFAULT_SENDER_ID = 1;
    private static final Integer UPDATED_SENDER_ID = 2;

    private static final Integer DEFAULT_RECEIVER_ID = 1;
    private static final Integer UPDATED_RECEIVER_ID = 2;

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/account-histories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AccountHistoryRepository accountHistoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountHistoryMockMvc;

    private AccountHistory accountHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountHistory createEntity(EntityManager em) {
        AccountHistory accountHistory = new AccountHistory()
            .transactionName(DEFAULT_TRANSACTION_NAME)
            .amount(DEFAULT_AMOUNT)
            .senderId(DEFAULT_SENDER_ID)
            .receiverId(DEFAULT_RECEIVER_ID)
            .type(DEFAULT_TYPE)
            .status(DEFAULT_STATUS)
            .note(DEFAULT_NOTE);
        return accountHistory;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountHistory createUpdatedEntity(EntityManager em) {
        AccountHistory accountHistory = new AccountHistory()
            .transactionName(UPDATED_TRANSACTION_NAME)
            .amount(UPDATED_AMOUNT)
            .senderId(UPDATED_SENDER_ID)
            .receiverId(UPDATED_RECEIVER_ID)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS)
            .note(UPDATED_NOTE);
        return accountHistory;
    }

    @BeforeEach
    public void initTest() {
        accountHistory = createEntity(em);
    }

    @Test
    @Transactional
    void createAccountHistory() throws Exception {
        int databaseSizeBeforeCreate = accountHistoryRepository.findAll().size();
        // Create the AccountHistory
        restAccountHistoryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountHistory))
            )
            .andExpect(status().isCreated());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        AccountHistory testAccountHistory = accountHistoryList.get(accountHistoryList.size() - 1);
        assertThat(testAccountHistory.getTransactionName()).isEqualTo(DEFAULT_TRANSACTION_NAME);
        assertThat(testAccountHistory.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testAccountHistory.getSenderId()).isEqualTo(DEFAULT_SENDER_ID);
        assertThat(testAccountHistory.getReceiverId()).isEqualTo(DEFAULT_RECEIVER_ID);
        assertThat(testAccountHistory.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAccountHistory.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAccountHistory.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    void createAccountHistoryWithExistingId() throws Exception {
        // Create the AccountHistory with an existing ID
        accountHistory.setId(1L);

        int databaseSizeBeforeCreate = accountHistoryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountHistoryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountHistory))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAccountHistories() throws Exception {
        // Initialize the database
        accountHistoryRepository.saveAndFlush(accountHistory);

        // Get all the accountHistoryList
        restAccountHistoryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionName").value(hasItem(DEFAULT_TRANSACTION_NAME)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].senderId").value(hasItem(DEFAULT_SENDER_ID)))
            .andExpect(jsonPath("$.[*].receiverId").value(hasItem(DEFAULT_RECEIVER_ID)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE)));
    }

    @Test
    @Transactional
    void getAccountHistory() throws Exception {
        // Initialize the database
        accountHistoryRepository.saveAndFlush(accountHistory);

        // Get the accountHistory
        restAccountHistoryMockMvc
            .perform(get(ENTITY_API_URL_ID, accountHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountHistory.getId().intValue()))
            .andExpect(jsonPath("$.transactionName").value(DEFAULT_TRANSACTION_NAME))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.senderId").value(DEFAULT_SENDER_ID))
            .andExpect(jsonPath("$.receiverId").value(DEFAULT_RECEIVER_ID))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE));
    }

    @Test
    @Transactional
    void getNonExistingAccountHistory() throws Exception {
        // Get the accountHistory
        restAccountHistoryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAccountHistory() throws Exception {
        // Initialize the database
        accountHistoryRepository.saveAndFlush(accountHistory);

        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();

        // Update the accountHistory
        AccountHistory updatedAccountHistory = accountHistoryRepository.findById(accountHistory.getId()).get();
        // Disconnect from session so that the updates on updatedAccountHistory are not directly saved in db
        em.detach(updatedAccountHistory);
        updatedAccountHistory
            .transactionName(UPDATED_TRANSACTION_NAME)
            .amount(UPDATED_AMOUNT)
            .senderId(UPDATED_SENDER_ID)
            .receiverId(UPDATED_RECEIVER_ID)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS)
            .note(UPDATED_NOTE);

        restAccountHistoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAccountHistory.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAccountHistory))
            )
            .andExpect(status().isOk());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
        AccountHistory testAccountHistory = accountHistoryList.get(accountHistoryList.size() - 1);
        assertThat(testAccountHistory.getTransactionName()).isEqualTo(UPDATED_TRANSACTION_NAME);
        assertThat(testAccountHistory.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testAccountHistory.getSenderId()).isEqualTo(UPDATED_SENDER_ID);
        assertThat(testAccountHistory.getReceiverId()).isEqualTo(UPDATED_RECEIVER_ID);
        assertThat(testAccountHistory.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAccountHistory.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAccountHistory.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    void putNonExistingAccountHistory() throws Exception {
        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();
        accountHistory.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountHistoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, accountHistory.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountHistory))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAccountHistory() throws Exception {
        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();
        accountHistory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountHistoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountHistory))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAccountHistory() throws Exception {
        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();
        accountHistory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountHistoryMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountHistory)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAccountHistoryWithPatch() throws Exception {
        // Initialize the database
        accountHistoryRepository.saveAndFlush(accountHistory);

        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();

        // Update the accountHistory using partial update
        AccountHistory partialUpdatedAccountHistory = new AccountHistory();
        partialUpdatedAccountHistory.setId(accountHistory.getId());

        partialUpdatedAccountHistory
            .transactionName(UPDATED_TRANSACTION_NAME)
            .amount(UPDATED_AMOUNT)
            .status(UPDATED_STATUS)
            .note(UPDATED_NOTE);

        restAccountHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountHistory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountHistory))
            )
            .andExpect(status().isOk());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
        AccountHistory testAccountHistory = accountHistoryList.get(accountHistoryList.size() - 1);
        assertThat(testAccountHistory.getTransactionName()).isEqualTo(UPDATED_TRANSACTION_NAME);
        assertThat(testAccountHistory.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testAccountHistory.getSenderId()).isEqualTo(DEFAULT_SENDER_ID);
        assertThat(testAccountHistory.getReceiverId()).isEqualTo(DEFAULT_RECEIVER_ID);
        assertThat(testAccountHistory.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAccountHistory.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAccountHistory.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    void fullUpdateAccountHistoryWithPatch() throws Exception {
        // Initialize the database
        accountHistoryRepository.saveAndFlush(accountHistory);

        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();

        // Update the accountHistory using partial update
        AccountHistory partialUpdatedAccountHistory = new AccountHistory();
        partialUpdatedAccountHistory.setId(accountHistory.getId());

        partialUpdatedAccountHistory
            .transactionName(UPDATED_TRANSACTION_NAME)
            .amount(UPDATED_AMOUNT)
            .senderId(UPDATED_SENDER_ID)
            .receiverId(UPDATED_RECEIVER_ID)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS)
            .note(UPDATED_NOTE);

        restAccountHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountHistory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountHistory))
            )
            .andExpect(status().isOk());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
        AccountHistory testAccountHistory = accountHistoryList.get(accountHistoryList.size() - 1);
        assertThat(testAccountHistory.getTransactionName()).isEqualTo(UPDATED_TRANSACTION_NAME);
        assertThat(testAccountHistory.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testAccountHistory.getSenderId()).isEqualTo(UPDATED_SENDER_ID);
        assertThat(testAccountHistory.getReceiverId()).isEqualTo(UPDATED_RECEIVER_ID);
        assertThat(testAccountHistory.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAccountHistory.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAccountHistory.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    void patchNonExistingAccountHistory() throws Exception {
        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();
        accountHistory.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, accountHistory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountHistory))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAccountHistory() throws Exception {
        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();
        accountHistory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountHistory))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAccountHistory() throws Exception {
        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();
        accountHistory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(accountHistory))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAccountHistory() throws Exception {
        // Initialize the database
        accountHistoryRepository.saveAndFlush(accountHistory);

        int databaseSizeBeforeDelete = accountHistoryRepository.findAll().size();

        // Delete the accountHistory
        restAccountHistoryMockMvc
            .perform(delete(ENTITY_API_URL_ID, accountHistory.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
