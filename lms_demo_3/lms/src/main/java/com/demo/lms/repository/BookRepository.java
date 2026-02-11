package com.demo.lms.repository;

import com.demo.lms.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
    boolean existsByIsbn(String isbn);
}
