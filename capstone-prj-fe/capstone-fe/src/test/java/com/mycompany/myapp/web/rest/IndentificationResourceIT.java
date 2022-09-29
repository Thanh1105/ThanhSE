package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Indentification;
import com.mycompany.myapp.repository.IndentificationRepository;
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
 * Integration tests for the {@link IndentificationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class IndentificationResourceIT {

    private static final String DEFAULT_INDENTIFY_CARD_1 = "AAAAAAAAAA";
    private static final String UPDATED_INDENTIFY_CARD_1 = "BBBBBBBBBB";

    private static final String DEFAULT_INDENTIFY_CARD_2 = "AAAAAAAAAA";
    private static final String UPDATED_INDENTIFY_CARD_2 = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVING_LICENSE_1 = "AAAAAAAAAA";
    private static final String UPDATED_DRIVING_LICENSE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVING_LICENSE_2 = "AAAAAAAAAA";
    private static final String UPDATED_DRIVING_LICENSE_2 = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    private static final String ENTITY_API_URL = "/api/indentifications";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private IndentificationRepository indentificationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIndentificationMockMvc;

    private Indentification indentification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Indentification createEntity(EntityManager em) {
        Indentification indentification = new Indentification()
            .indentifyCard1(DEFAULT_INDENTIFY_CARD_1)
            .indentifyCard2(DEFAULT_INDENTIFY_CARD_2)
            .drivingLicense1(DEFAULT_DRIVING_LICENSE_1)
            .drivingLicense2(DEFAULT_DRIVING_LICENSE_2)
            .status(DEFAULT_STATUS);
        return indentification;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Indentification createUpdatedEntity(EntityManager em) {
        Indentification indentification = new Indentification()
            .indentifyCard1(UPDATED_INDENTIFY_CARD_1)
            .indentifyCard2(UPDATED_INDENTIFY_CARD_2)
            .drivingLicense1(UPDATED_DRIVING_LICENSE_1)
            .drivingLicense2(UPDATED_DRIVING_LICENSE_2)
            .status(UPDATED_STATUS);
        return indentification;
    }

    @BeforeEach
    public void initTest() {
        indentification = createEntity(em);
    }

    @Test
    @Transactional
    void createIndentification() throws Exception {
        int databaseSizeBeforeCreate = indentificationRepository.findAll().size();
        // Create the Indentification
        restIndentificationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(indentification))
            )
            .andExpect(status().isCreated());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeCreate + 1);
        Indentification testIndentification = indentificationList.get(indentificationList.size() - 1);
        assertThat(testIndentification.getIndentifyCard1()).isEqualTo(DEFAULT_INDENTIFY_CARD_1);
        assertThat(testIndentification.getIndentifyCard2()).isEqualTo(DEFAULT_INDENTIFY_CARD_2);
        assertThat(testIndentification.getDrivingLicense1()).isEqualTo(DEFAULT_DRIVING_LICENSE_1);
        assertThat(testIndentification.getDrivingLicense2()).isEqualTo(DEFAULT_DRIVING_LICENSE_2);
        assertThat(testIndentification.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createIndentificationWithExistingId() throws Exception {
        // Create the Indentification with an existing ID
        indentification.setId(1L);

        int databaseSizeBeforeCreate = indentificationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restIndentificationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(indentification))
            )
            .andExpect(status().isBadRequest());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllIndentifications() throws Exception {
        // Initialize the database
        indentificationRepository.saveAndFlush(indentification);

        // Get all the indentificationList
        restIndentificationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(indentification.getId().intValue())))
            .andExpect(jsonPath("$.[*].indentifyCard1").value(hasItem(DEFAULT_INDENTIFY_CARD_1)))
            .andExpect(jsonPath("$.[*].indentifyCard2").value(hasItem(DEFAULT_INDENTIFY_CARD_2)))
            .andExpect(jsonPath("$.[*].drivingLicense1").value(hasItem(DEFAULT_DRIVING_LICENSE_1)))
            .andExpect(jsonPath("$.[*].drivingLicense2").value(hasItem(DEFAULT_DRIVING_LICENSE_2)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    void getIndentification() throws Exception {
        // Initialize the database
        indentificationRepository.saveAndFlush(indentification);

        // Get the indentification
        restIndentificationMockMvc
            .perform(get(ENTITY_API_URL_ID, indentification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(indentification.getId().intValue()))
            .andExpect(jsonPath("$.indentifyCard1").value(DEFAULT_INDENTIFY_CARD_1))
            .andExpect(jsonPath("$.indentifyCard2").value(DEFAULT_INDENTIFY_CARD_2))
            .andExpect(jsonPath("$.drivingLicense1").value(DEFAULT_DRIVING_LICENSE_1))
            .andExpect(jsonPath("$.drivingLicense2").value(DEFAULT_DRIVING_LICENSE_2))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingIndentification() throws Exception {
        // Get the indentification
        restIndentificationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewIndentification() throws Exception {
        // Initialize the database
        indentificationRepository.saveAndFlush(indentification);

        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();

        // Update the indentification
        Indentification updatedIndentification = indentificationRepository.findById(indentification.getId()).get();
        // Disconnect from session so that the updates on updatedIndentification are not directly saved in db
        em.detach(updatedIndentification);
        updatedIndentification
            .indentifyCard1(UPDATED_INDENTIFY_CARD_1)
            .indentifyCard2(UPDATED_INDENTIFY_CARD_2)
            .drivingLicense1(UPDATED_DRIVING_LICENSE_1)
            .drivingLicense2(UPDATED_DRIVING_LICENSE_2)
            .status(UPDATED_STATUS);

        restIndentificationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedIndentification.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedIndentification))
            )
            .andExpect(status().isOk());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
        Indentification testIndentification = indentificationList.get(indentificationList.size() - 1);
        assertThat(testIndentification.getIndentifyCard1()).isEqualTo(UPDATED_INDENTIFY_CARD_1);
        assertThat(testIndentification.getIndentifyCard2()).isEqualTo(UPDATED_INDENTIFY_CARD_2);
        assertThat(testIndentification.getDrivingLicense1()).isEqualTo(UPDATED_DRIVING_LICENSE_1);
        assertThat(testIndentification.getDrivingLicense2()).isEqualTo(UPDATED_DRIVING_LICENSE_2);
        assertThat(testIndentification.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingIndentification() throws Exception {
        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();
        indentification.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIndentificationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, indentification.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(indentification))
            )
            .andExpect(status().isBadRequest());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchIndentification() throws Exception {
        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();
        indentification.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIndentificationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(indentification))
            )
            .andExpect(status().isBadRequest());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamIndentification() throws Exception {
        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();
        indentification.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIndentificationMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(indentification))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateIndentificationWithPatch() throws Exception {
        // Initialize the database
        indentificationRepository.saveAndFlush(indentification);

        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();

        // Update the indentification using partial update
        Indentification partialUpdatedIndentification = new Indentification();
        partialUpdatedIndentification.setId(indentification.getId());

        partialUpdatedIndentification.status(UPDATED_STATUS);

        restIndentificationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIndentification.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIndentification))
            )
            .andExpect(status().isOk());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
        Indentification testIndentification = indentificationList.get(indentificationList.size() - 1);
        assertThat(testIndentification.getIndentifyCard1()).isEqualTo(DEFAULT_INDENTIFY_CARD_1);
        assertThat(testIndentification.getIndentifyCard2()).isEqualTo(DEFAULT_INDENTIFY_CARD_2);
        assertThat(testIndentification.getDrivingLicense1()).isEqualTo(DEFAULT_DRIVING_LICENSE_1);
        assertThat(testIndentification.getDrivingLicense2()).isEqualTo(DEFAULT_DRIVING_LICENSE_2);
        assertThat(testIndentification.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateIndentificationWithPatch() throws Exception {
        // Initialize the database
        indentificationRepository.saveAndFlush(indentification);

        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();

        // Update the indentification using partial update
        Indentification partialUpdatedIndentification = new Indentification();
        partialUpdatedIndentification.setId(indentification.getId());

        partialUpdatedIndentification
            .indentifyCard1(UPDATED_INDENTIFY_CARD_1)
            .indentifyCard2(UPDATED_INDENTIFY_CARD_2)
            .drivingLicense1(UPDATED_DRIVING_LICENSE_1)
            .drivingLicense2(UPDATED_DRIVING_LICENSE_2)
            .status(UPDATED_STATUS);

        restIndentificationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIndentification.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIndentification))
            )
            .andExpect(status().isOk());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
        Indentification testIndentification = indentificationList.get(indentificationList.size() - 1);
        assertThat(testIndentification.getIndentifyCard1()).isEqualTo(UPDATED_INDENTIFY_CARD_1);
        assertThat(testIndentification.getIndentifyCard2()).isEqualTo(UPDATED_INDENTIFY_CARD_2);
        assertThat(testIndentification.getDrivingLicense1()).isEqualTo(UPDATED_DRIVING_LICENSE_1);
        assertThat(testIndentification.getDrivingLicense2()).isEqualTo(UPDATED_DRIVING_LICENSE_2);
        assertThat(testIndentification.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingIndentification() throws Exception {
        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();
        indentification.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIndentificationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, indentification.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(indentification))
            )
            .andExpect(status().isBadRequest());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchIndentification() throws Exception {
        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();
        indentification.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIndentificationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(indentification))
            )
            .andExpect(status().isBadRequest());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamIndentification() throws Exception {
        int databaseSizeBeforeUpdate = indentificationRepository.findAll().size();
        indentification.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIndentificationMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(indentification))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Indentification in the database
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteIndentification() throws Exception {
        // Initialize the database
        indentificationRepository.saveAndFlush(indentification);

        int databaseSizeBeforeDelete = indentificationRepository.findAll().size();

        // Delete the indentification
        restIndentificationMockMvc
            .perform(delete(ENTITY_API_URL_ID, indentification.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Indentification> indentificationList = indentificationRepository.findAll();
        assertThat(indentificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
