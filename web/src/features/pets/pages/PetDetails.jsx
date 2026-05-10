import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import DashboardLayout
  from "../../shared/components/layout/DashboardLayout";

import AddHealthRecordModal
  from "../../records/components/AddHealthRecordModal";

import EditHealthRecordModal
  from "../../records/components/EditHealthRecordModal";

import ViewHealthRecordModal
  from "../../records/components/ViewHealthRecordModal";

import {
  getPetById
} from "../services/petService";

import {
  getRecords,
  createRecord,
  deleteRecord
} from "../../records/services/healthRecordService";

import "../styles/PetDetails.css";

const PetDetails = () => {

  const { id } = useParams();

  /* STATES */

  const [pet, setPet] =
    useState(null);

  const [records, setRecords] =
    useState([]);

  const [openRecordModal,
    setOpenRecordModal] =
    useState(false);

  const [selectedRecord,
    setSelectedRecord] =
    useState(null);

  const [openEditModal,
    setOpenEditModal] =
    useState(false);

  const [openViewModal,
    setOpenViewModal] =
    useState(false);

  /* FETCH */

  useEffect(() => {

    fetchPet();
    fetchRecords();

  }, [id]);

  const fetchPet =
    async () => {

      try {

        const data =
          await getPetById(id);

        setPet(data);

      } catch (error) {

        console.error(error);

      }

    };

  const fetchRecords =
    async () => {

      try {

        const data =
          await getRecords(id);

        setRecords(data);

      } catch (error) {

        console.error(error);

      }

    };

  /* ADD RECORD */

  const handleAddRecord =
    async (recordData) => {

      try {

        const newRecord =
          await createRecord(
            id,
            recordData
          );

        setRecords([
          ...records,
          newRecord
        ]);

        setOpenRecordModal(false);

      } catch (error) {

        console.error(
          "Create record error:",
          error
        );

      }

    };

  /* UPDATE RECORD */

  const handleUpdatedRecord =
    (updatedRecord) => {

      setRecords(

        records.map((record) =>

          record.id ===
          updatedRecord.id

            ? updatedRecord
            : record

        )

      );

    };

  /* DELETE RECORD */

  const handleDeletedRecord =
    (recordId) => {

      setRecords(

        records.filter(

          (record) =>
            record.id !== recordId

        )

      );

    };

  const handleDeleteRecord =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this record?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteRecord(id);

        setRecords((prev) =>

          prev.filter(
            (record) =>
              record.id !== id
          )

        );

        setOpenViewModal(false);
        setOpenEditModal(false);

      } catch (error) {

        console.error(error);

      }

    };

  /* LOADING */

  if (!pet) {

    return (

      <DashboardLayout>

        <p>
          Loading...
        </p>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="pet-details-page">

        {/* PET HEADER */}

        <div className="pet-header-card">

          <img
            src={pet.image}
            alt={pet.name}
            className="pet-detail-image"
          />

          <div className="pet-header-info">

            <h1>
              {pet.name}
            </h1>

            <p>

              {pet.species}
              {" • "}

              {pet.breed}
              {" • "}

              {pet.age}
              {" • "}

              {pet.gender}

            </p>

            <span className="status green">

              Up to date

            </span>

          </div>

        </div>

        {/* RECORDS */}

        <div className="records-section">

          <div className="records-header">

            <h2>
              Health Records
            </h2>

            <button
              className="add-record-btn"
              onClick={() =>
                setOpenRecordModal(true)
              }
            >

              Add Record

            </button>

          </div>

          {records.length === 0 ? (

            <div className="empty-records">

              <p>
                No records yet.
              </p>

            </div>

          ) : (

            <div className="records-list">

              {records.map((record) => (

                <div
                  className="record-card"
                  key={record.id}

                  onClick={() => {

                    setSelectedRecord(record);

                    setOpenViewModal(true);

                  }}
                >

                  {/* LEFT */}

                  <div className="record-left">

                    <div className="record-dot"></div>

                    <div className="record-line"></div>

                  </div>

                  {/* CONTENT */}

                  <div className="record-content">

                    <div className="record-top">

                      <div>

                        <h3>
                          {record.title}
                        </h3>

                        <p>
                          {record.recordType}
                        </p>

                        <p>
                          Dr. {record.veterinarian}
                        </p>

                        <p>
                          {record.clinic}
                        </p>

                      </div>

                      <span className="record-date">

                        {record.recordDate}

                      </span>

                    </div>

                    {/* ACTIONS */}

                    <div className="record-actions">

                      <button
                        className="record-view-btn"

                        onClick={(e) => {

                          e.stopPropagation();

                          setSelectedRecord(record);

                          setOpenViewModal(true);

                        }}
                      >

                        View

                      </button>

                      <button
                        className="record-edit-btn"

                        onClick={(e) => {

                          e.stopPropagation();

                          setSelectedRecord(record);

                          setOpenEditModal(true);

                        }}
                      >

                        Edit

                      </button>

                      <button
                        className="record-delete-btn"

                        onClick={(e) => {

                          e.stopPropagation();

                          handleDeleteRecord(
                            record.id
                          );

                        }}
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* ADD MODAL */}

      <AddHealthRecordModal

        isOpen={openRecordModal}

        onClose={() =>
          setOpenRecordModal(false)
        }

        onSave={handleAddRecord}

      />

      {/* VIEW MODAL */}

      {openViewModal &&
        selectedRecord && (

        <ViewHealthRecordModal

          record={selectedRecord}

          onClose={() =>
            setOpenViewModal(false)
          }

          onEdit={() => {

            setOpenViewModal(false);

            setOpenEditModal(true);

          }}

          onDelete={
            handleDeleteRecord
          }

        />

      )}

      {/* EDIT MODAL */}

      {openEditModal &&
        selectedRecord && (

        <EditHealthRecordModal

          record={selectedRecord}

          onClose={() =>
            setOpenEditModal(false)
          }

          onUpdated={
            handleUpdatedRecord
          }

          onDeleted={
            handleDeletedRecord
          }

        />

      )}

    </DashboardLayout>

  );

};

export default PetDetails;