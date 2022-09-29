package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A InvestmentLendingRequest.
 */
@Entity
@Table(name = "investment_lending_request")
public class InvestmentLendingRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "status")
    private Integer status;

    @ManyToOne
    @JsonIgnoreProperties(value = { "lendingCategories", "investmentLendingRequests", "accounts" }, allowSetters = true)
    private LendingRequest lendingRequest;

    @ManyToOne
    @JsonIgnoreProperties(value = { "investmentLendingRequests", "accounts" }, allowSetters = true)
    private InvestmentRequest investmentRequest;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public InvestmentLendingRequest id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStatus() {
        return this.status;
    }

    public InvestmentLendingRequest status(Integer status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LendingRequest getLendingRequest() {
        return this.lendingRequest;
    }

    public void setLendingRequest(LendingRequest lendingRequest) {
        this.lendingRequest = lendingRequest;
    }

    public InvestmentLendingRequest lendingRequest(LendingRequest lendingRequest) {
        this.setLendingRequest(lendingRequest);
        return this;
    }

    public InvestmentRequest getInvestmentRequest() {
        return this.investmentRequest;
    }

    public void setInvestmentRequest(InvestmentRequest investmentRequest) {
        this.investmentRequest = investmentRequest;
    }

    public InvestmentLendingRequest investmentRequest(InvestmentRequest investmentRequest) {
        this.setInvestmentRequest(investmentRequest);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvestmentLendingRequest)) {
            return false;
        }
        return id != null && id.equals(((InvestmentLendingRequest) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvestmentLendingRequest{" +
            "id=" + getId() +
            ", status=" + getStatus() +
            "}";
    }
}
