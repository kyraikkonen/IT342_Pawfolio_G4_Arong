package edu.cit.arong.pawfolio.features.records.controller;

import edu.cit.arong.pawfolio.features.records.model.HealthRecord;
import edu.cit.arong.pawfolio.features.records.service.HealthRecordService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "http://localhost:5173")
public class HealthRecordController {

    private final HealthRecordService
            healthRecordService;

    public HealthRecordController(
            HealthRecordService healthRecordService
    ) {

        this.healthRecordService =
                healthRecordService;

    }

    /* GET ALL */

    @GetMapping
    public List<HealthRecord> getAllRecords() {

        return healthRecordService
                .getAllRecords();

    }

    /* GET BY PET */

    @GetMapping("/{petId}")
    public List<HealthRecord> getRecords(
            @PathVariable Long petId
    ) {

        return healthRecordService
                .getRecordsByPetId(petId);

    }

    /* CREATE */

    @PostMapping("/{petId}")
    public HealthRecord createRecord(
            @PathVariable Long petId,

            @RequestBody HealthRecord record
    ) {

        return healthRecordService
                .createRecord(petId, record);

    }

    /* UPDATE */

    @PutMapping("/{id}")
    public HealthRecord updateRecord(
            @PathVariable Long id,

            @RequestBody HealthRecord record
    ) {

        return healthRecordService
                .updateRecord(id, record);

    }

    /* DELETE */

    @DeleteMapping("/{id}")
    public void deleteRecord(
            @PathVariable Long id
    ) {

        healthRecordService.deleteRecord(id);

    }

}