package com.demo.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueResponse {
    private Integer id;

    private Integer studentId;
    private String studentName;

    private Integer bookId;
    private String bookTitle;

    private LocalDate issueDate;
    private LocalDate dueDate;
    //    private LocalDate returnDate;
    private String displayReturnDate;
    private BigDecimal fine;
    private String status;
}
