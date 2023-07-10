import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdClose } from "react-icons/md";
import "../assets/css/notificationpanel.css";

export default function NotificationPanel({
  notifications = null,
  getNotifications,
  hideNotificationPanel,
}) {
  const navigate = useNavigate();

  let unreadNotifications = [];
  let readNotifications = [];
  let filteredNotifications = null;

  if (notifications) {
    unreadNotifications = notifications.filter(
      (notification) => notification.notificationStatus === "UNREAD"
    );
    readNotifications = notifications.filter(
      (notification) => notification.notificationStatus === "READ"
    );
    filteredNotifications = [...unreadNotifications, ...readNotifications];
  }

  function handleNotificationOnClick(notification) {
    const orderId = notification.message.split(",")[0].trim();

    if (notification.notificationStatus === "UNREAD") {
      changeNotificationStatusToRead(notification.id);
    }

    hideNotificationPanel();

    if (!isNaN(orderId)) navigate(`/orders/${orderId}`);
    else navigate("/orders");
  }

  function changeNotificationStatusToRead(notificationId) {
    try {
      axios
        .put(
          `http://rsudsamrat.site:8990/api/v1/notifikasi/${notificationId}`,
          {
            notificationStatus: ["READ"],
          }
        )
        .then((res) => {
          if (res.status === 200) {
            getNotifications();
          }
        });
    } catch (err) {
      console.log("Unable to update notification status.", err.message);
    }
  }

  return (
    <div className="notification-panel">
      <div className="header">
        <div className="title">Notifications</div>
        <div className="close-button" onClick={hideNotificationPanel}>
          <MdClose />
        </div>
      </div>

      <div>Unread: {unreadNotifications.length}</div>
      <div>Read: {readNotifications.length}</div>

      {notifications === null ? (
        <div className="body">Loading notifications ...</div>
      ) : notifications.length === 0 ? (
        <div className="body">Notification is empty</div>
      ) : (
        filteredNotifications.map((notification, index) => (
          <div
            key={index}
            className="item"
            onClick={() => handleNotificationOnClick(notification)}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="title">{notification.notificationStatus}</div>
              <div className="body" style={{ marginLeft: "8px" }}>
                ({notification.sender})
              </div>
            </div>
            <div className="body">{notification.message}</div>
          </div>
        ))
      )}
    </div>
  );
}
