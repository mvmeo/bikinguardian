import { useNotification } from "../context/NotificationContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Notifications = () => {
  const {
    getNotifications,
    notifications,
    deleteNotifications,
  } = useNotification();

  useEffect(() => {
    getNotifications();
    const interval = setInterval(() => {
      getNotifications();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const deleteAll = () => {
    deleteNotifications();
    console.log("Eliminando notificaciones");
  };

  const hayNotificaciones = notifications.length > 0;

  return (
    <div className="container mx-auto p-4 space-y-3">
      <div className="flex space-x-2">
        <Link to="/panel">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </Link>
        <h2 className="font-bold uppercase">Notificaciones</h2>
      </div>
      <div className="space-y-2">

        {hayNotificaciones ? (
          notifications.map((notification) => (
            <>
              <div key={notification.id} className="bg-white rounded p-4">
                {notification.descripcion}
              </div>
            </>
          ))
        ) : (
          <div className=" flex justify-center p-20">No hay notificaciones pendientes</div>
        )}
      </div>
      <div>
        <button onClick={deleteAll} className="bg-red-600 w-full text-white rounded p-4 mt-3">Eliminar todo</button>
      </div>
    </div>
  );
};

export default Notifications;
