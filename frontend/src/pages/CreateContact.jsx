import { useForm } from "react-hook-form";
import { useContact } from "../context/ContactContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const { register, handleSubmit } = useForm();
  const { createContact } = useContact();
  const { createNotification } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    data = { ...data, usuarioId: user.id };
    navigate("/profile");
    createContact(data);
    createNotification({
      descripcion: `${user.nombre} ${user.apellido} ha añadido un nuevo contacto`,
      usuarioId: user.id,
    });
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-2">
        <Link to="/profile">
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
        <h2 className="font-bold uppercase">Crear contacto</h2>
      </div>
      <div className="flex justify-center mt-4">
        <form onSubmit={onSubmit} className="flex flex-col md:w-2/3 w-full px-8 mx-auto space-y-4">
          <input className="p-4 rounded"
            type="text"
            placeholder="Ingresa el nombre"
            {...register("nombre", { required: true })}
            autoFocus
          />
          <input className="p-4 rounded"
            type="text"
            placeholder="Ingresa el apellido"
            {...register("apellido", { required: true })}
          />
          <input className="p-4 rounded"
            type="text"
            placeholder="Ingresa el numero telefónico"
            {...register("numeroTelefono", { required: true })}
          />
          <button className="bg-emerald-600 text-white p-4 uppercase">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
