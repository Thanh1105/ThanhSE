package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.InvestmentLendingRequest;
import com.mycompany.myapp.repository.InvestmentLendingRequestRepository;
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
 * Integration tests for the {@link InvestmentLendingRequestResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InvestmentLendingRequestResourceIT {

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    private static final String ENTITY_API_URL = "/api/investment-lending-requests";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private InvestmentLendingRequestRepository investmentLendingRequestRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInvestmentLendingRequestMockMvc;

    private InvestmentLendingRequest investmentLendingRequest;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvestmentLendingRequest createEntity(EntityManager em) {
        InvestmentLendingRequest investmentLendingRequest = new InvestmentLendingRequest().status(DEFAULT_STATUS);
        return investmentLendingRequest;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvestmentLendingRequest createUpdatedEntity(EntityManager em) {
        InvestmentLendingRequest investmentLendingRequest = new InvestmentLendingRequest().status(UPDATED_STATUS);
        return investmentLendingRequest;
    }

    @BeforeEach
    public void initTest() {
        investmentLendingRequest = createEntity(em);
    }

    @Test
    @Transactional
    void createInvestmentLendingRequest() throws Exception {
        int databaseSizeBeforeCreate = investmentLendingRequestRepository.findAll().size();
        // Create the InvestmentLendingRequest
        restInvestmentLendingRequestMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(investmentLendingRequest))
            )
            .andExpect(status().isCreated());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeCreate + 1);
        InvestmentLendingRequest testInvestmentLendingRequest = investmentLendingRequestList.get(investmentLendingRequestList.size() - 1);
        assertThat(testInvestmentLendingRequest.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createInvestmentLendingRequestWithExistingId() throws Exception {
        // Create the InvestmentLendingRequest with an existing ID
        investmentLendingRequest.setId(1L);

        int databaseSizeBeforeCreate = investmentLendingRequestRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvestmentLendingRequestMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(investmentLendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllInvestmentLendingRequests() throws Exception {
        // Initialize the database
        investmentLendingRequestRepository.saveAndFlush(investmentLendingRequest);

        // Get all the investmentLendingRequestList
        restInvestmentLendingRequestMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(investmentLendingRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    void getInvestmentLendingRequest() throws Exception {
        // Initialize the database
        investmentLendingRequestRepository.saveAndFlush(investmentLendingRequest);

        // Get the investmentLendingRequest
        restInvestmentLendingRequestMockMvc
            .perform(get(ENTITY_API_URL_ID, investmentLendingRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(investmentLendingRequest.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingInvestmentLendingRequest() throws Exception {
        // Get the investmentLendingRequest
        restInvestmentLendingRequestMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewInvestmentLendingRequest() throws Exception {
        // Initialize the database
        investmentLendingRequestRepository.saveAndFlush(investmentLendingRequest);

        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();

        // Update the investmentLendingRequest
        InvestmentLendingRequest updatedInvestmentLendingRequest = investmentLendingRequestRepository
            .findById(investmentLendingRequest.getId())
            .get();
        // Disconnect from session so that the updates on updatedInvestmentLendingRequest are not directly saved in db
        em.detach(updatedInvestmentLendingRequest);
        updatedInvestmentLendingRequest.status(UPDATED_STATUS);

        restInvestmentLendingRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedInvestmentLendingRequest.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedInvestmentLendingRequest))
            )
            .andExpect(status().isOk());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
        InvestmentLendingRequest testInvestmentLendingRequest = investmentLendingRequestList.get(investmentLendingRequestList.size() - 1);
        assertThat(testInvestmentLendingRequest.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingInvestmentLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();
        investmentLendingRequest.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvestmentLendingRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, investmentLendingRequest.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(investmentLendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchInvestmentLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();
        investmentLendingRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentLendingRequestMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(investmentLendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamInvestmentLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();
        investmentLendingRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentLendingRequestMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(investmentLendingRequest))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateInvestmentLendingRequestWithPatch() throws Exception {
        // Initialize the database
        investmentLendingRequestRepository.saveAndFlush(investmentLendingRequest);

        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();

        // Update the investmentLendingRequest using partial update
        InvestmentLendingRequest partialUpdatedInvestmentLendingRequest = new InvestmentLendingRequest();
        partialUpdatedInvestmentLendingRequest.setId(investmentLendingRequest.getId());

        partialUpdatedInvestmentLendingRequest.status(UPDATED_STATUS);

        restInvestmentLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInvestmentLendingRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInvestmentLendingRequest))
            )
            .andExpect(status().isOk());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
        InvestmentLendingRequest testInvestmentLendingRequest = investmentLendingRequestList.get(investmentLendingRequestList.size() - 1);
        assertThat(testInvestmentLendingRequest.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateInvestmentLendingRequestWithPatch() throws Exception {
        // Initialize the database
        investmentLendingRequestRepository.saveAndFlush(investmentLendingRequest);

        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();

        // Update the investmentLendingRequest using partial update
        InvestmentLendingRequest partialUpdatedInvestmentLendingRequest = new InvestmentLendingRequest();
        partialUpdatedInvestmentLendingRequest.setId(investmentLendingRequest.getId());

        partialUpdatedInvestmentLendingRequest.status(UPDATED_STATUS);

        restInvestmentLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInvestmentLendingRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInvestmentLendingRequest))
            )
            .andExpect(status().isOk());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
        InvestmentLendingRequest testInvestmentLendingRequest = investmentLendingRequestList.get(investmentLendingRequestList.size() - 1);
        assertThat(testInvestmentLendingRequest.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingInvestmentLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();
        investmentLendingRequest.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvestmentLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, investmentLendingRequest.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(investmentLendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchInvestmentLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();
        investmentLendingRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(investmentLendingRequest))
            )
            .andExpect(status().isBadRequest());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamInvestmentLendingRequest() throws Exception {
        int databaseSizeBeforeUpdate = investmentLendingRequestRepository.findAll().size();
        investmentLendingRequest.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInvestmentLendingRequestMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(investmentLendingRequest))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the InvestmentLendingRequest in the database
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteInvestmentLendingRequest() throws Exception {
        // Initialize the database
        investmentLendingRequestRepository.saveAndFlush(investmentLendingRequest);

        int databaseSizeBeforeDelete = investmentLendingRequestRepository.findAll().size();

        // Delete the investmentLendingRequest
        restInvestmentLendingRequestMockMvc
            .perform(delete(ENTITY_API_URL_ID, investmentLendingRequest.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InvestmentLendingRequest> investmentLendingRequestList = investmentLendingRequestRepository.findAll();
        assertThat(investmentLendingRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
