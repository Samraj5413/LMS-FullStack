import React, { useEffect, useState } from "react";
import { fetchBooks } from "../services/bookApi";

export default function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  const filteredBooks = books.filter((b) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      (b.title || "").toLowerCase().includes(term) ||
      (b.author || "").toLowerCase().includes(term) ||
      (b.category || "").toLowerCase().includes(term) ||
      (b.isbn || "").toString().toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold">Available Books</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, author, ISBN, or category"
          className="w-full md:w-96 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">ISBN</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.map((b) => (
            <tr key={b.id}>
              <td className="border p-2">{b.title}</td>
              <td className="border p-2">{b.author}</td>
              <td className="border p-2">{b.category}</td>
              <td className="border p-2">{b.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
