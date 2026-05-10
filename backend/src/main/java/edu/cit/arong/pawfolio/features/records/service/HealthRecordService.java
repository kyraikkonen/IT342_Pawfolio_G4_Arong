package edu.cit.arong.pawfolio.features.records.service;

import edu.cit.arong.pawfolio.features.records.model.HealthRecord;
import edu.cit.arong.pawfolio.features.pet.model.Pet;
import edu.cit.arong.pawfolio.features.records.repository.HealthRecordRepository;
import edu.cit.arong.pawfolio.features.pet.repository.PetRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthRecordService {

    private final HealthRecordRepository
            healthRecordRepository;

    private final PetRepository
            petRepository;

    public HealthRecordService(
            HealthRecordRepository healthRecordRepository,
            PetRepository petRepository
    ) {

        this.healthRecordRepository =
                healthRecordRepository;

        this.petRepository =
                petRepository;
    }

    /* GET ALL */

    public List<HealthRecord> getAllRecords() {

        return healthRecordRepository.findAll();

    }

    /* GET PET RECORDS */

    public List<HealthRecord> getRecordsByPetId(
            Long petId
    ) {

        return healthRecordRepository
                .findByPetId(petId);

    }

    /* CREATE */

    public HealthRecord createRecord(
            Long petId,
            HealthRecord record
    ) {

        Pet pet =
                petRepository.findById(petId)
                        .orElseThrow();

        record.setPet(pet);

        return healthRecordRepository.save(record);

    }

    /* UPDATE */

    public HealthRecord updateRecord(
            Long id,
            HealthRecord updatedRecord
    ) {

        HealthRecord record =
                healthRecordRepository.findById(id)
                        .orElseThrow();

        record.setTitle(updatedRecord.getTitle());
        record.setRecordDate(
                updatedRecord.getRecordDate()
        );

        record.setNextDueDate(
                updatedRecord.getNextDueDate()
        );

        record.setHasNextDue(
                updatedRecord.getHasNextDue()
        );
        record.setVeterinarian(updatedRecord.getVeterinarian());
        record.setClinic(updatedRecord.getClinic());
        record.setRecordDate(updatedRecord.getRecordDate());
        record.setNextDueDate(updatedRecord.getNextDueDate());
        record.setStatus(updatedRecord.getStatus());
        record.setNotes(updatedRecord.getNotes());

        return healthRecordRepository.save(record);

    }

    /* DELETE */

    public void deleteRecord(Long id) {

        healthRecordRepository.deleteById(id);

    }

}