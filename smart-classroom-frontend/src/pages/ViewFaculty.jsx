import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function ViewFaculty() {
  const [facultyId, setFacultyId] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const viewTimetable = async () => {
    setError("");
    setTimetable(null);
    if (!facultyId) {
      setError("Please enter Faculty ID");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/api/faculty-timetable/${facultyId}`);
      if (!res.ok) throw new Error("Faculty ID not found");
      const json = await res.json();
      setTimetable(json);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          View Faculty Timetable
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-center">
          <input
            type="text"
            placeholder="Enter Faculty ID..."
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            className="flex-1 max-w-sm border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            onClick={viewTimetable}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            <FaSearch className="mr-2" />
            View Timetable
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-center mb-4 text-sm font-medium">{error}</p>
        )}

        {timetable && (
          <div className="mt-8 overflow-x-auto bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Timetable for {facultyId}
            </h3>
            <table className="min-w-full border-collapse rounded-xl overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Day</th>
                  {[...Array(8)].map((_, i) => (
                    <th key={i} className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                      Period {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timetable.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                      {days[i]}
                    </td>
                    {row.map((cell, j) => (
                      <td key={j} className="py-3 px-4 text-sm text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}