// import axios from "axios";
import api from "./api";

const handle = async (requestFn) => {
  try {
    const res = await requestFn();
    return res.data;
  } catch (err) {
    const payload = err?.response?.data;
    const message = payload?.message || payload || err.message || "Network error";
    const error = new Error(typeof message === "string" ? message : JSON.stringify(message));
    error.status = err?.response?.status;
    throw error;
  }
};

export const fetchStudents = async () =>
  handle(() => api.get("/students"));

export const addStudent = async (student) =>
  handle(() => api.post("/students/register", student));

export const updateStudent = async (id, student) =>
  handle(() => api.put(`/students/${id}`, student));

export const deleteStudent = async (id) =>
  handle(() => api.delete(`/students/${id}`));

export const updateStatus = async (id, newStatus) =>
  handle(() => api.patch(`/students/${id}/status?value=${newStatus}`));

