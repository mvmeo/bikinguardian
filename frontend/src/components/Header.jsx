import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between">
      <div>¡Hola, {user.nombre}!</div>
        <Link to="/" onClick={()=> logout()}>Cerrar sesión</Link>
    </div>
  );
};

export default Header;
