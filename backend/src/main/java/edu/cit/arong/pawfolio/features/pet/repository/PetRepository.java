package edu.cit.arong.pawfolio.features.pet.repository;

import edu.cit.arong.pawfolio.features.pet.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findByOwnerId(Long ownerId);
}