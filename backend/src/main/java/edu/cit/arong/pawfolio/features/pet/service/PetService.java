package edu.cit.arong.pawfolio.features.pet.service;

import edu.cit.arong.pawfolio.features.pet.model.Pet;
import edu.cit.arong.pawfolio.features.users.model.User;
import edu.cit.arong.pawfolio.features.pet.repository.PetRepository;
import edu.cit.arong.pawfolio.features.users.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public PetService(
            PetRepository petRepository,
            UserRepository userRepository
    ) {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getPetsByOwner(Long ownerId) {
        return petRepository.findByOwnerId(ownerId);
    }

    public Pet getPetById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));
    }

    public Pet createPet(Pet pet, Long ownerId) {

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        pet.setOwner(owner);

        return petRepository.save(pet);
    }

    public Pet updatePet(Long id, Pet updatedPet) {

        Pet pet = getPetById(id);

        pet.setName(updatedPet.getName());
        pet.setBreed(updatedPet.getBreed());
        pet.setSpecies(updatedPet.getSpecies());
        pet.setAge(updatedPet.getAge());
        pet.setGender(updatedPet.getGender());
        pet.setImage(updatedPet.getImage());
        pet.setStatus(updatedPet.getStatus());

        return petRepository.save(pet);
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}