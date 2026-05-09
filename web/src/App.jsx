import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login
  from "./features/auth/pages/Login";

import Register
  from "./features/auth/pages/Register";

import Dashboard
  from "./features/dashboard/pages/Dashboard";

import BreedExplorer
  from "./features/breeds/pages/BreedExplorer";

import PetDetails
  from "./features/pets/pages/PetDetails";

import Notifications
  from "./features/notifications/pages/Notifications";

import HealthRecords
  from "./features/records/pages/HealthRecords";

import Profile
  from "./features/profile/pages/Profile";

import Settings
  from "./features/profile/pages/Settings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* BREED EXPLORER */}

        <Route
          path="/breed-explorer"
          element={<BreedExplorer />}
        />

        {/* PET DETAILS */}

        <Route
          path="/pets/:id"
          element={<PetDetails />}
        />

        {/* HEALTH RECORDS */}

        <Route
          path="/health-records"
          element={<HealthRecords />}
        />

        {/* NOTIFICATIONS */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

         <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>

    </BrowserRouter>

  );

}

export default App;