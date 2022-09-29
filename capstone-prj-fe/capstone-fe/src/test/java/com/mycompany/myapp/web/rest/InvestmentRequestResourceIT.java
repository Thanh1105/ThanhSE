package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.InvestmentRequest;
import com.mycompany.myapp.repository.InvestmentRequestRepository;
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
 * Integration tests for the {@link InvestmentRequestResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InvestmentRequestResourceIT {

    private static final Float DEFAULT_AMOUNT = 1F;
    private static final Float UPDATED_AMOUNT = 2F;

    private static final Float DEFAULT_DISCOUNT = 1F;
    private static final Float UPDATED_DISCOUNT = 2F;

    private static final Float DEFAULT_ACTUALLY_RECEIVED = 1F;
    private static final Float UPDATED_ACTUALLY_RECEIVED = 2F;

    private static final String ENTITY_API_URL = "/api/investment-requests";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private InvestmentRequestRepository investmentRequestRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInvestmentRequestMockMvc;

    private InvestmentRequest investmentRequest;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvestmentRequest createEntity(EntityManager em) {
        InvestmentRequest investmentRequest = new InvestmentRequest()
            .amount(DEFAULT_AMOUNT)
            .discount(DEFAULT_DISCOUNT)
            .actuallyReceived(DEFAULT_ACTUALLY_RECEIVED);
        return investmentRequest;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvestmentRequest createUpdatedEntity(EntityManager em) {
        InvestmentRequest investmentRequest = new InvestmentRequest()
            .amount(UPDATED_AMOUNT)
            .discount(UPDATED_DISCOUNT)
            .actuallyReceived(UPDATED_ACTUALLY_RECEIVED);
        return investmentRequest;
    }

    @BeforeEach
    public void initTest() {
        investmentRequest = createEntity(em);
    }

    @Test
    @Transactional
    void createInvestmentRequest() throws Exception {
        int databaseSizeBeforeCreate = investmentRequestRepository.findAll().size();
        // Create the InvestmentRequest
        restInvestmentRequestMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(investmentRequest))
            )
            .andExpect(status().isCreated());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeCreate + 1);
        InvestmentRequest testInvestmentRequest = investmentRequestList.get(investmentRequestList.size() - 1);
        assertThat(testInvestmentRequest.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testInvestmentRequest.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testInvestmentRequest.getActuallyReceived()).isEqualTo(DEFAULT_ACTUALLY_RECEIVED);
    }

    @Test
    @Transactional
    void createInvestmentRequestWithExistingId() throws Exception {
        // Create the InvestmentRequest with an existing ID
        investmentRequest.setId(1L);

        int databaseSizeBeforeCreate = investmentRequestRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvestmentRequestMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(investmentRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllInvestmentRequests() throws Exception {
        // Initialize the database
        investmentRequestRepository.saveAndFlush(investmentRequest);

        // Get all the investmentRequestList
        restInvestmentRequestMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(investmentRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].actuallyReceived").value(hasItem(DEFAULT_ACTUALLY_RECEIVED.doubleValue())));
    }

    @Test
    @Transactional
    void getInvestmentRequest() throws Exception {
        // Initialize the database
        investmentRequestRepository.saveAndFlush(investmentRequest);

        // Get the investmentRequest
        restInvestmentRequestMockMvc
            .perform(get(ENTITY_API_URL_ID, investmentRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(investmentRequest.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.doubleValue()))
            .andExpect(jsonPath("$.actuallyReceived").value(DEFAULT_ACTUALLY_RECEIVED.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingInvestmentRequest() throws Exception {
        // Get the investmentRequest
        restInvestmentRequestMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewInvestmentRequest() throws Exception {
        // Initialize the database
        investmentRequestRepository.saveAndFlush(investmentRequest);

        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();

        // Update the investmentRequest
        InvestmentRequest updatedInvestmentRequest = investmentRequestRepository.findById(investmentRequest.getId()).get();
        // Disconnect from session so that the updates on updatedInvestmentRequest are not directly saved in db
        em.detach(updatedInvestmentRequest);
        updatedInvestmentRequest.amount(UPDATED_AMOUNT).discount(UPDATED_DISCOUNT).actuallyReceived(UPDATED_ACTUALLY_RECEIVED);

        restInvestmentRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedInvestmentRequest.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedInvestmentRequest))
            )
            .andExpect(status().isOk());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
        InvestmentRequest testInvestmentRequest = investmentRequestList.get(investmentRequestList.size() - 1);
        assertThat(testInvestmentRequest.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testInvestmentRequest.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testInvestmentRequest.getActuallyReceived()).isEqualTo(UPDATED_ACTUALLY_RECEIVED);
    }

    @Test
    @Transactional
    void putNonExistingInvestmentRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();
        investmentRequest.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvestmentRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, investmentRequest.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(investmentRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchInvestmentRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();
        investmentRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(investmentRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamInvestmentRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();
        investmentRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentRequestMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(investmentRequest))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateInvestmentRequestWithPatch() throws Exception {
        // Initialize the database
        investmentRequestRepository.saveAndFlush(investmentRequest);

        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();

        // Update the investmentRequest using partial update
        InvestmentRequest partialUpdatedInvestmentRequest = new InvestmentRequest();
        partialUpdatedInvestmentRequest.setId(investmentRequest.getId());

        partialUpdatedInvestmentRequest.actuallyReceived(UPDATED_ACTUALLY_RECEIVED);

        restInvestmentRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInvestmentRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInvestmentRequest))
            )
            .andExpect(status().isOk());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
        InvestmentRequest testInvestmentRequest = investmentRequestList.get(investmentRequestList.size() - 1);
        assertThat(testInvestmentRequest.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testInvestmentRequest.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testInvestmentRequest.getActuallyReceived()).isEqualTo(UPDATED_ACTUALLY_RECEIVED);
    }

    @Test
    @Transactional
    void fullUpdateInvestmentRequestWithPatch() throws Exception {
        // Initialize the database
        investmentRequestRepository.saveAndFlush(investmentRequest);

        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();

        // Update the investmentRequest using partial update
        InvestmentRequest partialUpdatedInvestmentRequest = new InvestmentRequest();
        partialUpdatedInvestmentRequest.setId(investmentRequest.getId());

        partialUpdatedInvestmentRequest.amount(UPDATED_AMOUNT).discount(UPDATED_DISCOUNT).actuallyReceived(UPDATED_ACTUALLY_RECEIVED);

        restInvestmentRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInvestmentRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInvestmentRequest))
            )
            .andExpect(status().isOk());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
        InvestmentRequest testInvestmentRequest = investmentRequestList.get(investmentRequestList.size() - 1);
        assertThat(testInvestmentRequest.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testInvestmentRequest.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testInvestmentRequest.getActuallyReceived()).isEqualTo(UPDATED_ACTUALLY_RECEIVED);
    }

    @Test
    @Transactional
    void patchNonExistingInvestmentRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();
        investmentRequest.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvestmentRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, investmentRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(investmentRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchInvestmentRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();
        investmentRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(investmentRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamInvestmentRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentRequestRepository.findAll().size();
        investmentRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentRequestMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(investmentRequest))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the InvestmentRequest in the database
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteInvestmentRequest() throws Exception {
        // Initialize the database
        investmentRequestRepository.saveAndFlush(investmentRequest);

        int databaseSizeBeforeDelete = investmentRequestRepository.findAll().size();

        // Delete the investmentRequest
        restInvestmentRequestMockMvc
            .perform(delete(ENTITY_API_URL_ID, investmentRequest.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InvestmentRequest> investmentRequestList = investmentRequestRepository.findAll();
        assertThat(investmentRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
