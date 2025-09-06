import { FaSignOutAlt, FaCalendarCheck } from "react-icons/fa";

export default function FacultyDashboard({ token, onLogout }) {
  // Mock data for the timetable with a lunch break
  const mockTimetable = [
    ["Math", "Physics", "Chemistry", "", "Lunch", "Lab", "Lab", ""],
    ["Math", "", "Physics", "Chemistry", "Lunch", "", "Lab", "Lab"],
    ["Chemistry", "Math", "Physics", "", "Lunch", "Lab", "Lab", ""],
    ["Physics", "Chemistry", "Math", "", "Lunch", "Lab", "Lab", ""],
    ["Math", "Physics", "Chemistry", "", "Lunch", "Lab", "Lab", ""],
    ["Math", "Physics", "Chemistry", "", "Lunch", "Lab", "Lab", ""],
  ];
  
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">
        <header className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-800">Faculty Dashboard</h2>
          <button
            onClick={onLogout}
            className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2" />
            <span className="font-medium">Logout</span>
          </button>
        </header>

        <main>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Welcome, faculty member! Your token: <span className="font-mono text-gray-800 break-words">{token}</span>
          </p>
          
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200">
            <div className="flex items-center text-2xl font-bold text-gray-800 mb-4">
              <FaCalendarCheck className="mr-3 text-blue-600" />
              My Timetable
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse rounded-xl overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Day</th>
                    {[...Array(9)].map((_, i) => (
                      <th key={i} className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                        {i === 4 ? "Lunch" : `Period ${i > 4 ? i : i + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockTimetable.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                        {days[i]}
                      </td>
                      {row.map((cell, j) => (
                        <td 
                          key={j} 
                          className={`py-3 px-4 text-sm text-center ${cell === "Lunch" ? "bg-amber-100 font-bold" : "text-gray-700"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}