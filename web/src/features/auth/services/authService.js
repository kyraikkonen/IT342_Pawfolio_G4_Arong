const API = "http://localhost:8080/api/auth";

export const registerUser = async (user) => {

  const response = await fetch(`${API}/register`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Register failed");
  }

  return await response.json();
};

export const loginUser = async (user) => {

  const response = await fetch(`${API}/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};