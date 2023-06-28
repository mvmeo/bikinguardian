import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, changePassword, errors: loginErrors } = useAuth();
  const [changedPassword, setChangedPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    data = { id: user.id, ...data };
    if (data.password === data.newPassword) {
      loginErrors.push("La contraseña nueva no puede ser igual a la antigua");
    } else {
      changePassword(data);
      if (loginErrors.length === 0) {
        setChangedPassword(true);
      }
    }
  });

  const hasErrors = Object.keys(errors).length > 0 || loginErrors.length > 0;

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
        <h2 className="font-bold uppercase">Cambiar contraseña</h2>
      </div>
      <div className="flex justify-center mt-4">
        <form
          onSubmit={onSubmit}
          className="flex flex-col md:w-2/3 w-full px-8 mx-auto space-y-4"
        >
          {errors.password && (
            <span className="bg-red-500 rounded p-3 text-white">
              La contraseña antigua es requerida
            </span>
          )}
          <div className="">
            {loginErrors.map((error, index) => (
              <div className="bg-red-500 rounded p-3 text-white" key={index}>
                <p>{error}</p>
              </div>
            ))}
          </div>
          <input
            className="p-4 rounded"
            type="password"
            placeholder="Ingresa tu antigua contraseña"
            {...register("password", { required: true })}
            autoFocus
          />
          {errors.password && (
            <span className="bg-red-500 rounded p-3 text-white">
              La contraseña nueva es requerida
            </span>
          )}

          <input
            className="p-4 rounded"
            type="password"
            placeholder="Ingresa la nueva contraseña"
            {...register("newPassword", { required: true })}
          ></input>

          <button className="bg-emerald-600 text-white p-4 uppercase">
            Cambiar contraseña
          </button>
          {changedPassword && loginErrors.length === 0 && (
            <div className="bg-green-500 rounded p-3 text-white">
              <p>Contraseña cambiada correctamente.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
