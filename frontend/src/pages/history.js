import React, { useEffect, useState } from "react";

export default function HistoryTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">History</h2>

      <div className="overflow-x-auto bg-blue-50 p-4 rounded-xl shadow-md">
        <table className="min-w-full table-auto border border-gray-300 text-center">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Date</th>
              <th className="py-2 px-4 border border-gray-300">Sommeil</th>
              <th className="py-2 px-4 border border-gray-300">Cours</th>
              <th className="py-2 px-4 border border-gray-300">Humeur</th>
              <th className="py-2 px-4 border border-gray-300">Sport</th>
              <th className="py-2 px-4 border border-gray-300">Meteo</th>
              <th className="py-2 px-4 border border-gray-300">Result</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-2 px-4 border border-gray-300">{row.date}</td>
                  <td className="py-2 px-4 border border-gray-300">{row.Sommeil}</td>
                  <td className="py-2 px-4 border border-gray-300">{row.Cours}</td>
                  <td className="py-2 px-4 border border-gray-300">{row.Humeur}</td>
                  <td className="py-2 px-4 border border-gray-300">{row.Sport}</td>
                  <td className="py-2 px-4 border border-gray-300">{row.Meteo}</td>
                  <td className="py-2 px-4 border border-gray-300 font-semibold">{row.result}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500 border border-gray-300">
                  No history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
