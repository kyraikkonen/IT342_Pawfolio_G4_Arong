import {
  useState
} from "react";

import {
  X
} from "lucide-react";

import "./AddHealthRecordModal.css";

const AddHealthRecordModal = ({
  isOpen,
  onClose,
  onSave
}) => {

  const [formData, setFormData] =
    useState({

      title: "",
      recordType: "",
      veterinarian: "",
      clinic: "",
      notes: "",
      status: "Completed",

      recordDate: "",

      hasNextDue: false,

      nextDueDate: "",
    });

  if (!isOpen) return null;

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
    async () => {

      try {

        const payload = {

          ...formData,

          nextDueDate:
            formData.hasNextDue

              ? formData.nextDueDate

              : "",

        };

        await onSave(payload);

        setFormData({

          title: "",
          recordType: "",
          veterinarian: "",
          clinic: "",
          notes: "",
          status: "Completed",

          recordDate: "",

          hasNextDue: false,

          nextDueDate: "",
        });

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div className="modal-overlay">

      <div className="record-modal">

        <div className="modal-header">

          <h2>Add Health Record</h2>

          <button
            className="close-btn"
            onClick={onClose}>
            <X size={24} />
          </button>

        </div>

        <div className="record-form">

          <div className="form-grid">

            <div className="form-group">

              <label>Record Title</label>

              <input
                type="text"
                name="title"
                placeholder="Anti-Rabies Vaccine"
                value={formData.title}
                onChange={handleChange}/>

            </div>

            <div className="form-group">

              <label>Record Type</label>

              <select
                name="recordType"
                value={formData.recordType}
                onChange={handleChange}>

                <option value="">
                  Select type
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
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>Veterinarian</label>

              <input
                type="text"
                name="veterinarian"
                placeholder="Dr. Santos"
                value={formData.veterinarian}
                onChange={handleChange}/>
            </div>

            <div className="form-group">

              <label>Clinic</label>

              <input
                type="text"
                name="clinic"
                placeholder="Happy Pets Clinic"
                value={formData.clinic}
                onChange={handleChange}/>

            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>Record Date</label>

              <input
                type="date"
                name="recordDate"
                value={formData.recordDate}
                onChange={handleChange}/>

            </div>
          </div>

          <div className="form-group checkbox-group">

            <label>

              <input
                type="checkbox"
                name="hasNextDue"
                checked={formData.hasNextDue}
                onChange={handleChange}/>

              This record has a next due date

            </label>

          </div>

          {formData.hasNextDue && (

            <div className="form-group">

              <label>
                Next Due Date
              </label>

              <input
                type="date"
                name="nextDueDate"
                value={formData.nextDueDate}
                onChange={handleChange}
              />

            </div>

          )}

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

          <div className="form-group">

            <label>
              Notes
            </label>

            <textarea
              name="notes"
              placeholder="Additional details..."
              value={formData.notes}
              onChange={handleChange}
            />

          </div>

        </div>

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Save Record
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddHealthRecordModal;