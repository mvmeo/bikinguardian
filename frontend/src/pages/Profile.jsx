import Box from "../components/Box";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);

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

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <div>
            {user.nombre} {user.apellido}
          </div>
          <div>Editar perfil</div>
        </div>
        <Box>
          <p>RUT: {user.rut}</p>
          <p>Grupo sanguíneo: {user.grupoSanguineo}</p>
          <p>Teléfono: {user.telefono}</p>
          <p>Nacimiento: {convertirFormatoFechaISO(user.fechaNacimiento)}</p>
        </Box>
      </div>
    </>
  );
};

export default Profile;
