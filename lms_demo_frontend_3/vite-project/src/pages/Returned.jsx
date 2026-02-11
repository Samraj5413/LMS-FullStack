import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../services/api";

export default function Returned() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadRecords = async () => {
      const res = await api.get("/issue/returned");
      setRecords(res.data);
    };

    loadRecords();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Returned Books</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SL.No</th>
            <th className="border p-2">Student</th>
            <th className="border p-2">Book</th>
            <th className="border p-2">Issue Date</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Return Date</th>
            <th className="border p-2">Fine</th>
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
              <td className="border p-2">{r.displayReturnDate}</td>
              <td className="border p-2">{r.fine !== null ? r.fine : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
