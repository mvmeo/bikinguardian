import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
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
          
        <h1 className="text-[50px] font-bold text-yellow-900">¡Hola de nuevo!</h1>
          {errors.apellido && <span>El apellido es requerido</span>}
          <input
            className="p-4 rounded"
            type="email"
            placeholder="Correo electrónico"
            {...register("correo", { required: true })}
          />
          {errors.correo && <span className="bg-red-500 p-3 text-white">El correo electrónico es requerido</span>}
          <input
            className="p-4 rounded"
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="bg-red-500 p-3 text-white">La contraseña es requerido</span>}

          <button
            className="bg-yellow-600 text-white p-4 uppercase"
            type="submit"
          >
            Iniciar sesión
          </button>
          <p className="flex justify-center space-x-1 text-yellow-700">
            <p>¿No tienes una cuenta?</p>
            <Link to="/register"> Regístrate</Link>
          </p>
          {loginErrors.map((error, index) => (
            <p key={index} className="bg-red-500 p-3 text-white">
              {error}
            </p>
          ))}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
