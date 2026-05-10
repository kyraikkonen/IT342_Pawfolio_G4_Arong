import {
  useEffect,
  useMemo,
  useState
} from "react";

import DashboardLayout
  from "../../shared/components/layout/DashboardLayout";

import EditHealthRecordModal
  from "../components/EditHealthRecordModal";

import {
  getAllRecords
} from "../services/healthRecordService";

import "../styles/HealthRecords.css";

const HealthRecords = () => {

  const [records, setRecords] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("All");

  const [typeFilter,
    setTypeFilter] =
    useState("All");

  const [sortBy,
    setSortBy] =
    useState("Newest");

  const [selectedRecord,
    setSelectedRecord] =
    useState(null);

  const [openEditModal,
    setOpenEditModal] =
    useState(false);

  /* FETCH */

  useEffect(() => {

    fetchRecords();

  }, []);

  const fetchRecords =
    async () => {

      try {

        const data =
          await getAllRecords();

        setRecords(data);

      } catch (error) {

        console.error(error);

      }

    };

  /* FILTER + SORT */

  const filteredRecords =
    useMemo(() => {

      let filtered =
        [...records];

      /* SEARCH */

      filtered =
        filtered.filter((record) =>

          record.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

        );

      /* STATUS */

      if (
        statusFilter !== "All"
      ) {

        filtered =
          filtered.filter(

            (record) =>

              record.status ===
              statusFilter

          );

      }

      /* TYPE */

      if (
        typeFilter !== "All"
      ) {

        filtered =
          filtered.filter(

            (record) =>

              record.recordType ===
              typeFilter

          );

      }

      /* SORT */

      filtered.sort((a, b) => {

        if (
          sortBy === "Newest"
        ) {

          return new Date(
            b.recordDate
          ) - new Date(
            a.recordDate
          );

        }

        if (
          sortBy === "Oldest"
        ) {

          return new Date(
            a.recordDate
          ) - new Date(
            b.recordDate
          );

        }

        return 0;

      });

      return filtered;

    }, [
      records,
      search,
      statusFilter,
      typeFilter,
      sortBy
    ]);

  /* UPDATE */

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

  /* DELETE */

  const handleDeletedRecord =
    (recordId) => {

      setRecords(

        records.filter(

          (record) =>

            record.id !==
            recordId

        )

      );

    };

  return (

    <DashboardLayout>

      <div className="records-page">

        {/* HEADER */}

        <div className="records-page-header">

          <div>

            <p className="records-subtitle">
              Pawfolio Medical Hub
            </p>

            <h1>
              Health Records
            </h1>

          </div>

        </div>

        {/* FILTERS */}

        <div className="records-toolbar">

          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Upcoming">
              Upcoming
            </option>

            <option value="Missed">
              Missed
            </option>

          </select>

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Types
            </option>

            <option>
              Vaccination
            </option>

            <option>
              Checkup
            </option>

            <option>
              Surgery
            </option>

            <option>
              Deworming
            </option>

            <option>
              Medication
            </option>

          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
          >

            <option>
              Newest
            </option>

            <option>
              Oldest
            </option>

          </select>

        </div>

        {/* RECORDS */}

        <div className="records-grid">

          {filteredRecords.length === 0 ? (

            <div className="empty-records-card">

              <h3>
                No records found
              </h3>

              <p>
                Try adjusting your filters.
              </p>

            </div>

          ) : (

            filteredRecords.map((record) => (

              <div
                className="health-record-card"
                key={record.id}
              >

                {/* TOP */}

                <div className="record-card-top">

                  <div>

                    <h3>
                      {record.title}
                    </h3>

                    <p>
                      {record.recordType}
                    </p>

                  </div>

                  <span
                    className={`record-status ${record.status.toLowerCase()}`}
                  >

                    {record.status}

                  </span>

                </div>

                {/* BODY */}

                <div className="record-details">

                  <p>
                    <strong>
                      Vet:
                    </strong>

                    {" "}

                    Dr. {
                      record.veterinarian
                    }
                  </p>

                  <p>
                    <strong>
                      Clinic:
                    </strong>

                    {" "}

                    {record.clinic}
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>

                    {" "}

                    {
                      record.recordDate
                    }
                  </p>

                  {record.nextDueDate && (

                    <p>

                      <strong>
                        Next Due:
                      </strong>

                      {" "}

                      {
                        record.nextDueDate
                      }

                    </p>

                  )}

                </div>

                {/* NOTES */}

                {record.notes && (

                  <div className="record-notes">

                    {record.notes}

                  </div>

                )}

                {/* ACTIONS */}

                <div className="record-actions">

                  <button
                    className="view-btn"
                    onClick={() => {

                      setSelectedRecord(record);

                      setOpenEditModal(true);

                    }}
                  >

                    View / Edit

                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* MODAL */}

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

export default HealthRecords;