package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Accounts.
 */
@Entity
@Table(name = "accounts")
public class Accounts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "google_id")
    private String googleId;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "birth")
    private Instant birth;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "credit_score")
    private Float creditScore;

    @Column(name = "average_rating")
    private Float averageRating;

    @Column(name = "is_super_user")
    private Boolean isSuperUser;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "accounts")
    @JsonIgnoreProperties(value = { "accountHistories", "accounts" }, allowSetters = true)
    private Set<BalanceAccount> balanceAccounts = new HashSet<>();

    @OneToMany(mappedBy = "accounts")
    @JsonIgnoreProperties(value = { "accounts" }, allowSetters = true)
    private Set<Notification> notifications = new HashSet<>();

    @OneToMany(mappedBy = "accounts")
    @JsonIgnoreProperties(value = { "accounts" }, allowSetters = true)
    private Set<NotificationToken> notificationTokens = new HashSet<>();

    @OneToMany(mappedBy = "accounts")
    @JsonIgnoreProperties(value = { "investmentLendingRequests", "accounts" }, allowSetters = true)
    private Set<InvestmentRequest> investmentRequests = new HashSet<>();

    @OneToMany(mappedBy = "accounts")
    @JsonIgnoreProperties(value = { "lendingCategories", "investmentLendingRequests", "accounts" }, allowSetters = true)
    private Set<LendingRequest> lendingRequests = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Accounts id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGoogleId() {
        return this.googleId;
    }

    public Accounts googleId(String googleId) {
        this.setGoogleId(googleId);
        return this;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Accounts lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Accounts firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPassword() {
        return this.password;
    }

    public Accounts password(String password) {
        this.setPassword(password);
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public Accounts email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Accounts phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Instant getBirth() {
        return this.birth;
    }

    public Accounts birth(Instant birth) {
        this.setBirth(birth);
        return this;
    }

    public void setBirth(Instant birth) {
        this.birth = birth;
    }

    public Boolean getGender() {
        return this.gender;
    }

    public Accounts gender(Boolean gender) {
        this.setGender(gender);
        return this;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public Float getCreditScore() {
        return this.creditScore;
    }

    public Accounts creditScore(Float creditScore) {
        this.setCreditScore(creditScore);
        return this;
    }

    public void setCreditScore(Float creditScore) {
        this.creditScore = creditScore;
    }

    public Float getAverageRating() {
        return this.averageRating;
    }

    public Accounts averageRating(Float averageRating) {
        this.setAverageRating(averageRating);
        return this;
    }

    public void setAverageRating(Float averageRating) {
        this.averageRating = averageRating;
    }

    public Boolean getIsSuperUser() {
        return this.isSuperUser;
    }

    public Accounts isSuperUser(Boolean isSuperUser) {
        this.setIsSuperUser(isSuperUser);
        return this;
    }

    public void setIsSuperUser(Boolean isSuperUser) {
        this.isSuperUser = isSuperUser;
    }

    public String getStatus() {
        return this.status;
    }

    public Accounts status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<BalanceAccount> getBalanceAccounts() {
        return this.balanceAccounts;
    }

    public void setBalanceAccounts(Set<BalanceAccount> balanceAccounts) {
        if (this.balanceAccounts != null) {
            this.balanceAccounts.forEach(i -> i.setAccounts(null));
        }
        if (balanceAccounts != null) {
            balanceAccounts.forEach(i -> i.setAccounts(this));
        }
        this.balanceAccounts = balanceAccounts;
    }

    public Accounts balanceAccounts(Set<BalanceAccount> balanceAccounts) {
        this.setBalanceAccounts(balanceAccounts);
        return this;
    }

    public Accounts addBalanceAccount(BalanceAccount balanceAccount) {
        this.balanceAccounts.add(balanceAccount);
        balanceAccount.setAccounts(this);
        return this;
    }

    public Accounts removeBalanceAccount(BalanceAccount balanceAccount) {
        this.balanceAccounts.remove(balanceAccount);
        balanceAccount.setAccounts(null);
        return this;
    }

    public Set<Notification> getNotifications() {
        return this.notifications;
    }

    public void setNotifications(Set<Notification> notifications) {
        if (this.notifications != null) {
            this.notifications.forEach(i -> i.setAccounts(null));
        }
        if (notifications != null) {
            notifications.forEach(i -> i.setAccounts(this));
        }
        this.notifications = notifications;
    }

    public Accounts notifications(Set<Notification> notifications) {
        this.setNotifications(notifications);
        return this;
    }

    public Accounts addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.setAccounts(this);
        return this;
    }

    public Accounts removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.setAccounts(null);
        return this;
    }

    public Set<NotificationToken> getNotificationTokens() {
        return this.notificationTokens;
    }

    public void setNotificationTokens(Set<NotificationToken> notificationTokens) {
        if (this.notificationTokens != null) {
            this.notificationTokens.forEach(i -> i.setAccounts(null));
        }
        if (notificationTokens != null) {
            notificationTokens.forEach(i -> i.setAccounts(this));
        }
        this.notificationTokens = notificationTokens;
    }

    public Accounts notificationTokens(Set<NotificationToken> notificationTokens) {
        this.setNotificationTokens(notificationTokens);
        return this;
    }

    public Accounts addNotificationToken(NotificationToken notificationToken) {
        this.notificationTokens.add(notificationToken);
        notificationToken.setAccounts(this);
        return this;
    }

    public Accounts removeNotificationToken(NotificationToken notificationToken) {
        this.notificationTokens.remove(notificationToken);
        notificationToken.setAccounts(null);
        return this;
    }

    public Set<InvestmentRequest> getInvestmentRequests() {
        return this.investmentRequests;
    }

    public void setInvestmentRequests(Set<InvestmentRequest> investmentRequests) {
        if (this.investmentRequests != null) {
            this.investmentRequests.forEach(i -> i.setAccounts(null));
        }
        if (investmentRequests != null) {
            investmentRequests.forEach(i -> i.setAccounts(this));
        }
        this.investmentRequests = investmentRequests;
    }

    public Accounts investmentRequests(Set<InvestmentRequest> investmentRequests) {
        this.setInvestmentRequests(investmentRequests);
        return this;
    }

    public Accounts addInvestmentRequest(InvestmentRequest investmentRequest) {
        this.investmentRequests.add(investmentRequest);
        investmentRequest.setAccounts(this);
        return this;
    }

    public Accounts removeInvestmentRequest(InvestmentRequest investmentRequest) {
        this.investmentRequests.remove(investmentRequest);
        investmentRequest.setAccounts(null);
        return this;
    }

    public Set<LendingRequest> getLendingRequests() {
        return this.lendingRequests;
    }

    public void setLendingRequests(Set<LendingRequest> lendingRequests) {
        if (this.lendingRequests != null) {
            this.lendingRequests.forEach(i -> i.setAccounts(null));
        }
        if (lendingRequests != null) {
            lendingRequests.forEach(i -> i.setAccounts(this));
        }
        this.lendingRequests = lendingRequests;
    }

    public Accounts lendingRequests(Set<LendingRequest> lendingRequests) {
        this.setLendingRequests(lendingRequests);
        return this;
    }

    public Accounts addLendingRequest(LendingRequest lendingRequest) {
        this.lendingRequests.add(lendingRequest);
        lendingRequest.setAccounts(this);
        return this;
    }

    public Accounts removeLendingRequest(LendingRequest lendingRequest) {
        this.lendingRequests.remove(lendingRequest);
        lendingRequest.setAccounts(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Accounts)) {
            return false;
        }
        return id != null && id.equals(((Accounts) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Accounts{" +
            "id=" + getId() +
            ", googleId='" + getGoogleId() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", password='" + getPassword() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", birth='" + getBirth() + "'" +
            ", gender='" + getGender() + "'" +
            ", creditScore=" + getCreditScore() +
            ", averageRating=" + getAverageRating() +
            ", isSuperUser='" + getIsSuperUser() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
