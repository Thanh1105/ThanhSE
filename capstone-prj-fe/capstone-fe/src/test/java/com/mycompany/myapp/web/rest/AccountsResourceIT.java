package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Accounts;
import com.mycompany.myapp.repository.AccountsRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link AccountsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AccountsResourceIT {

    private static final String DEFAULT_GOOGLE_ID = "AAAAAAAAAA";
    private static final String UPDATED_GOOGLE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final Instant DEFAULT_BIRTH = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_BIRTH = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_GENDER = false;
    private static final Boolean UPDATED_GENDER = true;

    private static final Float DEFAULT_CREDIT_SCORE = 1F;
    private static final Float UPDATED_CREDIT_SCORE = 2F;

    private static final Float DEFAULT_AVERAGE_RATING = 1F;
    private static final Float UPDATED_AVERAGE_RATING = 2F;

    private static final Boolean DEFAULT_IS_SUPER_USER = false;
    private static final Boolean UPDATED_IS_SUPER_USER = true;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/accounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountsMockMvc;

    private Accounts accounts;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Accounts createEntity(EntityManager em) {
        Accounts accounts = new Accounts()
            .googleId(DEFAULT_GOOGLE_ID)
            .lastName(DEFAULT_LAST_NAME)
            .firstName(DEFAULT_FIRST_NAME)
            .password(DEFAULT_PASSWORD)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .birth(DEFAULT_BIRTH)
            .gender(DEFAULT_GENDER)
            .creditScore(DEFAULT_CREDIT_SCORE)
            .averageRating(DEFAULT_AVERAGE_RATING)
            .isSuperUser(DEFAULT_IS_SUPER_USER)
            .status(DEFAULT_STATUS);
        return accounts;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Accounts createUpdatedEntity(EntityManager em) {
        Accounts accounts = new Accounts()
            .googleId(UPDATED_GOOGLE_ID)
            .lastName(UPDATED_LAST_NAME)
            .firstName(UPDATED_FIRST_NAME)
            .password(UPDATED_PASSWORD)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .birth(UPDATED_BIRTH)
            .gender(UPDATED_GENDER)
            .creditScore(UPDATED_CREDIT_SCORE)
            .averageRating(UPDATED_AVERAGE_RATING)
            .isSuperUser(UPDATED_IS_SUPER_USER)
            .status(UPDATED_STATUS);
        return accounts;
    }

    @BeforeEach
    public void initTest() {
        accounts = createEntity(em);
    }

    @Test
    @Transactional
    void createAccounts() throws Exception {
        int databaseSizeBeforeCreate = accountsRepository.findAll().size();
        // Create the Accounts
        restAccountsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accounts)))
            .andExpect(status().isCreated());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeCreate + 1);
        Accounts testAccounts = accountsList.get(accountsList.size() - 1);
        assertThat(testAccounts.getGoogleId()).isEqualTo(DEFAULT_GOOGLE_ID);
        assertThat(testAccounts.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testAccounts.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testAccounts.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testAccounts.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testAccounts.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testAccounts.getBirth()).isEqualTo(DEFAULT_BIRTH);
        assertThat(testAccounts.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testAccounts.getCreditScore()).isEqualTo(DEFAULT_CREDIT_SCORE);
        assertThat(testAccounts.getAverageRating()).isEqualTo(DEFAULT_AVERAGE_RATING);
        assertThat(testAccounts.getIsSuperUser()).isEqualTo(DEFAULT_IS_SUPER_USER);
        assertThat(testAccounts.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createAccountsWithExistingId() throws Exception {
        // Create the Accounts with an existing ID
        accounts.setId(1L);

        int databaseSizeBeforeCreate = accountsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accounts)))
            .andExpect(status().isBadRequest());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAccounts() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);

        // Get all the accountsList
        restAccountsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accounts.getId().intValue())))
            .andExpect(jsonPath("$.[*].googleId").value(hasItem(DEFAULT_GOOGLE_ID)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].birth").value(hasItem(DEFAULT_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.booleanValue())))
            .andExpect(jsonPath("$.[*].creditScore").value(hasItem(DEFAULT_CREDIT_SCORE.doubleValue())))
            .andExpect(jsonPath("$.[*].averageRating").value(hasItem(DEFAULT_AVERAGE_RATING.doubleValue())))
            .andExpect(jsonPath("$.[*].isSuperUser").value(hasItem(DEFAULT_IS_SUPER_USER.booleanValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    void getAccounts() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);

        // Get the accounts
        restAccountsMockMvc
            .perform(get(ENTITY_API_URL_ID, accounts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accounts.getId().intValue()))
            .andExpect(jsonPath("$.googleId").value(DEFAULT_GOOGLE_ID))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.birth").value(DEFAULT_BIRTH.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.booleanValue()))
            .andExpect(jsonPath("$.creditScore").value(DEFAULT_CREDIT_SCORE.doubleValue()))
            .andExpect(jsonPath("$.averageRating").value(DEFAULT_AVERAGE_RATING.doubleValue()))
            .andExpect(jsonPath("$.isSuperUser").value(DEFAULT_IS_SUPER_USER.booleanValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingAccounts() throws Exception {
        // Get the accounts
        restAccountsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAccounts() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);

        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();

        // Update the accounts
        Accounts updatedAccounts = accountsRepository.findById(accounts.getId()).get();
        // Disconnect from session so that the updates on updatedAccounts are not directly saved in db
        em.detach(updatedAccounts);
        updatedAccounts
            .googleId(UPDATED_GOOGLE_ID)
            .lastName(UPDATED_LAST_NAME)
            .firstName(UPDATED_FIRST_NAME)
            .password(UPDATED_PASSWORD)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .birth(UPDATED_BIRTH)
            .gender(UPDATED_GENDER)
            .creditScore(UPDATED_CREDIT_SCORE)
            .averageRating(UPDATED_AVERAGE_RATING)
            .isSuperUser(UPDATED_IS_SUPER_USER)
            .status(UPDATED_STATUS);

        restAccountsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAccounts.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAccounts))
            )
            .andExpect(status().isOk());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
        Accounts testAccounts = accountsList.get(accountsList.size() - 1);
        assertThat(testAccounts.getGoogleId()).isEqualTo(UPDATED_GOOGLE_ID);
        assertThat(testAccounts.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testAccounts.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testAccounts.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testAccounts.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testAccounts.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testAccounts.getBirth()).isEqualTo(UPDATED_BIRTH);
        assertThat(testAccounts.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testAccounts.getCreditScore()).isEqualTo(UPDATED_CREDIT_SCORE);
        assertThat(testAccounts.getAverageRating()).isEqualTo(UPDATED_AVERAGE_RATING);
        assertThat(testAccounts.getIsSuperUser()).isEqualTo(UPDATED_IS_SUPER_USER);
        assertThat(testAccounts.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingAccounts() throws Exception {
        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();
        accounts.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, accounts.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accounts))
            )
            .andExpect(status().isBadRequest());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAccounts() throws Exception {
        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();
        accounts.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accounts))
            )
            .andExpect(status().isBadRequest());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAccounts() throws Exception {
        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();
        accounts.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accounts)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAccountsWithPatch() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);

        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();

        // Update the accounts using partial update
        Accounts partialUpdatedAccounts = new Accounts();
        partialUpdatedAccounts.setId(accounts.getId());

        partialUpdatedAccounts
            .googleId(UPDATED_GOOGLE_ID)
            .lastName(UPDATED_LAST_NAME)
            .firstName(UPDATED_FIRST_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .creditScore(UPDATED_CREDIT_SCORE);

        restAccountsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccounts.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccounts))
            )
            .andExpect(status().isOk());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
        Accounts testAccounts = accountsList.get(accountsList.size() - 1);
        assertThat(testAccounts.getGoogleId()).isEqualTo(UPDATED_GOOGLE_ID);
        assertThat(testAccounts.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testAccounts.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testAccounts.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testAccounts.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testAccounts.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testAccounts.getBirth()).isEqualTo(DEFAULT_BIRTH);
        assertThat(testAccounts.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testAccounts.getCreditScore()).isEqualTo(UPDATED_CREDIT_SCORE);
        assertThat(testAccounts.getAverageRating()).isEqualTo(DEFAULT_AVERAGE_RATING);
        assertThat(testAccounts.getIsSuperUser()).isEqualTo(DEFAULT_IS_SUPER_USER);
        assertThat(testAccounts.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateAccountsWithPatch() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);

        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();

        // Update the accounts using partial update
        Accounts partialUpdatedAccounts = new Accounts();
        partialUpdatedAccounts.setId(accounts.getId());

        partialUpdatedAccounts
            .googleId(UPDATED_GOOGLE_ID)
            .lastName(UPDATED_LAST_NAME)
            .firstName(UPDATED_FIRST_NAME)
            .password(UPDATED_PASSWORD)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .birth(UPDATED_BIRTH)
            .gender(UPDATED_GENDER)
            .creditScore(UPDATED_CREDIT_SCORE)
            .averageRating(UPDATED_AVERAGE_RATING)
            .isSuperUser(UPDATED_IS_SUPER_USER)
            .status(UPDATED_STATUS);

        restAccountsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccounts.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccounts))
            )
            .andExpect(status().isOk());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
        Accounts testAccounts = accountsList.get(accountsList.size() - 1);
        assertThat(testAccounts.getGoogleId()).isEqualTo(UPDATED_GOOGLE_ID);
        assertThat(testAccounts.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testAccounts.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testAccounts.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testAccounts.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testAccounts.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testAccounts.getBirth()).isEqualTo(UPDATED_BIRTH);
        assertThat(testAccounts.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testAccounts.getCreditScore()).isEqualTo(UPDATED_CREDIT_SCORE);
        assertThat(testAccounts.getAverageRating()).isEqualTo(UPDATED_AVERAGE_RATING);
        assertThat(testAccounts.getIsSuperUser()).isEqualTo(UPDATED_IS_SUPER_USER);
        assertThat(testAccounts.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingAccounts() throws Exception {
        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();
        accounts.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, accounts.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accounts))
            )
            .andExpect(status().isBadRequest());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAccounts() throws Exception {
        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();
        accounts.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accounts))
            )
            .andExpect(status().isBadRequest());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAccounts() throws Exception {
        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();
        accounts.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountsMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(accounts)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAccounts() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);

        int databaseSizeBeforeDelete = accountsRepository.findAll().size();

        // Delete the accounts
        restAccountsMockMvc
            .perform(delete(ENTITY_API_URL_ID, accounts.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
