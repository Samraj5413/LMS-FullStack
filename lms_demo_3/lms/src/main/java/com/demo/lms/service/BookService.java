package com.demo.lms.service;

import com.demo.lms.model.Book;

import java.util.List;

public interface BookService {
    Book addBook(Book book);
    List<Book> getAllBooks();
    Book getBookById(Integer id);
    Book updateBook(Integer id, Book book);
    void deleteBook(Integer id);
}
