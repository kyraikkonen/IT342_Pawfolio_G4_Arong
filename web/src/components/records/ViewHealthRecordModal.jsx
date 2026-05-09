import "./ViewHealthRecordModal.css";

const ViewHealthRecordModal = ({
  record,
  onClose,
  onEdit,
  onDelete
}) => {

  if (!record) return null;

  return (

    <div className="view-modal-overlay">

      <div className="view-record-modal">

        {/* HEADER */}

        <div className="view-modal-header">

          <div>

            <p className="record-type-badge">
              {record.recordType}
            </p>

            <h2>
              {record.title}
            </h2>

          </div>

          <button
            className="view-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* BODY */}

        <div className="view-record-content">

          <div className="view-grid">

            <div className="view-item">

              <span>
                Veterinarian
              </span>

              <p>
                Dr. {record.veterinarian}
              </p>

            </div>

            <div className="view-item">

              <span>
                Clinic
              </span>

              <p>
                {record.clinic}
              </p>

            </div>

            <div className="view-item">

              <span>
                Record Date
              </span>

              <p>
                {record.recordDate}
              </p>

            </div>

            <div className="view-item">

              <span>
                Status
              </span>

              <p
                className={
                  record.status ===
                  "Completed"

                    ? "status-completed"

                    : "status-upcoming"
                }
              >

                {record.status}

              </p>

            </div>

            {record.hasNextDue && (

              <div className="view-item">

                <span>
                  Next Due Date
                </span>

                <p>
                  {record.nextDueDate}
                </p>

              </div>

            )}

          </div>

          {/* NOTES */}

          <div className="view-notes">

            <span>
              Notes
            </span>

            <div className="notes-box">

              {record.notes || "No notes provided."}

            </div>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="view-actions">

          <button
            className="view-delete-btn"
            onClick={() =>
              onDelete(record.id)
            }
          >

            Delete

          </button>

          <button
            className="view-edit-btn"
            onClick={onEdit}
          >

            Edit Record

          </button>

        </div>

      </div>

    </div>

  );

};

export default ViewHealthRecordModal;