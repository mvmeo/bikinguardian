import React from "react";
import Box from "./Box";
import { useState, useEffect } from "react";
import { useEvent } from "../context/EventContext";
import { Link } from "react-router-dom";

const Event = (props) => {
  const [estado, setEstado] = useState(props.estado);
  const { changeEventState, deleteEvent } = useEvent();

  const handleEstado = () => {
    const data = {
      usuarioId: props.userId,
      estado: !estado,
    };
    console.log(data);
    changeEventState(props.id, data);
    setEstado(!estado);
    console.log(estado);

    deleteEvent(props.id);
    console.log("Evento " + props.id + " eliminado");
  };

  const colorEstado = estado ? "green-500" : "red-500";

  const nuevoEstado = estado ? "Solucionado" : "En progreso";

  return (
    <Box>
      <div className="">
        <h2 className="uppercase font-bold">{props.titulo}</h2>
        <p className="text-[15px]">{props.descripcion}</p>
        <p className={`text-${colorEstado} font-bold uppercase mt-3`}>{nuevoEstado}</p>

        <div className="flex justify-between mt-2">
          <button onClick={handleEstado} className="text-yellow-500 font-bold">
            Cambiar estado
          </button>
          <Link
            to={`/edit-event/${props.id}`}
            className="text-emerald-500 font-bold"
          >
            {" "}
            Editar{" "}
          </Link>
        </div>
      </div>
    </Box>
  );
};

export default Event;
