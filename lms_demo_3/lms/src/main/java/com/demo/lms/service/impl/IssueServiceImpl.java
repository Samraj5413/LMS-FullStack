package com.demo.lms.service.impl;

import com.demo.lms.dto.IssueRequest;
import com.demo.lms.dto.IssueResponse;
import com.demo.lms.model.Book;
import com.demo.lms.model.IssueRecord;
import com.demo.lms.model.Student;
import com.demo.lms.repository.BookRepository;
import com.demo.lms.repository.IssueRecordRepository;
import com.demo.lms.repository.StudentRepository;
import com.demo.lms.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class IssueServiceImpl implements IssueService {

    @Autowired
    private IssueRecordRepository issueRecordRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    @Transactional
    public IssueRecord issueBook(IssueRequest request) {

        Book book = bookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Book not found"));

        if(book.getAvailableCopies() <= 0) throw new RuntimeException("No copies available");

        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        IssueRecord issue = new IssueRecord();
        issue.setBook(book);
        issue.setStudent(student);
        issue.setIssueDate(LocalDate.now());
        issue.setDueDate(LocalDate.now().plusDays(request.getDays()));
        issue.setFine(null);

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);
        return issueRecordRepository.save(issue);
    }

    @Override
    @Transactional
    public IssueRecord returnBook(Integer id) {
        IssueRecord issue = issueRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue record not found"));

        if(issue.getReturnDate() != null){
            throw new RuntimeException("Book already returned");
        }

        issue.setReturnDate(LocalDate.now());

        if(issue.getReturnDate().isAfter(issue.getDueDate())){
            long daysLate = ChronoUnit.DAYS.between(issue.getDueDate(), issue.getReturnDate());
            issue.setFine(BigDecimal.valueOf(daysLate * 10));
        }else{
            issue.setFine(BigDecimal.ZERO);
        }

        Book book = issue.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);
        return issueRecordRepository.save(issue);
    }

//    public List<IssueRecord> getRecordsByBook(Integer bookId){
//        return issueRecordRepository.findByBookId(bookId);
//    }

//    @Override
//    public List<IssueRecord> getAllIssueRecords() {
//        return issueRecordRepository.findAll();
//    }

    @Override
    public List<IssueResponse> getActiveIssues(){
        List<IssueRecord> records = issueRecordRepository.findByReturnDateIsNull();

        return records.stream()
                .map(this::mapToIssueResponse)
                .toList();
    }

    private IssueResponse mapToIssueResponse(IssueRecord issue){
        IssueResponse dto = new IssueResponse();
        dto.setId(issue.getId());
        dto.setStudentId(issue.getStudent().getId());
        dto.setStudentName(issue.getStudent().getName());
        dto.setBookId(issue.getBook().getId());
        dto.setBookTitle(issue.getBook().getTitle());
        dto.setIssueDate(issue.getIssueDate());
        dto.setDueDate(issue.getDueDate());
        dto.setDisplayReturnDate(issue.getReturnDate() == null ? "-" : issue.getReturnDate().toString());
        dto.setStatus(issue.getStudent().getStatus());

        if(issue.getReturnDate() == null && LocalDate.now().isAfter(issue.getDueDate())){
            long daysLate = ChronoUnit.DAYS.between(issue.getDueDate(), LocalDate.now());
            dto.setFine(BigDecimal.valueOf(daysLate * 10));
        }else{
            dto.setFine(issue.getFine());
        }
        return dto;
    }

    @Override
    public List<IssueResponse> getOverDueIssues(){
        List<IssueRecord> records = issueRecordRepository
                .findByReturnDateIsNullAndDueDateBefore(LocalDate.now());

        return records.stream().map(record -> {
            IssueResponse dto = mapToIssueResponse(record);
            long daysOverDue = ChronoUnit.DAYS.between(record.getDueDate(), LocalDate.now());
            BigDecimal fine = BigDecimal.valueOf(daysOverDue * 10);

            dto.setFine(fine);
            return dto;
        }).toList();
    }

//    @Override
//    public List<IssueResponse> getAllIssues(){
//        return issueRecordRepository.findAll()
//                .stream().map(this::mapToIssueResponse).toList();
//    }

    @Override
    public List<IssueResponse> getIssuesByStudent(Integer studentId){
        List<IssueRecord> records = issueRecordRepository.findByStudentId(studentId);
        return records.stream()
                .map(this::mapToIssueResponse)
                .toList();
    }

    @Override
    public List<IssueResponse> getReturnedBooks(){
        List<IssueRecord> records = issueRecordRepository.findByReturnDateIsNotNull();
        return records.stream()
                .map(this::mapToIssueResponse)
                .toList();
    }
}
