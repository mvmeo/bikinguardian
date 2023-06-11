import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const RegisterPage = () => {

  const {register,
        handleSubmit,
        formState: {
          errors
        }} = useForm()
  const {signup, isAuthenticated, errors: registerErrors} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) navigate('/panel')
  }, [isAuthenticated])

  const onSubmit = handleSubmit( async (values) => {
    signup(values)
  })

  
  useEffect(() => {
    if (isAuthenticated) navigate("/panel");
  }, [isAuthenticated]);


  return (
    <div>
      {registerErrors.map((error, index) => (
        <p key={index}>{error}</p>
        
      ))}
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Nombre" 
          {...register("nombre", { required: true })}
          />
          { errors.nombre && <span>El nombre es requerido</span>}
        <input type="text" placeholder="Apellido" 
          {...register("apellido", { required: true })}
        />
        { errors.apellido && <span>El apellido es requerido</span>}
        <input type="email" placeholder="Correo electrónico" 
          {...register("correo", { required: true })}
        />
        { errors.correo && <span>El correo electrónico es requerido</span>}
        <input type="text" placeholder="RUT" 
          {...register("rut", { required: true })}
        />
        { errors.telefono && <span>El número de teléfono es requerido</span>}
        <input type="text" placeholder="Número de teléfono" 
          {...register("telefono", { required: true })}
        />
        { errors.telefono && <span>El RUT es requerido</span>}
        <input type="text" placeholder="Grupo sanguíneo"
          {...register("grupoSanguineo", { required: true })}
        />
        { errors.grupoSanguineo && <span>El grupo sanguineo es requerida</span>}
        <input type="text" placeholder="Fecha de nacimiento"
          {...register("fechaNacimiento", { required: true })}
        />
        { errors.fechaNacimiento && <span>La fecha de nacimiento es requerido</span>}
        <input type="password" placeholder="Contraseña" 
          {...register("password", { required: true })}
        />
        { errors.password && <span>La contraseña es requerido</span>}

        <button type='submit'>Registrarse</button>
        <p>¿Ya tienes una cuenta?
          <Link to="/login"> Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
