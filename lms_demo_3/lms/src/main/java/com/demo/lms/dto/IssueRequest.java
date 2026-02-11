package com.demo.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueRequest {
    private Integer studentId;
    private Integer bookId;
    private Integer days;
}
