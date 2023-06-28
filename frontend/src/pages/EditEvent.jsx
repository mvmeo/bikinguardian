import { useForm } from "react-hook-form";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CreateEvent = () => {
  const { register, handleSubmit } = useForm();
  const { editEvent } = useEvent();
  const { createNotification } = useNotification();
  const { user } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    data = { usuarioId: user.id, ...data };

    console.log(data);
    editEvent(id, data);
    navigate("/events");
    createNotification({
      descripcion: `${user.nombre} ${user.apellido} ha editado un evento`,
      usuarioId: user.id,
    });
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          placeholder="Ingresa un título"
          {...register("titulo", { required: true })}
          autoFocus
        />
        <label htmlFor="description">Descripción</label>
        <textarea
          rows="3"
          placeholder="Ingresa una descripción"
          {...register("descripcion", { required: true })}
        ></textarea>
        <button>Confirmar</button>
      </form>
    </div>
  );
};

export default CreateEvent;
