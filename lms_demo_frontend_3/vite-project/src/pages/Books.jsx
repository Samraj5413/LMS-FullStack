import React, { useEffect, useState } from "react";
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../services/bookApi";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    totalCopies: "",
    availableCopies: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };

    if (editMode) {
      await updateBook(editingId, form);
    } else {
      await addBook(form);
    }

    loadBooks();
    setShowModal(false);
    setEditMode(false);
    setEditingId(null);

    setForm({
      title: "",
      author: "",
      category: "",
      isbn: "",
      totalCopies: "",
      availableCopies: "",
    });
  };

  const handleEdit = (book) => {
    setShowModal(true);
    setEditMode(true);
    setEditingId(book.id);

    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await deleteBook(id);
    
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };
    
    loadBooks();
  };

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };

    loadBooks();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Books</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Book
        </button>
      </div>

      <input type="text" 
      placeholder="Search by Title, Author, Category, ISBN..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 mb-4 w-1/3"
      style={{marginBottom : "15px"}}
      />

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SL.No</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">ISBN</th>
            <th className="border p-2">Total Copies</th>
            <th className="border p-2">Available</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books
          .filter((book) =>
            [book.title, book.author, book.category, book.isbn]
          .join(" ")
      .toLowerCase()
    .includes(search.toLowerCase())
  )
          .map((book, index) => (
            <tr key={book.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.category}</td>
              <td className="border p-2">{book.isbn}</td>
              <td className="border p-2">{book.totalCopies}</td>
              <td className="border p-2">{book.availableCopies}</td>

              <td className="border p-2 flex gap-2 justify-center">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Book" : "Add Book"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="border p-2"
                required
              />
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
                className="border p-2"
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="border p-2"
              />
              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                placeholder="ISBN"
                className="border p-2"
                required
              />
              <input
                name="totalCopies"
                value={form.totalCopies}
                onChange={handleChange}
                placeholder="Total Copies"
                className="border p-2"
                required
              />
              {/* <input
                name="availableCopies"
                value={form.availableCopies}
                onChange={handleChange}
                placeholder="Available Copies"
                className="border p-2"
                required
              /> */}

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
