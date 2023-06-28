// import Box from "../components/Box";
// import Event from "../components/Event";
// import { useEffect, useState } from "react";
// import { useEvent } from "../context/EventContext";
// import { useUser } from "../context/UsersContext";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Profile = () => {
//   const { getEvents, events } = useEvent();
//   const { users } = useAuth();
//   const { id } = useParams();

//   function convertirFormatoFechaISO(fechaISO) {
//     const meses = [
//       "enero",
//       "febrero",
//       "marzo",
//       "abril",
//       "mayo",
//       "junio",
//       "julio",
//       "agosto",
//       "septiembre",
//       "octubre",
//       "noviembre",
//       "diciembre",
//     ];

//     const fecha = new Date(fechaISO);
//     const dia = fecha.getUTCDate();
//     const mes = fecha.getUTCMonth();
//     const año = fecha.getUTCFullYear();

//     const fechaFormateada = `${dia} de ${meses[mes]}, ${año}`;
//     return fechaFormateada;
//   }

//   useEffect(() => {
//     getEvents();
//   }, []);

//    console.log(users);

//   return (
    // <>
    //   <div className="container mx-auto p-4">
    //     <div className="flex justify-between">
    //       <div>
    //         {user.nombre} {user.apellido}
    //       </div>
    //       <div>Editar perfil</div>
    //     </div>
    //     <div className="space-y-2">
    //       <Box>
    //         <p>RUT: {user.rut}</p>
    //         <p>Grupo sanguíneo: {user.grupoSanguineo}</p>
    //         <p>Teléfono: {user.telefono}</p>
    //         <p>Nacimiento: {convertirFormatoFechaISO(user.fechaNacimiento)}</p>
    //       </Box>

    //       {events.map((event) => {
    //         if (event.usuario_id === user.id) {
    //           return (
    //             <Event
    //               key={event.id}
    //               id={event.id}
    //               userId={event.usuario_id}
    //               titulo={event.titulo}
    //               descripcion={event.descripcion}
    //               estado={event.estado}
    //             />
    //           );
    //         }
    //       })}
    //     </div>
    //   </div>
    // </>
//   );
// // };

// export default Profile;
