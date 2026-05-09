// src/pages/Dashboard.jsx

import DashboardLayout
  from "../../shared/components/layout/DashboardLayout";

import {
  PawPrint,
  FileText,
  Syringe,
  Plus
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  getPetsByOwner,
  createPet,
  deletePet
} from "../../pets/services/petService";

import AddPetModal
  from "../../pets/components/AddPetModal";

import {
  useNavigate
} from "react-router-dom";

import "../styles/Dashboard.css";

const Dashboard = () => {

  const navigate =
    useNavigate();

  /* CURRENT USER */

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* STATES */

  const [pets, setPets] =
    useState([]);

  const [showModal,
    setShowModal] =
    useState(false);

  /* FETCH PETS */

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

  /* ADD PET */

  const handleAddPet =
    async (petData) => {

      try {

        const newPet =
          await createPet(
            petData,
            currentUser.id
          );

        setPets([
          ...pets,
          newPet
        ]);

        setShowModal(false);

      } catch (error) {

        console.error(
          "Create pet error:",
          error
        );

      }
    };

  /* DELETE PET */

  const handleDeletePet =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this pet?"
        );

      if (!confirmDelete)
        return;

      try {

        await deletePet(id);

        setPets((prev) =>
          prev.filter(
            (pet) =>
              pet.id !== id
          )
        );

      } catch (error) {

        console.error(
          "Delete pet error:",
          error
        );

      }
    };

  /* ANALYTICS */

  const totalPets =
    pets.length;

  const totalRecords =
    pets.reduce(

      (total, pet) =>

        total +
        (pet.records?.length || 0),

      0
    );

  const vaccinesDue =
  pets.reduce((total, pet) => {

    const upcomingVaccines =
      pet.records?.filter(

        (record) =>

          record.recordType ===
            "Vaccination" &&

          record.status ===
            "Upcoming"

      ).length || 0;

    return total + upcomingVaccines;

  }, 0);

  return (

    <DashboardLayout>

      <div className="dashboard-page">

        {/* HERO */}

        <div className="hero-banner">

          <div>

            <p className="hero-small">
              Pawfolio Dashboard
            </p>

            <h1>

              Hello
              {" "}
              {currentUser?.name || "User"}
              {" "}
              👋

            </h1>

            <p className="hero-description">

              Manage your pets'
              health records,
              vaccines,
              and documents
              in one place.

            </p>

          </div>

          <button
            className="add-pet-btn"
            onClick={() =>
              setShowModal(true)
            }
          >

            <Plus size={18} />

            Add Pet

          </button>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon blue">

              <PawPrint />

            </div>

            <div>

              <h2>
                {totalPets}
              </h2>

              <p>
                Total Pets
              </p>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">

              <FileText />

            </div>

            <div>

              <h2>
                {totalRecords}
              </h2>

              <p>
                Total Records
              </p>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon orange">

              <Syringe />

            </div>

            <div>

              <h2>
                {vaccinesDue}
              </h2>

              <p>
                Vaccines Due
              </p>

            </div>

          </div>

        </div>

        {/* SECTION */}

        <div className="section-header">

          <h2>
            My Pets
          </h2>

        </div>

        {/* PET GRID */}

        <div className="pet-grid">

          {pets.map((pet) => (

            <div
              className="pet-card"
              key={pet.id}
            >

              {/* TOP */}

              <div className="pet-top">

                <img
                  src={pet.image}
                  alt={pet.name}
                />

                <span
                  className={
                    pet.status ===
                    "Up to date"

                      ? "status green"

                      : "status orange"
                  }
                >

                  {pet.status}

                </span>

              </div>

              {/* INFO */}

              <h3>
                {pet.name}
              </h3>

              <p className="pet-breed">

                {pet.species} • {pet.breed}

              </p>

              <p className="pet-info">

                {pet.age}
                {" • "}
                {pet.gender}

              </p>

              {/* FOOTER */}

              <div className="pet-footer">

                <span>

                  {pet.records?.length || 0}
                  {" "}
                  records

                </span>

                <div className="pet-footer-right">

                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(
                        `/pets/${pet.id}`
                      )
                    }
                  >

                    View

                  </button>

                  <button
                    className="delete-pet-btn"
                    onClick={() =>
                      handleDeletePet(
                        pet.id
                      )
                    }
                  >

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

          {/* ADD CARD */}

          <div
            className="add-card"
            onClick={() =>
              setShowModal(true)
            }
          >

            <div className="add-circle">

              <Plus />

            </div>

            <p>
              Add New Pet
            </p>

          </div>

        </div>

        {/* MODAL */}

        {showModal && (

          <AddPetModal

            onClose={() =>
              setShowModal(false)
            }

            onSave={handleAddPet}

          />

        )}

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;