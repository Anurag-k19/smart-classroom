export default function TimetableTable({ data, editable }) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="border-collapse border border-gray-400 w-full text-center">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2">Day</th>
            {Array.from({ length: 8 }, (_, i) => (
              <th key={i} className="border border-gray-400 px-2">
                {i === 3 ? "Lunch" : `Slot ${i + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr key={rIdx}>
              <td className="border border-gray-400 px-2 font-bold">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][rIdx]}
              </td>
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className="border border-gray-400 px-2 py-1"
                  contentEditable={editable}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
