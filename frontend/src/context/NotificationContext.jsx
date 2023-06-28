import { createContext, useState, useContext } from "react";
import {
  createNotificationRequest,
  getNotificationsRequest,
  deleteNotificationRequest,
  deleteNotificationsRequest,
} from "../api/notifications";
const NotificactionContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificactionContext);
  if (!context) {
    throw new Error(
      "useNotification debe estar dentro del proveedor EventProvider"
    );
  }
  return context;
};

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const res = await getNotificationsRequest();
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNotification = async (notification) => {
    const res = await createNotificationRequest(notification);
  };

  const deleteNotification = async (id) => {
    const res = await deleteNotificationRequest(id);
  };

  const deleteNotifications = async () => {
    const res = await deleteNotificationsRequest();
  };

  return (
    <NotificactionContext.Provider
      value={{
        createNotification,
        getNotifications,
        deleteNotification,
        deleteNotifications,
        notifications,
      }}
    >
      {children}
    </NotificactionContext.Provider>
  );
}
