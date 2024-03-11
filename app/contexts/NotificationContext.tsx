import {
  Context,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

export type Notification = {
  id: string;
  title: string;
  content: string;
  //@todo: refine
  theme: string;
  hidden: boolean;
};

type NewNotificationProps = Omit<Notification, "id" | "hidden">;

type NotificationStateType = {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (
    notification: NewNotificationProps,
    settings?: typeof NOTIFICATION_SETTINGS,
  ) => void;
  removeNotification: (id: string) => void;
};

const initialState: NotificationStateType = {
  notifications: [],
  setNotifications: () => {},
  addNotification: () => {},
  removeNotification: () => {},
};

const NOTIFICATION_SETTINGS = {
  duration: 3000,
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

const NotificationContext: Context<NotificationStateType> =
  createContext(initialState);

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialState.notifications,
  );

  const addNotification = (
    partialNotification: NewNotificationProps,
    settings = NOTIFICATION_SETTINGS,
  ) => {
    const newNotification = {
      ...partialNotification,
      id: uuid(),
      hidden: false,
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === newNotification.id ? { ...n, hidden: true } : n,
        ),
      );
    }, settings.duration);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
