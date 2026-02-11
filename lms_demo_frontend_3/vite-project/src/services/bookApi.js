// import axios from "axios";
import api from "./api";

// const API_URL = "http://localhost:8080/api/books";

// export const fetchBooks = async () => (await axios.get(API_URL)).data;

// export const addBook = async (bookData) =>
//   (await axios.post(API_URL, bookData)).data;

// export const updateBook = async (id, bookData) =>
//   (await axios.put(`${API_URL}/${id}`, bookData)).data;

// export const deleteBook = async (id) =>
//   (await axios.delete(`${API_URL}/${id}`)).data;

export const fetchBooks = async () => (await api.get("/books")).data;

export const addBook = async (bookData) =>
  (await api.post("/books", bookData)).data;

export const updateBook = async (id, bookData) =>
  (await api.put(`${"/books"}/${id}`, bookData)).data;

export const deleteBook = async (id) =>
  (await api.delete(`${"/books"}/${id}`)).data;
