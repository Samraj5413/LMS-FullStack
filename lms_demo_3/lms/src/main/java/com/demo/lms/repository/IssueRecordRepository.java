package com.demo.lms.repository;

import com.demo.lms.model.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface IssueRecordRepository extends JpaRepository<IssueRecord, Integer> {
    List<IssueRecord> findByBookId(Integer bookId);

    List<IssueRecord> findByStudentId(Integer studentId);

    boolean existsByBookIdAndStudentIdAndReturnDateIsNull(Integer bookId, Integer studentId);

    List<IssueRecord> findByReturnDateIsNull();

    List<IssueRecord> findByReturnDateIsNullAndDueDateBefore(LocalDate date);

    List<IssueRecord> findByReturnDateIsNotNull();

}
