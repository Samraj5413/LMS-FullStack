import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../services/api";

export default function Return() {
  const [records, setRecords] = useState([]);

  const handleReturn = async (id) => {
    if (!confirm("Are you sure to return this book?")) return;
    
    const loadRecords = async () => {
      const response = await api.get("/issue/active");
      setRecords(response.data);
    };
    
    await api.put(`/issue/${id}`);
    alert("Book returned successfully");
    loadRecords();
  };

  useEffect(() => {
    const loadRecords = async () => {
      const response = await api.get("/issue/active");
      setRecords(response.data);
    };

    loadRecords();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Return Book</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SL.No</th>
            <th className="border p-2">Student</th>
            <th className="border p-2">Book</th>
            <th className="border p-2">Issue Date</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, index) => (
            <tr key={r.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{r.studentName}</td>
              <td className="border p-2">{r.bookTitle}</td>
              <td className="border p-2">{r.issueDate}</td>
              <td className="border p-2">{r.dueDate}</td>

              <td className="border p-2">
                <button
                  onClick={() => handleReturn(r.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Return
                </button>
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-600">
                No active issued books
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
