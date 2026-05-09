import {
  useEffect,
  useMemo,
  useState
} from "react";

import DashboardLayout
  from "../../shared/components/layout/DashboardLayout";

import {
  Bell,
  Syringe,
  Calendar,
  AlertTriangle
} from "lucide-react";

import {
  getAllRecords
} from "../../records/services/healthRecordService";

import "../styles/Notifications.css";

const Notifications = () => {

  const [records, setRecords] =
    useState([]);

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

  /* GENERATE NOTIFICATIONS */

  const notifications =
    useMemo(() => {

      const today =
        new Date();

      return records
        .filter(
          (record) =>
            record.nextDueDate
        )

        .map((record) => {

          const dueDate =
            new Date(
              record.nextDueDate
            );

          const diffTime =
            dueDate - today;

          const diffDays =
            Math.ceil(
              diffTime /
              (
                1000 *
                60 *
                60 *
                24
              )
            );

          let type =
            "Reminder";

          let message =
            `${record.title} is coming up soon.`;

          let color =
            "blue";

          let icon =
            <Calendar size={22} />;

          let dateLabel =
            record.nextDueDate;

          /* OVERDUE */

          if (
            diffDays < 0
          ) {

            type =
              "Missed Reminder";

            message =
              `${record.title} is overdue.`;

            color =
              "red";

            icon =
              <AlertTriangle size={22} />;

            dateLabel =
              "Overdue";

          }

          /* TODAY */

          else if (
            diffDays === 0
          ) {

            type =
              "Due Today";

            message =
              `${record.title} is due today.`;

            color =
              "orange";

            icon =
              <Syringe size={22} />;

            dateLabel =
              "Today";

          }

          /* TOMORROW */

          else if (
            diffDays === 1
          ) {

            type =
              "Due Tomorrow";

            message =
              `${record.title} is due tomorrow.`;

            color =
              "orange";

            icon =
              <Syringe size={22} />;

            dateLabel =
              "Tomorrow";

          }

          /* UPCOMING */

          else if (
            diffDays <= 7
          ) {

            type =
              "Upcoming Reminder";

            message =
              `${record.title} is due in ${diffDays} days.`;

            color =
              "blue";

            icon =
              <Calendar size={22} />;

          }

          return {

            id: record.id,

            type,

            pet:
              record.pet?.name ||
              "Unknown Pet",

            message,

            date:
              dateLabel,

            icon,

            color,

            clinic:
              record.clinic,

            veterinarian:
              record.veterinarian,

          };

        })

        .sort((a, b) =>
          a.date.localeCompare(
            b.date
          )
        );

    }, [records]);

  return (

    <DashboardLayout>

      <div className="notifications-page">

        {/* HEADER */}

        <div className="notifications-header">

          <div>

            <p className="notification-small">

              Pawfolio Alerts

            </p>

            <h1>

              <Bell size={34} />

              Notifications

            </h1>

          </div>

        </div>

        {/* EMPTY */}

        {notifications.length === 0 ? (

          <div className="empty-notifications">

            <h3>
              No notifications
            </h3>

            <p>
              You're all caught up.
            </p>

          </div>

        ) : (

          <div className="notifications-grid">

            {notifications.map((item) => (

              <div
                className="notification-card"
                key={item.id}
              >

                {/* ICON */}

                <div
                  className={`notification-icon-box ${item.color}`}
                >

                  {item.icon}

                </div>

                {/* CONTENT */}

                <div className="notification-content">

                  <div className="notification-top">

                    <div>

                      <h3>
                        {item.type}
                      </h3>

                      <p className="notification-pet">

                        {item.pet}

                      </p>

                    </div>

                    <span>

                      {item.date}

                    </span>

                  </div>

                  <p className="notification-message">

                    {item.message}

                  </p>

                  <div className="notification-extra">

                    <p>

                      <strong>
                        Vet:
                      </strong>

                      {" "}

                      Dr. {
                        item.veterinarian
                      }

                    </p>

                    <p>

                      <strong>
                        Clinic:
                      </strong>

                      {" "}

                      {item.clinic}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>

  );

};

export default Notifications;