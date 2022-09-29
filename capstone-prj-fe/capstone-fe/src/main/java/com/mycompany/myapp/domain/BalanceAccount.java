package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A BalanceAccount.
 */
@Entity
@Table(name = "balance_account")
public class BalanceAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "type")
    private Integer type;

    @Column(name = "balance")
    private Float balance;

    @OneToMany(mappedBy = "balanceAccount")
    @JsonIgnoreProperties(value = { "balanceAccount" }, allowSetters = true)
    private Set<AccountHistory> accountHistories = new HashSet<>();

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

    public BalanceAccount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getType() {
        return this.type;
    }

    public BalanceAccount type(Integer type) {
        this.setType(type);
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Float getBalance() {
        return this.balance;
    }

    public BalanceAccount balance(Float balance) {
        this.setBalance(balance);
        return this;
    }

    public void setBalance(Float balance) {
        this.balance = balance;
    }

    public Set<AccountHistory> getAccountHistories() {
        return this.accountHistories;
    }

    public void setAccountHistories(Set<AccountHistory> accountHistories) {
        if (this.accountHistories != null) {
            this.accountHistories.forEach(i -> i.setBalanceAccount(null));
        }
        if (accountHistories != null) {
            accountHistories.forEach(i -> i.setBalanceAccount(this));
        }
        this.accountHistories = accountHistories;
    }

    public BalanceAccount accountHistories(Set<AccountHistory> accountHistories) {
        this.setAccountHistories(accountHistories);
        return this;
    }

    public BalanceAccount addAccountHistory(AccountHistory accountHistory) {
        this.accountHistories.add(accountHistory);
        accountHistory.setBalanceAccount(this);
        return this;
    }

    public BalanceAccount removeAccountHistory(AccountHistory accountHistory) {
        this.accountHistories.remove(accountHistory);
        accountHistory.setBalanceAccount(null);
        return this;
    }

    public Accounts getAccounts() {
        return this.accounts;
    }

    public void setAccounts(Accounts accounts) {
        this.accounts = accounts;
    }

    public BalanceAccount accounts(Accounts accounts) {
        this.setAccounts(accounts);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BalanceAccount)) {
            return false;
        }
        return id != null && id.equals(((BalanceAccount) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BalanceAccount{" +
            "id=" + getId() +
            ", type=" + getType() +
            ", balance=" + getBalance() +
            "}";
    }
}
