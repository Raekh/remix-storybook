import { useNotification } from "~/contexts/NotificationContext";

const Index = () => {
  const { notifications, setNotifications, addNotification } =
    useNotification();

  const createNotification = () => {
    const notification = {
      title: "Notification Title",
      content: "Notification Content",
      theme: "primary",
    };

    addNotification(notification);
  };

  const removeNotification = () => {
    // remove the first notification
    setNotifications(notifications.slice(1));
  };

  return (
    <div>
      <h1>Welcome</h1>

      <p>
        Remix is a full stack web framework by the creators of React Router.
        This is a simple blog app from the Traversy Media Remix crash course.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button className="btn" onClick={createNotification}>
          Create notification
        </button>
        <button className="btn btn-reverse" onClick={removeNotification}>
          Remove notification
        </button>
      </div>
    </div>
  );
};

export default Index;
