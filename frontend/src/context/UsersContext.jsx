import { createContext, useState, useContext } from "react";
import { userRequest, userByIdRequest } from "../api/users";
const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro del proveedor EventProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);

  const getUserById = async (id) => {
    try {
      const res = await userByIdRequest(id);
      setUser(res.data);
    } catch (error) {
        console.log(error);
        }
  };


  return (
    <UserContext.Provider
      value={{
        getUserById,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
