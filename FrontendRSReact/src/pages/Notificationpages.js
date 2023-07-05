import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateNotifications } from "../config/notification/notificationSlice";
import "../assets/css/notificationpages.css";

const NotificationPages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.id);
  const notifications = useSelector(state => state.notification.notifications);

  function handleCardOnClick(notification) {
    const orderId = notification.message.split(",")[0].trim();
    
    if (notification.notificationStatus === "UNREAD") {
      changeNotificationStatusToRead(notification.id);
    }
    navigate("/orders", { state: isNaN(orderId) ? null : orderId });
  }

  function changeNotificationStatusToRead(notificationId) {
    try {
      axios.put(`http://rsudsamrat.site:8990/api/v1/notifikasi/${notificationId}`, {
        notificationStatus: ["READ"]
      })
      .then((res) =>{
        if(res.status === 200) {
          const newNotifications = notifications.map(notification => {
            if(notificationId === notification.id) {
              return {
                ...notification,
                notificationStatus: "READ"
              };
            }

            return notification;
          });

          dispatch(updateNotifications(newNotifications));
        }
      });
    }
    catch (err) {
      console.log("Unable to update notification status.", err.message);
    }
  }

  return (
    <div id="notifications-page">
      {notifications.length === 0 ? (
        <p>Loading notifications...</p>
      ) : (
        <div className="cards-container">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification-card"
              onClick={() => handleCardOnClick(notification)}
            >
              <div className="title">{notification.notificationStatus}</div>
              <div className="text">{notification.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPages;
