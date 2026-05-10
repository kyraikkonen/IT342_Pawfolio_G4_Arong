import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { registerUser }
from "../services/authService";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      setError("");

      try {

        const data =
          await registerUser({
            name,
            email,
            password
          });

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        navigate("/dashboard");

      } catch (err) {

        setError(
          "Registration failed"
        );

      }
    };

  return (

    <div className="auth-container">

      <div className="auth-left">

        <div className="brand">
          Pawfolio
        </div>

        <h2>
          Create your Pawfolio account
        </h2>

        <p>
          Manage all your pets in one place.
        </p>

      </div>

      <div className="auth-right">

        <form
          className="form-card"
          onSubmit={handleRegister}
        >

          <h2>
            Register
          </h2>

          <p className="subtitle">
            Create a new account
          </p>

          {error && (
            <p style={{
              color: "#EF4444"
            }}>
              {error}
            </p>
          )}

          <div className="input-group">

            <label>
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button className="btn-primary">
            Register
          </button>

          <p className="footer-text">

            Already have an account?

            <span
              className="link"
              style={{
                cursor: "pointer"
              }}
              onClick={() =>
                navigate("/")
              }
            >
              {" "}Login
            </span>

          </p>

        </form>

      </div>

    </div>
  );
}