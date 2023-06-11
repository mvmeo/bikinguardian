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
    <div>
      {loginErrors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
      <form onSubmit={onSubmit}>
        {errors.apellido && <span>El apellido es requerido</span>}
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("correo", { required: true })}
        />
        {errors.correo && <span>El correo electrónico es requerido</span>}
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
        {errors.password && <span>La contraseña es requerido</span>}

        <button type="submit">Iniciar sesión</button>
        <p>
          ¿No tienes una cuenta?
          <Link to="/register"> Regístrate</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
