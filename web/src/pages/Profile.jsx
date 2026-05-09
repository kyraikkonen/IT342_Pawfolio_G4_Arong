import {
  useState
} from "react";

import DashboardLayout
  from "../components/layout/DashboardLayout";

import {
  User,
  Mail,
  Camera
} from "lucide-react";

import {
  updateProfileImage,
  updateProfile
} from "../services/userService";

import "./Profile.css";

const Profile = () => {

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [user, setUser] =
    useState(currentUser);

  /* IMAGE */

  const handleImageUpload =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend =
        async () => {

          try {

            const updatedUser =
              await updateProfileImage(
                user.id,
                reader.result
              );

            localStorage.setItem(
              "user",
              JSON.stringify(updatedUser)
            );

            setUser(updatedUser);

          } catch (error) {

            console.error(error);

          }

        };

      reader.readAsDataURL(file);

    };

  /* INPUTS */

  const handleChange =
    (e) => {

      setUser({

        ...user,

        [e.target.name]:
          e.target.value,

      });

    };

  /* SAVE */

  const handleSave =
    async () => {

      try {

        const updatedUser =
          await updateProfile(user);

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        alert(
          "Profile updated!"
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <DashboardLayout>

      <div className="profile-page">

        <div className="profile-header">

          <p>
            Pawfolio Account
          </p>

          <h1>
            My Profile
          </h1>

        </div>

        <div className="profile-card">

          {/* LEFT */}

          <div className="profile-left">

            <div className="profile-image-wrapper">

              <img
                src={
                  user?.image ||
                  "https://i.pravatar.cc/300"
                }
                alt="Profile"
                className="profile-image"
              />

              <label
                htmlFor="imageUpload"
                className="upload-btn"
              >

                <Camera size={18} />

              </label>

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleImageUpload
                }
              />

            </div>

            <p className="upload-text">

              Click camera icon
              to upload photo

            </p>

          </div>

          {/* RIGHT */}

          <div className="profile-right">

            <div className="profile-field">

              <label>

                <User size={18} />

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={user?.name || ""}
                onChange={handleChange}
              />

            </div>

            <div className="profile-field">

              <label>

                <Mail size={18} />

                Email Address

              </label>

              <input
                type="email"
                name="email"
                value={user?.email || ""}
                onChange={handleChange}
              />

            </div>

            <button
              className="save-profile-btn"
              onClick={handleSave}
            >

              Save Changes

            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default Profile;