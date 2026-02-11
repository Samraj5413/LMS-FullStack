import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../services/api";

export default function Issue() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    bookId: "",
    days: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadData = async () => {
      const studentsData = await api.get("/students");
      const booksData = await api.get("/books");

      setStudents(studentsData.data);
      setBooks(booksData.data.filter((book) => book.availableCopies > 0));
    };
    
    await api.post("/issue", form);
    alert("Book issued successfully!");
    setForm({ studentId: "", bookId: "", days: "" });
    loadData(); // refresh books count
  };

  useEffect(() => {
    const loadData = async () => {
      const studentsData = await api.get("/students");
      const booksData = await api.get("/books");

      setStudents(studentsData.data);
      setBooks(booksData.data.filter((book) => book.availableCopies > 0));
    };

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Issue Book</h2>

      <form className="w-1/3 flex flex-col gap-4" onSubmit={handleSubmit}>
        <select
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.department})
            </option>
          ))}
        </select>

        <select
          name="bookId"
          value={form.bookId}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} (Available: {b.availableCopies})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="Days"
          className="border p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Issue Book
        </button>
      </form>
    </div>
  );
}
