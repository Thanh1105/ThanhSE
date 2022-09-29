package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A InvestmentRequest.
 */
@Entity
@Table(name = "investment_request")
public class InvestmentRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "discount")
    private Float discount;

    @Column(name = "actually_received")
    private Float actuallyReceived;

    @OneToMany(mappedBy = "investmentRequest")
    @JsonIgnoreProperties(value = { "lendingRequest", "investmentRequest" }, allowSetters = true)
    private Set<InvestmentLendingRequest> investmentLendingRequests = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "balanceAccounts", "notifications", "notificationTokens", "investmentRequests", "lendingRequests" },
        allowSetters = true
    )
    private Accounts accounts;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public InvestmentRequest id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAmount() {
        return this.amount;
    }

    public InvestmentRequest amount(Float amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Float getDiscount() {
        return this.discount;
    }

    public InvestmentRequest discount(Float discount) {
        this.setDiscount(discount);
        return this;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public Float getActuallyReceived() {
        return this.actuallyReceived;
    }

    public InvestmentRequest actuallyReceived(Float actuallyReceived) {
        this.setActuallyReceived(actuallyReceived);
        return this;
    }

    public void setActuallyReceived(Float actuallyReceived) {
        this.actuallyReceived = actuallyReceived;
    }

    public Set<InvestmentLendingRequest> getInvestmentLendingRequests() {
        return this.investmentLendingRequests;
    }

    public void setInvestmentLendingRequests(Set<InvestmentLendingRequest> investmentLendingRequests) {
        if (this.investmentLendingRequests != null) {
            this.investmentLendingRequests.forEach(i -> i.setInvestmentRequest(null));
        }
        if (investmentLendingRequests != null) {
            investmentLendingRequests.forEach(i -> i.setInvestmentRequest(this));
        }
        this.investmentLendingRequests = investmentLendingRequests;
    }

    public InvestmentRequest investmentLendingRequests(Set<InvestmentLendingRequest> investmentLendingRequests) {
        this.setInvestmentLendingRequests(investmentLendingRequests);
        return this;
    }

    public InvestmentRequest addInvestmentLendingRequest(InvestmentLendingRequest investmentLendingRequest) {
        this.investmentLendingRequests.add(investmentLendingRequest);
        investmentLendingRequest.setInvestmentRequest(this);
        return this;
    }

    public InvestmentRequest removeInvestmentLendingRequest(InvestmentLendingRequest investmentLendingRequest) {
        this.investmentLendingRequests.remove(investmentLendingRequest);
        investmentLendingRequest.setInvestmentRequest(null);
        return this;
    }

    public Accounts getAccounts() {
        return this.accounts;
    }

    public void setAccounts(Accounts accounts) {
        this.accounts = accounts;
    }

    public InvestmentRequest accounts(Accounts accounts) {
        this.setAccounts(accounts);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvestmentRequest)) {
            return false;
        }
        return id != null && id.equals(((InvestmentRequest) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvestmentRequest{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", discount=" + getDiscount() +
            ", actuallyReceived=" + getActuallyReceived() +
            "}";
    }
}
