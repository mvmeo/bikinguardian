import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";
import UserProfile from "./pages/UserProfile";
import Panel from "./pages/Panel";

import ProtectedRoute from "./ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";

const App = () => {
  return (
    <AuthProvider>
      <EventProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/panel" element={<Panel />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/events" element={<Events />}></Route>
              <Route path="/create-event" element={<CreateEvent />}></Route>
              <Route path="/profile/user/:id" element={<UserProfile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
