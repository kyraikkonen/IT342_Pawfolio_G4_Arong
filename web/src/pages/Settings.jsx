import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import DashboardLayout
  from "../components/layout/DashboardLayout";

import {
  Bell,
  LogOut,
  Shield,
  Save
} from "lucide-react";

import "./Settings.css";

const Settings = () => {

  const navigate =
    useNavigate();

  const [notifications,
    setNotifications] =
    useState(

      JSON.parse(
        localStorage.getItem(
          "notificationsEnabled"
        )
      ) ?? true

    );

  const [autoReminders,
    setAutoReminders] =
    useState(

      JSON.parse(
        localStorage.getItem(
          "autoReminders"
        )
      ) ?? true

    );

  /* SAVE */

  const handleSave =
    () => {

      localStorage.setItem(
        "notificationsEnabled",
        JSON.stringify(notifications)
      );

      localStorage.setItem(
        "autoReminders",
        JSON.stringify(autoReminders)
      );

      alert(
        "Settings saved successfully!"
      );

    };

  /* LOGOUT */

  const handleLogout =
    () => {

      const confirmLogout =
        window.confirm(
          "Are you sure you want to logout?"
        );

      if (!confirmLogout)
        return;

      localStorage.removeItem(
        "user"
      );

      navigate("/");

    };

  return (

    <DashboardLayout>

      <div className="settings-page">

        <div className="settings-header">

          <p className="settings-small">
            Pawfolio Preferences
          </p>

          <h1>
            Settings
          </h1>

        </div>

        <div className="settings-card">

          {/* NOTIFICATIONS */}

          <div className="settings-section">

            <div className="settings-section-header">

              <Bell size={20} />

              <h2>
                Notifications
              </h2>

            </div>

            <div className="settings-item">

              <div>

                <h3>
                  Enable Notifications
                </h3>

                <p>
                  Receive reminders and alerts.
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

            <div className="settings-item">

              <div>

                <h3>
                  Automatic Reminders
                </h3>

                <p>
                  Receive vaccine due reminders.
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={autoReminders}
                  onChange={() =>
                    setAutoReminders(
                      !autoReminders
                    )
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

          </div>

          {/* ACCOUNT */}

          <div className="settings-section">

            <div className="settings-section-header">

              <Shield size={20} />

              <h2>
                Account
              </h2>

            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >

              <LogOut size={20} />

              Logout Account

            </button>

          </div>

          {/* SAVE */}

          <button
            className="save-settings-btn"
            onClick={handleSave}
          >

            <Save size={18} />

            Save Settings

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default Settings;