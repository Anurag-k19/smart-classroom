import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setAuth }) {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const hardcodedAdmin = { id: "admin", password: "admin123", role: "ADMIN" };
    const hardcodedFaculty = { id: "faculty1", password: "faculty123", role: "FACULTY" };

    if (facultyId === hardcodedAdmin.id && password === hardcodedAdmin.password) {
      setAuth({ token: "fake-admin-token", role: "ADMIN" });
      navigate("/admin");
    } else if (facultyId === hardcodedFaculty.id && password === hardcodedFaculty.password) {
      setAuth({ token: "fake-faculty-token", role: "FACULTY" });
      navigate("/faculty");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <form onSubmit={handleLogin} className="bg-white/90 p-10 rounded-3xl shadow-2xl w-96 backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-600 text-sm italic mb-4 text-center">{error}</p>}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Faculty ID"
            value={facultyId}
            onChange={(e) => { setFacultyId(e.target.value); setError(""); }}
            className="border border-gray-300 p-3 w-full rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="border border-gray-300 p-3 w-full rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02]"
        >
          Login
        </button>
      </form>
    </div>
  );
}