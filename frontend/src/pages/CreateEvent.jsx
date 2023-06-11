import { useForm } from "react-hook-form";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

const CreateEvent = () => {
  const { register, handleSubmit } = useForm();
  const {createEvent} = useEvent();
  const { user } = useAuth();
  console.log(createEvent())

  const onSubmit = handleSubmit((data) => {
    data = { ...data, usuarioId: user.id };
    createEvent(data);
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
        <button>Crear evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;
