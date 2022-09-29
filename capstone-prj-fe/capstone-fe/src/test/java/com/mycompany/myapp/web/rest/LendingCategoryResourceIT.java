package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.LendingCategory;
import com.mycompany.myapp.repository.LendingCategoryRepository;
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
 * Integration tests for the {@link LendingCategoryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LendingCategoryResourceIT {

    private static final String ENTITY_API_URL = "/api/lending-categories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LendingCategoryRepository lendingCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLendingCategoryMockMvc;

    private LendingCategory lendingCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LendingCategory createEntity(EntityManager em) {
        LendingCategory lendingCategory = new LendingCategory();
        return lendingCategory;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LendingCategory createUpdatedEntity(EntityManager em) {
        LendingCategory lendingCategory = new LendingCategory();
        return lendingCategory;
    }

    @BeforeEach
    public void initTest() {
        lendingCategory = createEntity(em);
    }

    @Test
    @Transactional
    void createLendingCategory() throws Exception {
        int databaseSizeBeforeCreate = lendingCategoryRepository.findAll().size();
        // Create the LendingCategory
        restLendingCategoryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lendingCategory))
            )
            .andExpect(status().isCreated());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        LendingCategory testLendingCategory = lendingCategoryList.get(lendingCategoryList.size() - 1);
    }

    @Test
    @Transactional
    void createLendingCategoryWithExistingId() throws Exception {
        // Create the LendingCategory with an existing ID
        lendingCategory.setId(1L);

        int databaseSizeBeforeCreate = lendingCategoryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLendingCategoryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lendingCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLendingCategories() throws Exception {
        // Initialize the database
        lendingCategoryRepository.saveAndFlush(lendingCategory);

        // Get all the lendingCategoryList
        restLendingCategoryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lendingCategory.getId().intValue())));
    }

    @Test
    @Transactional
    void getLendingCategory() throws Exception {
        // Initialize the database
        lendingCategoryRepository.saveAndFlush(lendingCategory);

        // Get the lendingCategory
        restLendingCategoryMockMvc
            .perform(get(ENTITY_API_URL_ID, lendingCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lendingCategory.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingLendingCategory() throws Exception {
        // Get the lendingCategory
        restLendingCategoryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLendingCategory() throws Exception {
        // Initialize the database
        lendingCategoryRepository.saveAndFlush(lendingCategory);

        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();

        // Update the lendingCategory
        LendingCategory updatedLendingCategory = lendingCategoryRepository.findById(lendingCategory.getId()).get();
        // Disconnect from session so that the updates on updatedLendingCategory are not directly saved in db
        em.detach(updatedLendingCategory);

        restLendingCategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLendingCategory.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLendingCategory))
            )
            .andExpect(status().isOk());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
        LendingCategory testLendingCategory = lendingCategoryList.get(lendingCategoryList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingLendingCategory() throws Exception {
        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();
        lendingCategory.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLendingCategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lendingCategory.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lendingCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLendingCategory() throws Exception {
        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();
        lendingCategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLendingCategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lendingCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLendingCategory() throws Exception {
        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();
        lendingCategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLendingCategoryMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lendingCategory))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLendingCategoryWithPatch() throws Exception {
        // Initialize the database
        lendingCategoryRepository.saveAndFlush(lendingCategory);

        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();

        // Update the lendingCategory using partial update
        LendingCategory partialUpdatedLendingCategory = new LendingCategory();
        partialUpdatedLendingCategory.setId(lendingCategory.getId());

        restLendingCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLendingCategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLendingCategory))
            )
            .andExpect(status().isOk());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
        LendingCategory testLendingCategory = lendingCategoryList.get(lendingCategoryList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateLendingCategoryWithPatch() throws Exception {
        // Initialize the database
        lendingCategoryRepository.saveAndFlush(lendingCategory);

        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();

        // Update the lendingCategory using partial update
        LendingCategory partialUpdatedLendingCategory = new LendingCategory();
        partialUpdatedLendingCategory.setId(lendingCategory.getId());

        restLendingCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLendingCategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLendingCategory))
            )
            .andExpect(status().isOk());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
        LendingCategory testLendingCategory = lendingCategoryList.get(lendingCategoryList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingLendingCategory() throws Exception {
        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();
        lendingCategory.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLendingCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, lendingCategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lendingCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLendingCategory() throws Exception {
        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();
        lendingCategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLendingCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lendingCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLendingCategory() throws Exception {
        int databaseSizeBeforeUpdate = lendingCategoryRepository.findAll().size();
        lendingCategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLendingCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lendingCategory))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LendingCategory in the database
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLendingCategory() throws Exception {
        // Initialize the database
        lendingCategoryRepository.saveAndFlush(lendingCategory);

        int databaseSizeBeforeDelete = lendingCategoryRepository.findAll().size();

        // Delete the lendingCategory
        restLendingCategoryMockMvc
            .perform(delete(ENTITY_API_URL_ID, lendingCategory.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LendingCategory> lendingCategoryList = lendingCategoryRepository.findAll();
        assertThat(lendingCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
