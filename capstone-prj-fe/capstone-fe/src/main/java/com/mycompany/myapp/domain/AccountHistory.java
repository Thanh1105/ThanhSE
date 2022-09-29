package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A AccountHistory.
 */
@Entity
@Table(name = "account_history")
public class AccountHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "transaction_name")
    private String transactionName;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "sender_id")
    private Integer senderId;

    @Column(name = "receiver_id")
    private Integer receiverId;

    @Column(name = "type")
    private Integer type;

    @Column(name = "status")
    private String status;

    @Column(name = "note")
    private String note;

    @ManyToOne
    @JsonIgnoreProperties(value = { "accountHistories", "accounts" }, allowSetters = true)
    private BalanceAccount balanceAccount;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AccountHistory id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionName() {
        return this.transactionName;
    }

    public AccountHistory transactionName(String transactionName) {
        this.setTransactionName(transactionName);
        return this;
    }

    public void setTransactionName(String transactionName) {
        this.transactionName = transactionName;
    }

    public Float getAmount() {
        return this.amount;
    }

    public AccountHistory amount(Float amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Integer getSenderId() {
        return this.senderId;
    }

    public AccountHistory senderId(Integer senderId) {
        this.setSenderId(senderId);
        return this;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public Integer getReceiverId() {
        return this.receiverId;
    }

    public AccountHistory receiverId(Integer receiverId) {
        this.setReceiverId(receiverId);
        return this;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }

    public Integer getType() {
        return this.type;
    }

    public AccountHistory type(Integer type) {
        this.setType(type);
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getStatus() {
        return this.status;
    }

    public AccountHistory status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNote() {
        return this.note;
    }

    public AccountHistory note(String note) {
        this.setNote(note);
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public BalanceAccount getBalanceAccount() {
        return this.balanceAccount;
    }

    public void setBalanceAccount(BalanceAccount balanceAccount) {
        this.balanceAccount = balanceAccount;
    }

    public AccountHistory balanceAccount(BalanceAccount balanceAccount) {
        this.setBalanceAccount(balanceAccount);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccountHistory)) {
            return false;
        }
        return id != null && id.equals(((AccountHistory) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountHistory{" +
            "id=" + getId() +
            ", transactionName='" + getTransactionName() + "'" +
            ", amount=" + getAmount() +
            ", senderId=" + getSenderId() +
            ", receiverId=" + getReceiverId() +
            ", type=" + getType() +
            ", status='" + getStatus() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
