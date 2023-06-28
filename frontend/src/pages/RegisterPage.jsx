import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/panel");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/panel");
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex justify-center w-full ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col md:w-1/2 w-full px-8 mx-auto space-y-4"
        >
          <h1 className="text-[50px] font-bold text-yellow-900">¡Bienvenido(a)!</h1>
          <div className="flex space-x-4">
            <input
              className="p-4 rounded w-full"
              type="text"
              placeholder="Nombre"
              {...register("nombre", { required: true })}
            />
            <input
              className="p-4 rounded w-full"
              type="text"
              placeholder="Apellido"
              {...register("apellido", { required: true })}
            />
          </div>
          {errors.nombre && <span>El nombre es requerido</span>}
          {errors.apellido && <span>El apellido es requerido</span>}
          <input
            className="p-4 rounded"
            type="email"
            placeholder="Correo electrónico"
            {...register("correo", { required: true })}
          />
          {errors.correo && <span>El correo electrónico es requerido</span>}
          <input
            className="p-4 rounded"
            type="text"
            placeholder="RUT"
            {...register("rut", { required: true })}
          />
          {errors.telefono && <span>El número de teléfono es requerido</span>}
          <input
            className="p-4 rounded"
            type="text"
            placeholder="Número de teléfono"
            {...register("telefono", { required: true })}
          />
          {errors.telefono && <span>El número de teléfono es requerido</span>}
          <input
            className="p-4 rounded"
            type="text"
            placeholder="Grupo sanguíneo"
            {...register("grupoSanguineo", { required: true })}
          />
          {errors.grupoSanguineo && (
            <span>El grupo sanguineo es requerida</span>
          )}
          <input
            className="p-4 rounded"
            type="text"
            placeholder="Fecha de nacimiento"
            {...register("fechaNacimiento", { required: true })}
          />
          {errors.fechaNacimiento && (
            <span>La fecha de nacimiento es requerido</span>
          )}
          <input
            className="p-4 rounded"
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && <span>La contraseña es requerido</span>}

          <button
            className="bg-yellow-600 text-white p-4 uppercase"
            type="submit"
          >
            Registrarse
          </button>
          <p className="flex justify-center space-x-1 text-yellow-700">
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login"> Inicia sesión</Link>
          </p>
          {registerErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
