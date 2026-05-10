import {
  LayoutDashboard,
  PawPrint,
  FileText,
  Bell,
  User,
  Settings,
  Dog
} from "lucide-react";

import {
  Link,
  useLocation
} from "react-router-dom";

import "../../styles/Sidebar.css";

const Sidebar = () => {

  const location = useLocation();

  return (
    <div className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-icon">
          <PawPrint size={22} />
        </div>

        <h2>Pawfolio</h2>

      </div>

      <div className="sidebar-links">

        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >

          <LayoutDashboard size={20} />

          <span>Dashboard</span>

        </Link>

        <Link
          to="/breed-explorer"
          className={
            location.pathname === "/breed-explorer"
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >

          <Dog size={20} />

          <span>Breed Explorer</span>

        </Link>

        <Link to="/health-records"
          className="sidebar-link"
        >

        <FileText size={20} />

        <span>
          Health Records
        </span>

</Link>

        <Link
  to="/notifications"
  className={
    location.pathname === "/notifications"
      ? "sidebar-link active"
      : "sidebar-link"
  }
>

          <Bell size={20} />

          <span>Notifications</span>

        </Link>

        <Link
          to="/profile"
          className={
            location.pathname === "/profile"
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >

          <User size={20} />

          <span>Profile</span>

        </Link>


          <Link
            to="/settings"
            className={
              location.pathname === "/settings"
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <Settings size={20} />

            <span>Settings</span>

          </Link>


      </div>

    </div>
  );
};

export default Sidebar;