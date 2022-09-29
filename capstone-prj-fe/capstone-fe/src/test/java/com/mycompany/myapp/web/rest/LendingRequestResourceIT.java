package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.LendingRequest;
import com.mycompany.myapp.repository.LendingRequestRepository;
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
 * Integration tests for the {@link LendingRequestResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LendingRequestResourceIT {

    private static final Integer DEFAULT_LONG_ID = 1;
    private static final Integer UPDATED_LONG_ID = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_TYPE_OF_LENDING = 1;
    private static final Integer UPDATED_TYPE_OF_LENDING = 2;

    private static final Integer DEFAULT_MAX_NUMBER_OF_INVERSTOR = 1;
    private static final Integer UPDATED_MAX_NUMBER_OF_INVERSTOR = 2;

    private static final Float DEFAULT_AVAILABLE_MONEY = 1F;
    private static final Float UPDATED_AVAILABLE_MONEY = 2F;

    private static final Float DEFAULT_AMOUNT = 1F;
    private static final Float UPDATED_AMOUNT = 2F;

    private static final Float DEFAULT_TOTAL = 1F;
    private static final Float UPDATED_TOTAL = 2F;

    private static final Float DEFAULT_INTEREST_RATE = 1F;
    private static final Float UPDATED_INTEREST_RATE = 2F;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/lending-requests";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LendingRequestRepository lendingRequestRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLendingRequestMockMvc;

    private LendingRequest lendingRequest;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LendingRequest createEntity(EntityManager em) {
        LendingRequest lendingRequest = new LendingRequest()
            .longId(DEFAULT_LONG_ID)
            .description(DEFAULT_DESCRIPTION)
            .typeOfLending(DEFAULT_TYPE_OF_LENDING)
            .maxNumberOfInverstor(DEFAULT_MAX_NUMBER_OF_INVERSTOR)
            .availableMoney(DEFAULT_AVAILABLE_MONEY)
            .amount(DEFAULT_AMOUNT)
            .total(DEFAULT_TOTAL)
            .interestRate(DEFAULT_INTEREST_RATE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return lendingRequest;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LendingRequest createUpdatedEntity(EntityManager em) {
        LendingRequest lendingRequest = new LendingRequest()
            .longId(UPDATED_LONG_ID)
            .description(UPDATED_DESCRIPTION)
            .typeOfLending(UPDATED_TYPE_OF_LENDING)
            .maxNumberOfInverstor(UPDATED_MAX_NUMBER_OF_INVERSTOR)
            .availableMoney(UPDATED_AVAILABLE_MONEY)
            .amount(UPDATED_AMOUNT)
            .total(UPDATED_TOTAL)
            .interestRate(UPDATED_INTEREST_RATE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return lendingRequest;
    }

    @BeforeEach
    public void initTest() {
        lendingRequest = createEntity(em);
    }

    @Test
    @Transactional
    void createLendingRequest() throws Exception {
        int databaseSizeBeforeCreate = lendingRequestRepository.findAll().size();
        // Create the LendingRequest
        restLendingRequestMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lendingRequest))
            )
            .andExpect(status().isCreated());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeCreate + 1);
        LendingRequest testLendingRequest = lendingRequestList.get(lendingRequestList.size() - 1);
        assertThat(testLendingRequest.getLongId()).isEqualTo(DEFAULT_LONG_ID);
        assertThat(testLendingRequest.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLendingRequest.getTypeOfLending()).isEqualTo(DEFAULT_TYPE_OF_LENDING);
        assertThat(testLendingRequest.getMaxNumberOfInverstor()).isEqualTo(DEFAULT_MAX_NUMBER_OF_INVERSTOR);
        assertThat(testLendingRequest.getAvailableMoney()).isEqualTo(DEFAULT_AVAILABLE_MONEY);
        assertThat(testLendingRequest.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testLendingRequest.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testLendingRequest.getInterestRate()).isEqualTo(DEFAULT_INTEREST_RATE);
        assertThat(testLendingRequest.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testLendingRequest.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    void createLendingRequestWithExistingId() throws Exception {
        // Create the LendingRequest with an existing ID
        lendingRequest.setId(1L);

        int databaseSizeBeforeCreate = lendingRequestRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLendingRequestMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLendingRequests() throws Exception {
        // Initialize the database
        lendingRequestRepository.saveAndFlush(lendingRequest);

        // Get all the lendingRequestList
        restLendingRequestMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lendingRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].longId").value(hasItem(DEFAULT_LONG_ID)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].typeOfLending").value(hasItem(DEFAULT_TYPE_OF_LENDING)))
            .andExpect(jsonPath("$.[*].maxNumberOfInverstor").value(hasItem(DEFAULT_MAX_NUMBER_OF_INVERSTOR)))
            .andExpect(jsonPath("$.[*].availableMoney").value(hasItem(DEFAULT_AVAILABLE_MONEY.doubleValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].interestRate").value(hasItem(DEFAULT_INTEREST_RATE.doubleValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    void getLendingRequest() throws Exception {
        // Initialize the database
        lendingRequestRepository.saveAndFlush(lendingRequest);

        // Get the lendingRequest
        restLendingRequestMockMvc
            .perform(get(ENTITY_API_URL_ID, lendingRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lendingRequest.getId().intValue()))
            .andExpect(jsonPath("$.longId").value(DEFAULT_LONG_ID))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.typeOfLending").value(DEFAULT_TYPE_OF_LENDING))
            .andExpect(jsonPath("$.maxNumberOfInverstor").value(DEFAULT_MAX_NUMBER_OF_INVERSTOR))
            .andExpect(jsonPath("$.availableMoney").value(DEFAULT_AVAILABLE_MONEY.doubleValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.interestRate").value(DEFAULT_INTEREST_RATE.doubleValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingLendingRequest() throws Exception {
        // Get the lendingRequest
        restLendingRequestMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLendingRequest() throws Exception {
        // Initialize the database
        lendingRequestRepository.saveAndFlush(lendingRequest);

        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();

        // Update the lendingRequest
        LendingRequest updatedLendingRequest = lendingRequestRepository.findById(lendingRequest.getId()).get();
        // Disconnect from session so that the updates on updatedLendingRequest are not directly saved in db
        em.detach(updatedLendingRequest);
        updatedLendingRequest
            .longId(UPDATED_LONG_ID)
            .description(UPDATED_DESCRIPTION)
            .typeOfLending(UPDATED_TYPE_OF_LENDING)
            .maxNumberOfInverstor(UPDATED_MAX_NUMBER_OF_INVERSTOR)
            .availableMoney(UPDATED_AVAILABLE_MONEY)
            .amount(UPDATED_AMOUNT)
            .total(UPDATED_TOTAL)
            .interestRate(UPDATED_INTEREST_RATE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restLendingRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLendingRequest.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLendingRequest))
            )
            .andExpect(status().isOk());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
        LendingRequest testLendingRequest = lendingRequestList.get(lendingRequestList.size() - 1);
        assertThat(testLendingRequest.getLongId()).isEqualTo(UPDATED_LONG_ID);
        assertThat(testLendingRequest.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLendingRequest.getTypeOfLending()).isEqualTo(UPDATED_TYPE_OF_LENDING);
        assertThat(testLendingRequest.getMaxNumberOfInverstor()).isEqualTo(UPDATED_MAX_NUMBER_OF_INVERSTOR);
        assertThat(testLendingRequest.getAvailableMoney()).isEqualTo(UPDATED_AVAILABLE_MONEY);
        assertThat(testLendingRequest.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testLendingRequest.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testLendingRequest.getInterestRate()).isEqualTo(UPDATED_INTEREST_RATE);
        assertThat(testLendingRequest.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testLendingRequest.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void putNonExistingLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();
        lendingRequest.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLendingRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lendingRequest.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();
        lendingRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLendingRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();
        lendingRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLendingRequestMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lendingRequest)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLendingRequestWithPatch() throws Exception {
        // Initialize the database
        lendingRequestRepository.saveAndFlush(lendingRequest);

        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();

        // Update the lendingRequest using partial update
        LendingRequest partialUpdatedLendingRequest = new LendingRequest();
        partialUpdatedLendingRequest.setId(lendingRequest.getId());

        partialUpdatedLendingRequest
            .longId(UPDATED_LONG_ID)
            .typeOfLending(UPDATED_TYPE_OF_LENDING)
            .maxNumberOfInverstor(UPDATED_MAX_NUMBER_OF_INVERSTOR)
            .interestRate(UPDATED_INTEREST_RATE)
            .endDate(UPDATED_END_DATE);

        restLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLendingRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLendingRequest))
            )
            .andExpect(status().isOk());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
        LendingRequest testLendingRequest = lendingRequestList.get(lendingRequestList.size() - 1);
        assertThat(testLendingRequest.getLongId()).isEqualTo(UPDATED_LONG_ID);
        assertThat(testLendingRequest.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLendingRequest.getTypeOfLending()).isEqualTo(UPDATED_TYPE_OF_LENDING);
        assertThat(testLendingRequest.getMaxNumberOfInverstor()).isEqualTo(UPDATED_MAX_NUMBER_OF_INVERSTOR);
        assertThat(testLendingRequest.getAvailableMoney()).isEqualTo(DEFAULT_AVAILABLE_MONEY);
        assertThat(testLendingRequest.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testLendingRequest.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testLendingRequest.getInterestRate()).isEqualTo(UPDATED_INTEREST_RATE);
        assertThat(testLendingRequest.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testLendingRequest.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void fullUpdateLendingRequestWithPatch() throws Exception {
        // Initialize the database
        lendingRequestRepository.saveAndFlush(lendingRequest);

        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();

        // Update the lendingRequest using partial update
        LendingRequest partialUpdatedLendingRequest = new LendingRequest();
        partialUpdatedLendingRequest.setId(lendingRequest.getId());

        partialUpdatedLendingRequest
            .longId(UPDATED_LONG_ID)
            .description(UPDATED_DESCRIPTION)
            .typeOfLending(UPDATED_TYPE_OF_LENDING)
            .maxNumberOfInverstor(UPDATED_MAX_NUMBER_OF_INVERSTOR)
            .availableMoney(UPDATED_AVAILABLE_MONEY)
            .amount(UPDATED_AMOUNT)
            .total(UPDATED_TOTAL)
            .interestRate(UPDATED_INTEREST_RATE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLendingRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLendingRequest))
            )
            .andExpect(status().isOk());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
        LendingRequest testLendingRequest = lendingRequestList.get(lendingRequestList.size() - 1);
        assertThat(testLendingRequest.getLongId()).isEqualTo(UPDATED_LONG_ID);
        assertThat(testLendingRequest.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLendingRequest.getTypeOfLending()).isEqualTo(UPDATED_TYPE_OF_LENDING);
        assertThat(testLendingRequest.getMaxNumberOfInverstor()).isEqualTo(UPDATED_MAX_NUMBER_OF_INVERSTOR);
        assertThat(testLendingRequest.getAvailableMoney()).isEqualTo(UPDATED_AVAILABLE_MONEY);
        assertThat(testLendingRequest.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testLendingRequest.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testLendingRequest.getInterestRate()).isEqualTo(UPDATED_INTEREST_RATE);
        assertThat(testLendingRequest.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testLendingRequest.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();
        lendingRequest.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, lendingRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();
        lendingRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = lendingRequestRepository.findAll().size();
        lendingRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(lendingRequest))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LendingRequest in the database
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLendingRequest() throws Exception {
        // Initialize the database
        lendingRequestRepository.saveAndFlush(lendingRequest);

        int databaseSizeBeforeDelete = lendingRequestRepository.findAll().size();

        // Delete the lendingRequest
        restLendingRequestMockMvc
            .perform(delete(ENTITY_API_URL_ID, lendingRequest.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LendingRequest> lendingRequestList = lendingRequestRepository.findAll();
        assertThat(lendingRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
