import NotificationCard from "~/components/notifications/NotificationCard";
import { useNotification } from "~/contexts/NotificationContext";

const NotificationCenter = () => {
  const { notifications } = useNotification();
  return (
    <div className="notification-center">
      {notifications.map((notification, index) => (
        <NotificationCard key={index} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationCenter;
