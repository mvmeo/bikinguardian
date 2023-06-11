import { useAuth } from "../context/AuthContext";
import Box from "../components/Box";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Panel = () => {
  const { user } = useAuth();

  if(user.admin) {

  return (
    <>
        <div className="container mx-auto p-4">
        <Header className=""/>
        <Link to="/events">
          <div className=" my-3 ">
          <Box>
            <div className="py-10 px-16">
            <h2 className="text-[30px] font-bold flex align-middle justify-center">Ver eventos</h2>
            </div>
          </Box>
          </div>
        </Link>
        </div>
      </>
  );
  } else {
    return (
      <>
        <div className="container mx-auto p-4">
        <Header className=""/>
        <Link to="/profile">
          <div className=" my-3 ">
          <Box>
            <div className="py-10 px-16">
            <h2 className="text-[30px] font-bold flex align-middle justify-center">Ir al perfil</h2>
            </div>
          </Box>
          </div>
        </Link>
        <Link to="/create-event">
          <div className=" my-3 ">
          <Box>
            <div className="py-3 px-16 flex align-middle justify-center">
            <h2 className="font-bold uppercase">Crear evento +</h2>
            </div>
          </Box>
          </div>
        </Link>
        </div>
      </>
    );
  }
};

export default Panel;
