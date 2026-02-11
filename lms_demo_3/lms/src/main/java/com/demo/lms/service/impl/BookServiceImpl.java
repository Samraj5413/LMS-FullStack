package com.demo.lms.service.impl;

import com.demo.lms.model.Book;
import com.demo.lms.repository.BookRepository;
import com.demo.lms.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book addBook(Book book) {
        book.setAvailableCopies(book.getTotalCopies());
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Integer id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + id));
    }

    @Override
    public Book updateBook(Integer id, Book book){
        Book existing = getBookById(id);
        existing.setTitle(book.getTitle());
        existing.setAuthor(book.getAuthor());
        existing.setIsbn(book.getIsbn());
        existing.setCategory(book.getCategory());
        existing.setTotalCopies(book.getTotalCopies());
        existing.setAvailableCopies(book.getAvailableCopies());
        return bookRepository.save(existing);
    }

    @Override
    public void deleteBook(Integer id){
        bookRepository.deleteById(id);
    }
}
