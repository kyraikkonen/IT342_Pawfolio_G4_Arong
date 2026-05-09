import {
  Bell,
  Search,
  ChevronDown
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  getPetsByOwner
} from "../../../pets/services/petService";

import "../../styles/Topbar.css";

const Topbar = () => {

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [showResults,
    setShowResults] =
    useState(false);

  const [pets,
    setPets] =
    useState([]);

  const [showDropdown,
    setShowDropdown] =
    useState(false);


  useEffect(() => {
    if (currentUser?.id) {
      fetchPets();
    }
  }, []);

  const fetchPets =
    async () => {
      try {
        const data =
          await getPetsByOwner(
            currentUser.id
          );

        setPets(data);

      } catch (error) {
        console.error(
          "Fetch pets error:",
          error
        );

      }
    };

  const filteredPets =
    pets.filter((pet) =>
      pet.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  return (
    <div className="topbar">

      <div className="topbar-search-wrapper">

        <div className="topbar-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search pets..."
            value={searchTerm}

            onChange={(e) => {
              setSearchTerm(
                e.target.value
              );
              setShowResults(true);
            }}

            onFocus={() =>
              setShowResults(true)
            }
          />

        </div>

        {showResults &&
          searchTerm.length > 0 && (

          <div className="search-results">

            {filteredPets.length === 0 ? (

              <div className="search-empty">

                No pets found.

              </div>

            ) : (

              filteredPets.map((pet) => (

                <Link
                  key={pet.id}

                  to={`/pets/${pet.id}`}

                  className="search-result-item"

                  onClick={() => {

                    setSearchTerm("");

                    setShowResults(false);

                  }}>

                  <img
                    src={pet.image}
                    alt={pet.name}
                  />

                  <div>

                    <h4>
                      {pet.name}
                    </h4>

                    <p>
                      {pet.breed}
                    </p>

                  </div>

                </Link>

              ))

            )}

          </div>

        )}

      </div>


      <div className="topbar-right">

        <Link
          to="/notifications"
          className="notification-icon">

          <Bell size={22} />

          <span className="notification-dot"></span>

        </Link>

<div className="user-dropdown">

  <div
  className="user-profile clickable"

  onClick={() =>
    setShowDropdown(
      !showDropdown
    )
  }
>

  <img
    src={
      currentUser?.image ||
      "https://i.pravatar.cc/300"
    }
  />

  <div>

    <h4>
      {currentUser?.name || "User"}
    </h4>

    <p>
      Pet Owner
    </p>

  </div>

  <ChevronDown
    size={18}
    className={
      showDropdown
        ? "rotate"
        : ""}/>

</div>

<div className={
    showDropdown
      ? "dropdown-menu show"
      : "dropdown-menu"
  }>

    <Link
      to="/profile"
      className="dropdown-item">
      Profile
    </Link>

    <Link
      to="/settings"
      className="dropdown-item"
    >

      Settings

    </Link>

    <button
      className="dropdown-logout"
      onClick={() => {

        localStorage.removeItem(
          "user"
        );

        window.location.href = "/";
}}>
      Logout

    </button>

  </div>

</div>

      </div>

    </div>
  );
};

export default Topbar;