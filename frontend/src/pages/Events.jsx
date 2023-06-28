import { useEvent } from "../context/EventContext";
import { useEffect } from "react";
import Event from "../components/Event";
import { Link } from "react-router-dom";

const Events = () => {
  const { getEvents, events } = useEvent();

  useEffect(() => {
    getEvents();
    const interval = setInterval(() => {
      getEvents();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 space-y-4">
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
        <h2 className="font-bold uppercase">Eventos</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {events.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            userId={event.usuario_id}
            titulo={event.titulo}
            descripcion={event.descripcion}
            estado={event.estado}
          />
        ))}
      </div>
      </div>
    </>
  );
};

export default Events;
