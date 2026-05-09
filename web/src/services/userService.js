const API =
  "http://localhost:8080/api/users";

/* UPDATE IMAGE */

export async function updateProfileImage(
  id,
  image
) {

  const response =
    await fetch(
      `${API}/${id}/image`,
      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          image,
        }),

      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to update image"
    );

  }

  return await response.json();

}

/* UPDATE PROFILE */

export async function updateProfile(
  user
) {

  const response =
    await fetch(
      `${API}/${user.id}`,
      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(user),

      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to update profile"
    );

  }

  return await response.json();

}