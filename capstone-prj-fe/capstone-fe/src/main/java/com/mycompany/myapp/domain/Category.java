package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "label")
    private String label;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "category")
    @JsonIgnoreProperties(value = { "lendingRequest", "category" }, allowSetters = true)
    private Set<LendingCategory> lendingCategories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Category id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return this.label;
    }

    public Category label(String label) {
        this.setLabel(label);
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return this.description;
    }

    public Category description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<LendingCategory> getLendingCategories() {
        return this.lendingCategories;
    }

    public void setLendingCategories(Set<LendingCategory> lendingCategories) {
        if (this.lendingCategories != null) {
            this.lendingCategories.forEach(i -> i.setCategory(null));
        }
        if (lendingCategories != null) {
            lendingCategories.forEach(i -> i.setCategory(this));
        }
        this.lendingCategories = lendingCategories;
    }

    public Category lendingCategories(Set<LendingCategory> lendingCategories) {
        this.setLendingCategories(lendingCategories);
        return this;
    }

    public Category addLendingCategory(LendingCategory lendingCategory) {
        this.lendingCategories.add(lendingCategory);
        lendingCategory.setCategory(this);
        return this;
    }

    public Category removeLendingCategory(LendingCategory lendingCategory) {
        this.lendingCategories.remove(lendingCategory);
        lendingCategory.setCategory(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
