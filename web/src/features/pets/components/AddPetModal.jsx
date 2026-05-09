import { X, Upload } from "lucide-react";
import { useState } from "react";
import "../styles/AddPetModal.css";

const AddPetModal = ({
  onClose,
  onSave
}) => {

  const [formData, setFormData] =
    useState({
      name: "",
      breed: "",
      species: "",
      age: "",
      gender: "",
    });

  const [imagePreview, setImagePreview] =
    useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file =
      e.target.files[0];
    if (file) {
      setImagePreview(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const defaultDog =
      "https://cdn-icons-png.flaticon.com/512/616/616408.png";

    const defaultCat =
      "https://cdn-icons-png.flaticon.com/512/2138/2138440.png";

    const newPet = {
      name: formData.name,
      breed: formData.breed,
      species: formData.species,
      age: Number(formData.age),
      gender: formData.gender,
      image:
        imagePreview ||
        (
          formData.species === "Cat"
            ? defaultCat
            : defaultDog
        ),

      status: "Up to date"
    };

    try {
      await onSave(newPet);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-pet-modal">
        <div className="modal-header">
          <h2>Add New Pet</h2>

          <button
            className="close-btn"
            onClick={onClose}>
            <X size={22} />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="image-upload-section">

            <label htmlFor="petImage">

              <div className="image-preview">

                {imagePreview ? (

                  <img
                    src={imagePreview}
                    alt="preview"/>
                ) : (

                  <div className="upload-placeholder">

                    <Upload size={28} />

                    <p>Upload Pet Photo</p>

                  </div>
                )}
              </div>
            </label>

            <input
              type="file"
              id="petImage"
              accept="image/*"
              onChange={handleImageChange}
              hidden/>

          </div>

          <div className="form-grid">

            <div className="input-group">

              <label>Pet Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter pet name"
                value={formData.name}
                onChange={handleChange}
                required/>

            </div>

            <div className="input-group">

              <label>Species</label>

              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                required>

                <option value="">Select species</option>

                <option value="Dog">
                  Dog
                </option>

                <option value="Cat">
                  Cat
                </option>

              </select>

            </div>

            <div className="input-group">

              <label>
                Breed
              </label>

              <input
                type="text"
                name="breed"
                placeholder="Enter breed"
                value={formData.breed}
                onChange={handleChange}
                required/>

            </div>

            <div className="input-group">

              <label>
                Age
              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                required/>

            </div>

            <div className="input-group">

              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required>

                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>
          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}>
            Cancel
            </button>

            <button
              type="submit"
              className="save-btn">
              Save Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddPetModal;