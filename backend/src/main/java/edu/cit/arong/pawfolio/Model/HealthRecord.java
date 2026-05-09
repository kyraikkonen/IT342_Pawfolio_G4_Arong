package edu.cit.arong.pawfolio.Model;

import javax.persistence.*;

@Entity
@Table(name = "health_records")
public class HealthRecord {

    @Id
    @GeneratedValue(strategy =
            GenerationType.IDENTITY)

    private Long id;

    private String title;

    private String recordType;

    private String veterinarian;

    private String clinic;

    @Column(length = 2000)
    private String notes;

    private String status;

    private String recordDate;

    private String nextDueDate;

    private Boolean hasNextDue;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    public HealthRecord() {}

    public Long getId() {
        return id;
    }

    /* TITLE */

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    /* TYPE */

    public String getRecordType() {
        return recordType;
    }

    public void setRecordType(
            String recordType
    ) {
        this.recordType = recordType;
    }

    /* VET */

    public String getVeterinarian() {
        return veterinarian;
    }

    public void setVeterinarian(
            String veterinarian
    ) {
        this.veterinarian = veterinarian;
    }

    /* CLINIC */

    public String getClinic() {
        return clinic;
    }

    public void setClinic(String clinic) {
        this.clinic = clinic;
    }

    /* NOTES */

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    /* STATUS */

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    /* RECORD DATE */

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(
            String recordDate
    ) {
        this.recordDate = recordDate;
    }

    /* NEXT DUE */

    public String getNextDueDate() {
        return nextDueDate;
    }

    public void setNextDueDate(
            String nextDueDate
    ) {
        this.nextDueDate = nextDueDate;
    }

    /* HAS NEXT DUE */

    public Boolean getHasNextDue() {
        return hasNextDue;
    }

    public void setHasNextDue(
            Boolean hasNextDue
    ) {
        this.hasNextDue = hasNextDue;
    }

    /* PET */

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }
}