package edu.cit.arong.pawfolio.features.records.repository;

import edu.cit.arong.pawfolio.features.records.model.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthRecordRepository
        extends JpaRepository<HealthRecord, Long> {

    List<HealthRecord> findByPetId(Long petId);

}