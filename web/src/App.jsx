import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login
  from "./pages/Login";

import Register
  from "./pages/Register";

import Dashboard
  from "./pages/Dashboard";

import BreedExplorer
  from "./pages/BreedExplorer";

import PetDetails
  from "./pages/PetDetails";

import Notifications
  from "./pages/Notifications";

import HealthRecords
  from "./pages/HealthRecords";

import Profile
  from "./pages/Profile";

import Settings
  from "./pages/Settings";

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