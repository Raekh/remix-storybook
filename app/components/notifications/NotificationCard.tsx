import { AnimatePresence, motion } from "framer-motion";
import { Notification, useNotification } from "~/contexts/NotificationContext";

type NotificationCardProps = {
  notification: Notification;
};

const dropIn = {
  hidden: {
    opacity: 0,
    y: "-10vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    y: "-5vh",
  },
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { removeNotification } = useNotification();
  return (
    <AnimatePresence onExitComplete={() => removeNotification(notification.id)}>
      {!notification.hidden && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`notification-card`}
        >
          <div className="notification-card__title">{notification.title}</div>
          <div className="notification-card__content">{notification.id}</div>
          <div className="notification-card__content">
            {notification.content}
          </div>
          <div className="notification-card__content">
            {notification.hidden ? 1 : 0}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationCard;
