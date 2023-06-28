import { useAuth } from "../context/AuthContext";
import Box from "../components/Box";
import { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

const Panel = () => {
  const { user } = useAuth();
  const { getNotifications, notifications } = useNotification();

  useEffect(() => {
    getNotifications();
  }, []);

  const hayNotificaciones = notifications.length > 0 ? true : false;

  if (user.admin) {
    return (
      <>
        <div className="container mx-auto p-4">
          <Header className="" />
          <Link to="/events">
            <div className=" my-3 ">
              <Box>
                <div className="py-10 px-16">
                  <h2 className="text-[30px] font-bold flex align-middle justify-center">
                    Ver eventos
                  </h2>
                </div>
              </Box>
            </div>
          </Link>
          <Link to="/notifications">
            <div className=" my-3 ">
              <Box>
                <div className="py-3 px-16 flex align-middle justify-center">
                  <div className="flex space-x-2">
                    {hayNotificaciones ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                    )}
                    {notifications.length === 1 ? (
                      <h2 className="font-bold uppercase">
                        Tienes {notifications.length} notificacion
                      </h2>
                    ) : (
                      <h2 className="font-bold uppercase">
                        Tienes {notifications.length} notificaciones
                      </h2>
                    )}
                  </div>
                </div>
              </Box>
            </div>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container mx-auto p-4">
          <Header className="" />
          <Link to="/profile">
            <div className=" my-3 ">
              <Box>
                <div className="py-10 px-16">
                  <h2 className="text-[30px] font-bold flex align-middle justify-center">
                    Ir al perfil
                  </h2>
                </div>
              </Box>
            </div>
          </Link>
          <Link to="/create-event">
            <div className=" my-3 ">
              <Box>
                <div className="py-3 px-16 flex align-middle justify-center">
                  <h2 className="font-bold uppercase">Crear evento +</h2>
                </div>
              </Box>
            </div>
          </Link>
        </div>
      </>
    );
  }
};

export default Panel;
