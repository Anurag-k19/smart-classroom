import { useState } from "react";
import { FaPlus, FaTimes, FaCalendarAlt, FaHourglassHalf } from "react-icons/fa";

export default function GenerateTimetable() {
  const [faculties, setFaculties] = useState([]);
  const [labs, setLabs] = useState([]);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const addFaculty = () => setFaculties([...faculties, { facultyId: "", subjectName: "", totalLecturePerWeek: "" }]);
  const addLab = () => setLabs([...labs, { labId: "", subjectName: "", totalLecturePerWeek: "" }]);

  const handleFacultyChange = (index, field, value) => {
    const newFacs = [...faculties];
    newFacs[index][field] = value;
    setFaculties(newFacs);
  };

  const handleLabChange = (index, field, value) => {
    const newLabs = [...labs];
    newLabs[index][field] = value;
    setLabs(newLabs);
  };

  const removeFaculty = (index) => setFaculties(faculties.filter((_, i) => i !== index));
  const removeLab = (index) => setLabs(labs.filter((_, i) => i !== index));

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/timetable/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faculties, labs }),
      });
      const json = await res.json();
      setTimetable(json);
    } catch (err) {
      console.error(err);
      setTimetable(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Generate Timetable
        </h2>

        <div className="space-y-8">
          {/* Faculties Section */}
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
            <h3 className="text-2xl font-bold text-blue-800 flex items-center mb-4">
              <FaCalendarAlt className="mr-3" />
              Faculties
            </h3>
            <div className="space-y-4">
              {faculties.map((f, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 mb-2 p-3 bg-white rounded-xl shadow-sm">
                  <input
                    placeholder="Faculty ID"
                    value={f.facultyId}
                    onChange={(e) => handleFacultyChange(i, "facultyId", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Subject Name"
                    value={f.subjectName}
                    onChange={(e) => handleFacultyChange(i, "subjectName", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Lectures per week"
                    type="number"
                    value={f.totalLecturePerWeek}
                    onChange={(e) => handleFacultyChange(i, "totalLecturePerWeek", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => removeFaculty(i)}
                    className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                onClick={addFaculty}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors duration-200"
              >
                <FaPlus className="mr-2" />
                Add Faculty
              </button>
            </div>
          </div>

          {/* Labs Section */}
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
            <h3 className="text-2xl font-bold text-pink-800 flex items-center mb-4">
              <FaCalendarAlt className="mr-3" />
              Labs
            </h3>
            <div className="space-y-4">
              {labs.map((l, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 mb-2 p-3 bg-white rounded-xl shadow-sm">
                  <input
                    placeholder="Lab ID"
                    value={l.labId}
                    onChange={(e) => handleLabChange(i, "labId", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    placeholder="Subject Name"
                    value={l.subjectName}
                    onChange={(e) => handleLabChange(i, "subjectName", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    placeholder="Lectures per week"
                    type="number"
                    value={l.totalLecturePerWeek}
                    onChange={(e) => handleLabChange(i, "totalLecturePerWeek", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={() => removeLab(i)}
                    className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                onClick={addLab}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors duration-200"
              >
                <FaPlus className="mr-2" />
                Add Lab
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="w-full mt-8 py-3 rounded-xl text-white font-bold transition-all duration-300 flex items-center justify-center
          disabled:bg-gray-400 disabled:cursor-not-allowed
          bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <FaHourglassHalf className="animate-spin mr-3" /> Generating...
            </>
          ) : (
            "Generate Timetable"
          )}
        </button>

        {timetable && (
          <div className="mt-12 bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Timetable Generated
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse rounded-xl overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Day</th>
                    {[...Array(8)].map((_, i) => (
                      <th
                        key={i}
                        className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300"
                      >
                        Period {i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timetable.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 border-r border-gray-200">{days[i]}</td>
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
          </div>
        )}
      </div>
    </div>
  );
}