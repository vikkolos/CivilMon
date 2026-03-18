import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import RepProfile from "../pages/RepProfile";
import ReportIssue from "../pages/ReportIssue";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import UserContextProvider from "./context/UserContextProvider";
import RolecontextProvider from "./context/RolecontextProvider";
import Protected from "./Protected";
import useRole from "./context/RoleCOntext";


// Component that decides which profile to show
function ProfileRouter() {
  const { Role } = useRole();

  return Role === "citizen" ? <Profile /> : <RepProfile />;
}

function App() {
  return (
    <RolecontextProvider>
      <UserContextProvider>

        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/reportissue"
            element={
              <Protected>
                <ReportIssue />
              </Protected>
            }
          />

          <Route
            path="/profile"
            element={
              <Protected>
                <ProfileRouter />
              </Protected>
            }
          />

        </Routes>

      </UserContextProvider>
    </RolecontextProvider>
  );
}

export default App;