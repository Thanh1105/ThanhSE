package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "type_noti")
    private Integer typeNoti;

    @Column(name = "type_account")
    private Integer typeAccount;

    @Column(name = "message")
    private String message;

    @Column(name = "has_read")
    private Boolean hasRead;

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

    public Notification id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTypeNoti() {
        return this.typeNoti;
    }

    public Notification typeNoti(Integer typeNoti) {
        this.setTypeNoti(typeNoti);
        return this;
    }

    public void setTypeNoti(Integer typeNoti) {
        this.typeNoti = typeNoti;
    }

    public Integer getTypeAccount() {
        return this.typeAccount;
    }

    public Notification typeAccount(Integer typeAccount) {
        this.setTypeAccount(typeAccount);
        return this;
    }

    public void setTypeAccount(Integer typeAccount) {
        this.typeAccount = typeAccount;
    }

    public String getMessage() {
        return this.message;
    }

    public Notification message(String message) {
        this.setMessage(message);
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getHasRead() {
        return this.hasRead;
    }

    public Notification hasRead(Boolean hasRead) {
        this.setHasRead(hasRead);
        return this;
    }

    public void setHasRead(Boolean hasRead) {
        this.hasRead = hasRead;
    }

    public Accounts getAccounts() {
        return this.accounts;
    }

    public void setAccounts(Accounts accounts) {
        this.accounts = accounts;
    }

    public Notification accounts(Accounts accounts) {
        this.setAccounts(accounts);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", typeNoti=" + getTypeNoti() +
            ", typeAccount=" + getTypeAccount() +
            ", message='" + getMessage() + "'" +
            ", hasRead='" + getHasRead() + "'" +
            "}";
    }
}
