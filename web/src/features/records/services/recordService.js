const API =
  "http://localhost:8080/api/records";

export const getPetRecords =
  async (petId) => {

    const response =
      await fetch(
        `${API}/${petId}`
      );

    return response.json();
};

export const addRecord =
  async (petId, record) => {

    const response =
      await fetch(
        `${API}/${petId}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(
            record
          )
        }
      );

    return response.json();
};