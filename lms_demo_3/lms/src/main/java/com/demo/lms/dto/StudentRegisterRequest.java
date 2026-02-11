package com.demo.lms.dto;

import lombok.Data;

@Data
public class StudentRegisterRequest {
    private String name;
    private String phone;
    private String department;
    private String email;
}
