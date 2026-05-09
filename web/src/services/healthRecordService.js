const API_URL =
  "http://localhost:8080/api/records";

/* GET RECORDS OF PET */

export async function getRecords(
  petId
) {

  const response =
    await fetch(
      `${API_URL}/${petId}`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch records"
    );

  }

  return await response.json();

}

/* GET ALL RECORDS */

export async function getAllRecords() {

  const response =
    await fetch(API_URL);

  if (!response.ok) {

    throw new Error(
      "Failed to fetch all records"
    );

  }

  return await response.json();

}

/* CREATE */

export async function createRecord(
  petId,
  record
) {

  const response =
    await fetch(
      `${API_URL}/${petId}`,
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(record),

      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to create record"
    );

  }

  return await response.json();

}

/* UPDATE */

export async function updateRecord(
  id,
  record
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

        body:
          JSON.stringify(record),

      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to update record"
    );

  }

  return await response.json();

}

/* DELETE */

export async function deleteRecord(
  id
) {

  const response =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to delete record"
    );

  }

}