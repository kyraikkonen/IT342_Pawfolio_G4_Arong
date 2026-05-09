import {
  useState
} from "react";

import {
  X
} from "lucide-react";

import {
  updateRecord,
  deleteRecord
} from "../services/healthRecordService";

import "../styles/AddHealthRecordModal.css";

const EditHealthRecordModal = ({
  record,
  onClose,
  onUpdated,
  onDeleted
}) => {

  const [formData, setFormData] =
    useState({

      ...record,

      hasNextDueDate:
        !!record.nextDueDate,

    });

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const payload = {

          ...formData,

          nextDueDate:
            formData.hasNextDueDate

              ? formData.nextDueDate
              : "",

        };

        const updated =
          await updateRecord(
            record.id,
            payload
          );

        onUpdated(updated);

        onClose();

      } catch (error) {

        console.error(error);

      }

    };

  const handleDelete =
    async () => {

      const confirmDelete =
        window.confirm(
          "Delete this record?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteRecord(
          record.id
        );

        onDeleted(record.id);

        onClose();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div className="modal-overlay">

      <div className="record-modal">

        {/* HEADER */}

        <div className="modal-header">

          <h2>
            Edit Record
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >

            <X size={24} />

          </button>

        </div>

        <form
          className="record-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <div className="form-group">

              <label>
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Record Type
              </label>

              <select
                name="recordType"
                value={formData.recordType}
                onChange={handleChange}
              >

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

            </div>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Veterinarian
              </label>

              <input
                type="text"
                name="veterinarian"
                value={formData.veterinarian}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Clinic
              </label>

              <input
                type="text"
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Record Date
              </label>

              <input
                type="date"
                name="recordDate"
                value={formData.recordDate}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>
                  Completed
                </option>

                <option>
                  Upcoming
                </option>

                <option>
                  Missed
                </option>

              </select>

            </div>

          </div>

          {/* CHECKBOX */}

          <div className="checkbox-group">

            <input
              type="checkbox"
              name="hasNextDueDate"
              checked={
                formData.hasNextDueDate
              }
              onChange={handleChange}
            />

            <label>
              This record has a next due date
            </label>

          </div>

          {formData.hasNextDueDate && (

            <div className="form-group">

              <label>
                Next Due Date
              </label>

              <input
                type="date"
                name="nextDueDate"
                value={
                  formData.nextDueDate
                }
                onChange={handleChange}
              />

            </div>

          )}


          <div className="form-group">

            <label>
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="delete-btn"
              onClick={handleDelete}
            >

              Delete

            </button>

            <button
              type="submit"
              className="save-btn"
            >

              Save Changes

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditHealthRecordModal;