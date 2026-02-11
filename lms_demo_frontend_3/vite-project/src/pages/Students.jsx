import React, { useEffect, useState } from "react";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  updateStatus,
} from "../services/studentApi";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    status: "active", // lowercase → matches DB
  });

  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        console.error("loadStudents error:", err);
      }
    };

    loadStudents();
  }, []);

  // FORM CHANGE HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // EDIT BUTTON CLICK
  const handleEdit = (stud) => {
    setEditMode(true);
    setEditingId(stud.id);
    setShowModal(true);

    setForm({
      name: stud.name,
      email: stud.email,
      phone: stud.phone,
      department: stud.department,
      status: stud.status,
    });
  };

  // DELETE STUDENT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteStudent(id);
      
      const loadStudents = async () => {
        try {
          const data = await fetchStudents();
          setStudents(data);
        } catch (err) {
          console.error("loadStudents error:", err);
        }
      };
      
      loadStudents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Delete failed");
    }
  };

  // ADD / EDIT SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await updateStudent(editingId, form);
      } else {
        await addStudent(form);
      }

      setShowModal(false);
      setEditMode(false);
      setEditingId(null);

      // RESET FORM
      setForm({
        name: "",
        email: "",
        phone: "",
        department: "",
        status: "active",
      });

      const loadStudents = async () => {
        try {
          const data = await fetchStudents();
          setStudents(data);
        } catch (err) {
          console.error("loadStudents error:", err);
        }
      };

      loadStudents();
    } catch (err) {
      console.error(err);
      // alert(err.response?.data || "Save failed");
      alert(err.response?.data?.message || JSON.stringify(err.response?.data) || "Save failed");
    }
  };

  // TOGGLE ACTIVE / INACTIVE
  const handleToggleStatus = async (stud) => {
    const newStatus = stud.status === "active" ? "inactive" : "active";

    try {
      await updateStatus(stud.id, newStatus);
      
      const loadStudents = async () => {
        try {
          const data = await fetchStudents();
          setStudents(data);
        } catch (err) {
          console.error("loadStudents error:", err);
        }
      };
      
      loadStudents();
    } catch (err) {
      console.error("Toggle status error:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Students</h2>
        <button
          onClick={() => {
            setEditMode(false);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Student
        </button>
      </div>

      {/* STUDENTS TABLE */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SL.No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Verification</th>
            <th className="border p-2">Library Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((stud, index) => (
            <tr key={stud.id} className="text-center">
              {/*
                Normalize status to avoid case-related UI mismatch (API may return "ACTIVE"/"active")
              */}
              {(() => {
                const isActive =
                  (stud.status || "").toString().toLowerCase() === "active";
                return (
                  <>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{stud.name}</td>
                    <td className="border p-2">{stud.email}</td>
                    <td className="border p-2">{stud.phone}</td>
                    <td className="border p-2">{stud.department}</td>

                    {/* VERIFICATION */}
                    <td
                      className={`border p-2 font-semibold ${
                        stud.verificationStatus === "ACTIVE"
                          ? "text-green-700"
                          : "text-orange-600"
                      }`}
                    >
                      {stud.verificationStatus}
                    </td>

                    {/* LIBRARY STATUS */}
                    <td className="border p-2 font-semibold">
                      {stud.status.toUpperCase()}
                    </td>

                    <td className="border p-2 flex gap-2 justify-center">
                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(stud)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(stud.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                      {/* TOGGLE ACTIVE/INACTIVE */}
                      <button
                        onClick={() => handleToggleStatus(stud)}
                        className={`px-5 py-1.5 rounded text-white ${
                          isActive
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                      >
                        {isActive ? "ACTIVE" : "INACTIVE"}
                      </button>
                    </td>
                  </>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Student" : "Add Student"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2"
                required
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2"
                required
                disabled={editMode} // email should not be editable
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-2"
                required
              />

              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Department"
                className="border p-2"
                required
              />

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
