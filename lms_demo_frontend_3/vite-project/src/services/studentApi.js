// import axios from "axios";
import api from "./api";

// const API = "http://localhost:8080/api/students";

// // FETCH ALL STUDENTS
// export const fetchStudents = async () => {
//   const res = await axios.get(API);
//   return res.data;
// };

// // ADD STUDENT
// export const addStudent = async (student) => {
//   const res = await axios.post(`${API}/register`, student);
//   return res.data;
// };

// // UPDATE STUDENT
// export const updateStudent = async (id, student) => {
//   const res = await axios.put(`${API}/${id}`, student);
//   return res.data;
// };

// // DELETE STUDENT
// export const deleteStudent = async (id) => {
//   const res = await axios.delete(`${API}/${id}`);
//   return res.data;
// };

// // UPDATE LIBRARY STATUS (ACTIVE / INACTIVE)
// export const updateStatus = async (id, newStatus) => {
//   const res = await axios.patch(`${API}/${id}/status?value=${newStatus}`);
//   return res.data;
// };

// FETCH ALL STUDENTS
export const fetchStudents = async () => {
  const res = await api.get("/students");
  return res.data;
};

// ADD STUDENT
export const addStudent = async (student) => {
  const res = await api.post("/register", student);
  return res.data;
};

// UPDATE STUDENT
export const updateStudent = async (id, student) => {
  const res = await api.put(`/${id}`, student);
  return res.data;
};

// DELETE STUDENT
export const deleteStudent = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

// UPDATE LIBRARY STATUS (ACTIVE / INACTIVE)
export const updateStatus = async (id, newStatus) => {
  const res = await api.patch(`/${id}/status?value=${newStatus}`);
  return res.data;
};
