import { Link } from "react-router-dom";
import { FaSignOutAlt, FaRegCalendarPlus, FaUserEdit } from "react-icons/fa";

export default function AdminDashboard({ onLogout }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">
        <header className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={onLogout}
            className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2" />
            <span className="font-medium">Logout</span>
          </button>
        </header>

        <main className="text-center">
          <p className="text-lg text-gray-600 mb-8">
            Manage faculty and generate timetables with ease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/admin/generate"
              className="flex flex-col items-center justify-center bg-emerald-600 text-white p-6 rounded-2xl shadow-md hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaRegCalendarPlus className="text-4xl mb-3" />
              <span className="text-xl font-semibold">Generate Timetable</span>
            </Link>

            <Link
              to="/admin/view-faculty"
              className="flex flex-col items-center justify-center bg-indigo-600 text-white p-6 rounded-2xl shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaUserEdit className="text-4xl mb-3" />
              <span className="text-xl font-semibold">View/Edit Faculty Timetable</span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}