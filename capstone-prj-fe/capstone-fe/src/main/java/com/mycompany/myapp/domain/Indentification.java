package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A Indentification.
 */
@Entity
@Table(name = "indentification")
public class Indentification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "indentify_card_1")
    private String indentifyCard1;

    @Column(name = "indentify_card_2")
    private String indentifyCard2;

    @Column(name = "driving_license_1")
    private String drivingLicense1;

    @Column(name = "driving_license_2")
    private String drivingLicense2;

    @Column(name = "status")
    private Integer status;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Indentification id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIndentifyCard1() {
        return this.indentifyCard1;
    }

    public Indentification indentifyCard1(String indentifyCard1) {
        this.setIndentifyCard1(indentifyCard1);
        return this;
    }

    public void setIndentifyCard1(String indentifyCard1) {
        this.indentifyCard1 = indentifyCard1;
    }

    public String getIndentifyCard2() {
        return this.indentifyCard2;
    }

    public Indentification indentifyCard2(String indentifyCard2) {
        this.setIndentifyCard2(indentifyCard2);
        return this;
    }

    public void setIndentifyCard2(String indentifyCard2) {
        this.indentifyCard2 = indentifyCard2;
    }

    public String getDrivingLicense1() {
        return this.drivingLicense1;
    }

    public Indentification drivingLicense1(String drivingLicense1) {
        this.setDrivingLicense1(drivingLicense1);
        return this;
    }

    public void setDrivingLicense1(String drivingLicense1) {
        this.drivingLicense1 = drivingLicense1;
    }

    public String getDrivingLicense2() {
        return this.drivingLicense2;
    }

    public Indentification drivingLicense2(String drivingLicense2) {
        this.setDrivingLicense2(drivingLicense2);
        return this;
    }

    public void setDrivingLicense2(String drivingLicense2) {
        this.drivingLicense2 = drivingLicense2;
    }

    public Integer getStatus() {
        return this.status;
    }

    public Indentification status(Integer status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Indentification)) {
            return false;
        }
        return id != null && id.equals(((Indentification) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Indentification{" +
            "id=" + getId() +
            ", indentifyCard1='" + getIndentifyCard1() + "'" +
            ", indentifyCard2='" + getIndentifyCard2() + "'" +
            ", drivingLicense1='" + getDrivingLicense1() + "'" +
            ", drivingLicense2='" + getDrivingLicense2() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
