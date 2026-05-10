package edu.cit.arong.pawfolio.features.pet.controller;

import edu.cit.arong.pawfolio.features.pet.model.Pet;
import edu.cit.arong.pawfolio.features.pet.service.PetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @GetMapping("/owner/{ownerId}")
    public List<Pet> getPetsByOwner(
            @PathVariable Long ownerId
    ) {
        return petService.getPetsByOwner(ownerId);
    }

    @GetMapping("/{id}")
    public Pet getPetById(
            @PathVariable Long id
    ) {
        return petService.getPetById(id);
    }

    @PostMapping
    public Pet createPet(
            @RequestBody Pet pet,
            @RequestParam Long ownerId
    ) {
        return petService.createPet(pet, ownerId);
    }

    @PutMapping("/{id}")
    public Pet updatePet(
            @PathVariable Long id,
            @RequestBody Pet pet
    ) {
        return petService.updatePet(id, pet);
    }

    @DeleteMapping("/{id}")
    public void deletePet(
            @PathVariable Long id
    ) {
        petService.deletePet(id);
    }
}