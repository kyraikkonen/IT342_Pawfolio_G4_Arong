// src/pages/BreedExplorer.jsx

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Dog,
  Cat,
  Search,
  X
} from "lucide-react";

import "./BreedExplorer.css";

const DOG_API_KEY =
  "*";

const CAT_API_KEY =
  "*";

const BreedExplorer = () => {

  const [type, setType] =
    useState("dog");

  const [breeds, setBreeds] =
    useState([]);

  const [filteredBreeds,
    setFilteredBreeds] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  const [selectedBreed,
    setSelectedBreed] =
    useState(null);

  /* FETCH */

  useEffect(() => {

    fetchBreeds();

  }, [type]);

  const fetchBreeds =
  async () => {

    setLoading(true);

    try {

      const url =
        type === "dog"
          ? "https://api.thedogapi.com/v1/breeds"
          : "https://api.thecatapi.com/v1/breeds";

      const apiKey =
        type === "dog"
          ? DOG_API_KEY
          : CAT_API_KEY;

      const response =
        await axios.get(
          url,
          {
            headers: {
              "x-api-key":
                apiKey,
            },
          }
        );

      setBreeds(response.data);

      setFilteredBreeds(
        response.data
      );

    } catch (error) {

      console.error(
        "Breed fetch error:",
        error
      );

    }

    setLoading(false);

  };

  /* SEARCH */

  useEffect(() => {

    const filtered =
      breeds.filter((breed) =>

        breed.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

    setFilteredBreeds(filtered);

  }, [search, breeds]);

  return (

    <DashboardLayout>

      <div className="breed-page">

        {/* HEADER */}

        <div className="breed-header">

          <div>

            <p className="breed-small">

              Pawfolio Explorer

            </p>

            <h1>

              Breed Explorer

            </h1>

          </div>

          {/* TOGGLE */}

          <div className="breed-toggle">

            <button
              className={
                type === "dog"
                  ? "active"
                  : ""
              }

              onClick={() =>
                setType("dog")
              }
            >

              <Dog size={18} />

              Dogs

            </button>

            <button
              className={
                type === "cat"
                  ? "active"
                  : ""
              }

              onClick={() =>
                setType("cat")
              }
            >

              <Cat size={18} />

              Cats

            </button>

          </div>

        </div>

        {/* SEARCH */}

        <div className="breed-search">

          <Search size={18} />

          <input
            type="text"
            placeholder={`Search ${type} breeds...`}

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="breed-loading">

            Loading breeds...

          </div>

        ) : (

          <div className="breed-grid">

            {filteredBreeds.map(
              (breed) => (

              <div
                className="breed-card"

                key={breed.id}

                onClick={() =>
                  setSelectedBreed(
                    breed
                  )
                }
              >

                <img
  src={
    breed.reference_image_id

      ? type === "dog"

        ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`

        : `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`

      : "https://placehold.co/600x400/e5e7eb/6b7280?text=Breed+Image+Unavailable"
  }

  alt={breed.name}

  onError={(e) => {

    e.target.src =
      "https://placehold.co/600x400/e5e7eb/6b7280?text=Breed+Image+Unavailable";

  }}
/>

                <div className="breed-card-content">

                  <h3>
                    {breed.name}
                  </h3>

                  <p>

                    {breed.temperament
                      ?.split(",")
                      .slice(0, 3)
                      .join(", ")}

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* MODAL */}

        {selectedBreed && (

          <div className="breed-modal-overlay">

            <div className="breed-modal">

              <button
                className="close-modal"

                onClick={() =>
                  setSelectedBreed(null)
                }
              >

                <X size={22} />

              </button>

              <img
                src={
                  type === "dog"

                    ? `https://cdn2.thedogapi.com/images/${selectedBreed.reference_image_id}.jpg`

                    : `https://cdn2.thecatapi.com/images/${selectedBreed.reference_image_id}.jpg`
                }

                alt={selectedBreed.name}
              />

              <div className="breed-modal-content">

                <h2>
                  {selectedBreed.name}
                </h2>

                <p>
                  {selectedBreed.description ||
                    "No description available."}
                </p>

                <div className="breed-info-grid">

                  <div>

                    <span>
                      Temperament
                    </span>

                    <p>
                      {selectedBreed.temperament}
                    </p>

                  </div>

                  <div>

                    <span>
                      Origin
                    </span>

                    <p>
                      {selectedBreed.origin || "Unknown"}
                    </p>

                  </div>

                  <div>

                    <span>
                      Lifespan
                    </span>

                    <p>
                      {selectedBreed.life_span}
                    </p>

                  </div>

                  <div>

                    <span>
                      Weight
                    </span>

                    <p>

                      {selectedBreed.weight?.metric}
                      {" "}kg

                    </p>

                  </div>

                  {selectedBreed.bred_for && (

                    <div>

                      <span>
                        Bred For
                      </span>

                      <p>
                        {selectedBreed.bred_for}
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  );

};

export default BreedExplorer;