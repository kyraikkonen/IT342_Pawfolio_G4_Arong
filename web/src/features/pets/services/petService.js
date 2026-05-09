// src/services/petService.js

const API_URL =
  "http://localhost:8080/api/pets";

/* GET PETS BY OWNER */

export async function getPetsByOwner(ownerId) {

  const response =
    await fetch(
      `${API_URL}/owner/${ownerId}`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch pets"
    );

  }

  return await response.json();
}

/* GET SINGLE PET */

export async function getPetById(id) {

  const response =
    await fetch(
      `${API_URL}/${id}`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch pet"
    );

  }

  return await response.json();
}

/* CREATE PET */

export async function createPet(
  pet,
  ownerId
) {

  const response =
    await fetch(

      `${API_URL}?ownerId=${ownerId}`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(pet),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to create pet"
    );

  }

  return await response.json();
}

/* UPDATE PET */

export async function updatePet(
  id,
  pet
) {

  const response =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(pet),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to update pet"
    );

  }

  return await response.json();
}

/* DELETE PET */

export async function deletePet(id) {

  const response =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to delete pet"
    );

  }
}