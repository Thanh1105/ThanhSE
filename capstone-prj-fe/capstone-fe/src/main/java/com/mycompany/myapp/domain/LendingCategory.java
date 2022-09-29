package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A LendingCategory.
 */
@Entity
@Table(name = "lending_category")
public class LendingCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "lendingCategories", "investmentLendingRequests", "accounts" }, allowSetters = true)
    private LendingRequest lendingRequest;

    @ManyToOne
    @JsonIgnoreProperties(value = { "lendingCategories" }, allowSetters = true)
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LendingCategory id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LendingRequest getLendingRequest() {
        return this.lendingRequest;
    }

    public void setLendingRequest(LendingRequest lendingRequest) {
        this.lendingRequest = lendingRequest;
    }

    public LendingCategory lendingRequest(LendingRequest lendingRequest) {
        this.setLendingRequest(lendingRequest);
        return this;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LendingCategory category(Category category) {
        this.setCategory(category);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LendingCategory)) {
            return false;
        }
        return id != null && id.equals(((LendingCategory) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LendingCategory{" +
            "id=" + getId() +
            "}";
    }
}
