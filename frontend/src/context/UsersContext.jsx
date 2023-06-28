import { createContext, useState, useContext } from "react";
import { userRequest, editProfileRequest } from "../api/users";
const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro del proveedor EventProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState();

  const getUser = async (id) => {
    try {
      const res = await userRequest(id);
      console.log(JSON.stringify(res.data))
      setUser(JSON.stringify(res.data));
    } catch (error) {
        console.log(error);
        }
  };

  const editProfile = async (id, profile) => {
    const res = await editProfileRequest(id, profile);
  };



  return (
    <UserContext.Provider
      value={{
        getUser,
        editProfile,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
