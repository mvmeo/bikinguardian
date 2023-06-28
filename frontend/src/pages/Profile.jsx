import Box from "../components/Box";
import { useAuth } from "../context/AuthContext";
import { useContact } from "../context/ContactContext";
import Event from "../components/Event";
import { useEffect } from "react";
import { useEvent } from "../context/EventContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { getEvents, events } = useEvent();
  const { user, deleteAccount } = useAuth();
  const { contacts, getContacts } = useContact();

  function convertirFormatoFechaISO(fechaISO) {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const fecha = new Date(fechaISO);
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth();
    const año = fecha.getUTCFullYear();

    const fechaFormateada = `${dia} de ${meses[mes]}, ${año}`;
    return fechaFormateada;
  }

  useEffect(() => {
    getEvents();
    getContacts();
    const interval = setInterval(() => {
      getEvents();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const handleDeleteAccount = (id) => {
  //   deleteAccount(id);
  // };

  const hayContactos = contacts.some(
    (contact) => contact.usuario_id === user.id
  );

  const hayEventos = events.some((event) => event.usuario_id === user.id);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-2 col-span-1">
            <div className="flex justify-between">
              <div>
                <div className="flex space-x-2">
                  <Link to="/panel">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        stroklinejoin="round"
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                      />
                    </svg>
                  </Link>
                  <div>
                    <h2 className=" font-bold uppercase">
                      {user.nombre} {user.apellido}
                    </h2>
                  </div>
                </div>
              </div>
              <Link to="/edit-profile">
                <div className="hover:underline underline-offset-4">
                  Editar perfil
                </div>
              </Link>
            </div>
            <div className="pb-2">
              <Box>
                <p>
                  <b>RUT:</b> {user.rut}
                </p>
                <p>
                  <b>Grupo sanguíneo:</b> {user.grupoSanguineo}
                </p>
                <p>
                  <b>Teléfono:</b> {user.telefono}
                </p>
                <p>
                  <b>Nacimiento:</b>{" "}
                  {convertirFormatoFechaISO(user.fechaNacimiento)}
                </p>
              </Box>
            </div>
            <div className="flex space-x-2">
              <Link to="/change-password">
                <div className="rounded-md text-white bg-yellow-600 00 py-2 px-3 hover:bg-yellow-700">
                  Cambiar contraseña
                </div>
              </Link>

              {/* <button onClick={handleDeleteAccount()}>
                <div className="bg-red-600 py-2 px-3 rounded-md text-white hover:bg-red-700">
                  Eliminar cuenta
                </div>
              </button> */}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="font-bold mb-2 uppercase">
                Contactos de emergencia
              </h2>
              {hayContactos ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                  {contacts.map((contact) => {
                    if (contact.usuario_id === user.id) {
                      return (
                        <div className="flex justify-between capitalize">
                          <Box>
                            {contact.nombre} {contact.apellido}
                            <p>
                              <b>Teléfono:</b> {contact.numero_telefono}
                            </p>
                          </Box>
                        </div>
                      );
                    }
                  })}
                  <Link to="/create-contact">
                    <div className="bg-yellow-600 p-8 text-white rounded-lg  flex hover:bg-yellow-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>{" "}
                      Agregar contacto{" "}
                    </div>
                  </Link>
                </div>
              ) : (
                <Link to="/create-contact">
                  <div className="bg-yellow-600 p-8 text-white rounded-lg  flex hover:bg-yellow-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>{" "}
                    Agregar contacto{" "}
                  </div>
                </Link>
              )}
            </div>
            <div>
              <h2 className="font-bold mb-2 uppercase">Tus eventos</h2>
              {hayEventos ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {events
                    .filter((event) => event.usuario_id === user.id)
                    .map((event) => (
                      <Event
                        key={event.id}
                        id={event.id}
                        userId={event.usuario_id}
                        titulo={event.titulo}
                        descripcion={event.descripcion}
                        estado={event.estado}
                      />
                    ))}
                  <Link
                    to="/create-event"
                    className="bg-yellow-600 p-8 text-white rounded-lg  flex hover:bg-yellow-700"
                  >
                    <div className="p-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>{" "}
                      Agregar evento{" "}
                    </div>
                  </Link>
                </div>
              ) : (
                <Link to="/create-event">
                  <div className="bg-yellow-600 p-8 text-white rounded-lg  flex hover:bg-yellow-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>{" "}
                    Agregar evento{" "}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
