package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A LendingRequest.
 */
@Entity
@Table(name = "lending_request")
public class LendingRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "long_id")
    private Integer longId;

    @Column(name = "description")
    private String description;

    @Column(name = "type_of_lending")
    private Integer typeOfLending;

    @Column(name = "max_number_of_inverstor")
    private Integer maxNumberOfInverstor;

    @Column(name = "available_money")
    private Float availableMoney;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "total")
    private Float total;

    @Column(name = "interest_rate")
    private Float interestRate;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @OneToMany(mappedBy = "lendingRequest")
    @JsonIgnoreProperties(value = { "lendingRequest", "category" }, allowSetters = true)
    private Set<LendingCategory> lendingCategories = new HashSet<>();

    @OneToMany(mappedBy = "lendingRequest")
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

    public LendingRequest id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLongId() {
        return this.longId;
    }

    public LendingRequest longId(Integer longId) {
        this.setLongId(longId);
        return this;
    }

    public void setLongId(Integer longId) {
        this.longId = longId;
    }

    public String getDescription() {
        return this.description;
    }

    public LendingRequest description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTypeOfLending() {
        return this.typeOfLending;
    }

    public LendingRequest typeOfLending(Integer typeOfLending) {
        this.setTypeOfLending(typeOfLending);
        return this;
    }

    public void setTypeOfLending(Integer typeOfLending) {
        this.typeOfLending = typeOfLending;
    }

    public Integer getMaxNumberOfInverstor() {
        return this.maxNumberOfInverstor;
    }

    public LendingRequest maxNumberOfInverstor(Integer maxNumberOfInverstor) {
        this.setMaxNumberOfInverstor(maxNumberOfInverstor);
        return this;
    }

    public void setMaxNumberOfInverstor(Integer maxNumberOfInverstor) {
        this.maxNumberOfInverstor = maxNumberOfInverstor;
    }

    public Float getAvailableMoney() {
        return this.availableMoney;
    }

    public LendingRequest availableMoney(Float availableMoney) {
        this.setAvailableMoney(availableMoney);
        return this;
    }

    public void setAvailableMoney(Float availableMoney) {
        this.availableMoney = availableMoney;
    }

    public Float getAmount() {
        return this.amount;
    }

    public LendingRequest amount(Float amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Float getTotal() {
        return this.total;
    }

    public LendingRequest total(Float total) {
        this.setTotal(total);
        return this;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Float getInterestRate() {
        return this.interestRate;
    }

    public LendingRequest interestRate(Float interestRate) {
        this.setInterestRate(interestRate);
        return this;
    }

    public void setInterestRate(Float interestRate) {
        this.interestRate = interestRate;
    }

    public Instant getStartDate() {
        return this.startDate;
    }

    public LendingRequest startDate(Instant startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return this.endDate;
    }

    public LendingRequest endDate(Instant endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Set<LendingCategory> getLendingCategories() {
        return this.lendingCategories;
    }

    public void setLendingCategories(Set<LendingCategory> lendingCategories) {
        if (this.lendingCategories != null) {
            this.lendingCategories.forEach(i -> i.setLendingRequest(null));
        }
        if (lendingCategories != null) {
            lendingCategories.forEach(i -> i.setLendingRequest(this));
        }
        this.lendingCategories = lendingCategories;
    }

    public LendingRequest lendingCategories(Set<LendingCategory> lendingCategories) {
        this.setLendingCategories(lendingCategories);
        return this;
    }

    public LendingRequest addLendingCategory(LendingCategory lendingCategory) {
        this.lendingCategories.add(lendingCategory);
        lendingCategory.setLendingRequest(this);
        return this;
    }

    public LendingRequest removeLendingCategory(LendingCategory lendingCategory) {
        this.lendingCategories.remove(lendingCategory);
        lendingCategory.setLendingRequest(null);
        return this;
    }

    public Set<InvestmentLendingRequest> getInvestmentLendingRequests() {
        return this.investmentLendingRequests;
    }

    public void setInvestmentLendingRequests(Set<InvestmentLendingRequest> investmentLendingRequests) {
        if (this.investmentLendingRequests != null) {
            this.investmentLendingRequests.forEach(i -> i.setLendingRequest(null));
        }
        if (investmentLendingRequests != null) {
            investmentLendingRequests.forEach(i -> i.setLendingRequest(this));
        }
        this.investmentLendingRequests = investmentLendingRequests;
    }

    public LendingRequest investmentLendingRequests(Set<InvestmentLendingRequest> investmentLendingRequests) {
        this.setInvestmentLendingRequests(investmentLendingRequests);
        return this;
    }

    public LendingRequest addInvestmentLendingRequest(InvestmentLendingRequest investmentLendingRequest) {
        this.investmentLendingRequests.add(investmentLendingRequest);
        investmentLendingRequest.setLendingRequest(this);
        return this;
    }

    public LendingRequest removeInvestmentLendingRequest(InvestmentLendingRequest investmentLendingRequest) {
        this.investmentLendingRequests.remove(investmentLendingRequest);
        investmentLendingRequest.setLendingRequest(null);
        return this;
    }

    public Accounts getAccounts() {
        return this.accounts;
    }

    public void setAccounts(Accounts accounts) {
        this.accounts = accounts;
    }

    public LendingRequest accounts(Accounts accounts) {
        this.setAccounts(accounts);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LendingRequest)) {
            return false;
        }
        return id != null && id.equals(((LendingRequest) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LendingRequest{" +
            "id=" + getId() +
            ", longId=" + getLongId() +
            ", description='" + getDescription() + "'" +
            ", typeOfLending=" + getTypeOfLending() +
            ", maxNumberOfInverstor=" + getMaxNumberOfInverstor() +
            ", availableMoney=" + getAvailableMoney() +
            ", amount=" + getAmount() +
            ", total=" + getTotal() +
            ", interestRate=" + getInterestRate() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
