import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./auth/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import GenerateTimetable from "./pages/GenerateTimetable";
import ViewFaculty from "./pages/ViewFaculty";

export default function App() {
  const [auth, setAuth] = useState(null); // { token, role }
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    navigate("/"); // redirect to login after logout
  };

  const ProtectedRoute = ({ children, role }) => {
    if (!auth) return <Navigate to="/" />;
    if (role && auth.role !== role) return <Navigate to="/" />;
    return children;
  };

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login setAuth={setAuth} />} />

      {/* Faculty */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute role="FACULTY">
            <FacultyDashboard token={auth?.token} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/generate"
        element={
          <ProtectedRoute role="ADMIN">
            <GenerateTimetable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/view-faculty"
        element={
          <ProtectedRoute role="ADMIN">
            <ViewFaculty />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
