import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";
// import UserProfile from "./pages/UserProfile";
import Panel from "./pages/Panel";
import Notifications from "./pages/Notifications";
import EditEvent from "./pages/EditEvent";
import ChangePassword from "./pages/ChangePassword";
import CreateContact from "./pages/CreateContact";
import EditProfile from "./pages/EditProfile";

import ProtectedRoute from "./ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import { UserProvider } from "./context/UsersContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ContactProvider } from "./context/ContactContext";

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ContactProvider>
          <EventProvider>
            <UserProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/register" element={<RegisterPage />}></Route>
                  <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                  ></Route>
                  <Route
                    path="/change-password"
                    element={<ChangePassword />}
                  ></Route>

                  <Route element={<ProtectedRoute />}>
                    <Route path="/panel" element={<Panel />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route
                      path="/edit-profile"
                      element={<EditProfile />}
                    ></Route>
                    <Route path="/events" element={<Events />}></Route>
                    <Route
                      path="/create-event"
                      element={<CreateEvent />}
                    ></Route>
                    <Route
                      path="/create-contact"
                      element={<CreateContact />}
                    ></Route>
                    <Route
                      path="/edit-event/:id"
                      element={<EditEvent />}
                    ></Route>
                    {/* <Route
                      path="/profile/user/:id"
                      element={<UserProfile />}
                    ></Route> */}
                    <Route
                      path="/notifications"
                      element={<Notifications />}
                    ></Route>
                  </Route>
                </Routes>
              </BrowserRouter>
            </UserProvider>
          </EventProvider>
        </ContactProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
