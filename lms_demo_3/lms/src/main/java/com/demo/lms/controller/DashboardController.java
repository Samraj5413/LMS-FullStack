package com.demo.lms.controller;

import com.demo.lms.model.Book;
import com.demo.lms.repository.BookRepository;
import com.demo.lms.repository.IssueRecordRepository;
import com.demo.lms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private IssueRecordRepository issueRecordRepository;

    @GetMapping
    public ResponseEntity<Map<String, Long>> getDashboardSummary(){

        Map<String, Long> summary = new HashMap<>();
        summary.put("totalBooks", bookRepository.count());
        summary.put("totalStudents", studentRepository.count());
        summary.put("activeIssuedBooks",(long) issueRecordRepository.findByReturnDateIsNull().size());

        long availableCopies = bookRepository.findAll().stream()
                .mapToLong(Book::getAvailableCopies)
                .sum();

        summary.put("availableCopies", availableCopies);

        return ResponseEntity.ok(summary);
    }
}
