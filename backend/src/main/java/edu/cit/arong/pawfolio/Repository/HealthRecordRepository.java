package edu.cit.arong.pawfolio.Repository;

import edu.cit.arong.pawfolio.Model.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthRecordRepository
        extends JpaRepository<HealthRecord, Long> {

    List<HealthRecord> findByPetId(Long petId);

}