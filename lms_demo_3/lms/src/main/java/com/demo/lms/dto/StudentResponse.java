package com.demo.lms.dto;

import lombok.Data;

@Data
public class StudentResponse {
    private Integer id;
    private String name;
    private String phone;
    private String department;
    private String status;
    private String email;
    private String verificationStatus;
}
