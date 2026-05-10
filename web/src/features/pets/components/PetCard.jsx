import { Link } from "react-router-dom";
import "./PetCard.css";

const PetCard = ({ pet }) => {

  return (
    <div className="pet-card">

      <div className="pet-top">

        <img
          src={pet.image}
          alt={pet.name}
        />

        <span
          className={
            pet.status === "Up to date"
              ? "status green"
              : "status orange"
          }
        >
          {pet.status}
        </span>

      </div>

      <h3>{pet.name}</h3>

      <p className="pet-breed">
        {pet.breed}
      </p>

      <p className="pet-info">
        {pet.age} • {pet.gender}
      </p>

      <div className="pet-footer">

        <span>
          {pet.records} records
        </span>

        <Link to={`/pets/${pet.id}`}>
          <button>
            View
          </button>
        </Link>

      </div>

    </div>
  );
};

export default PetCard;