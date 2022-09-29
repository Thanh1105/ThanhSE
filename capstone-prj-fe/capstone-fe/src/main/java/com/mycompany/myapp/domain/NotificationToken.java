package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A NotificationToken.
 */
@Entity
@Table(name = "notification_token")
public class NotificationToken implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "token")
    private String token;

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

    public NotificationToken id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return this.token;
    }

    public NotificationToken token(String token) {
        this.setToken(token);
        return this;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Accounts getAccounts() {
        return this.accounts;
    }

    public void setAccounts(Accounts accounts) {
        this.accounts = accounts;
    }

    public NotificationToken accounts(Accounts accounts) {
        this.setAccounts(accounts);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NotificationToken)) {
            return false;
        }
        return id != null && id.equals(((NotificationToken) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NotificationToken{" +
            "id=" + getId() +
            ", token='" + getToken() + "'" +
            "}";
    }
}
