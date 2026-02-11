package com.demo.lms.service;

import com.demo.lms.dto.StudentRegisterRequest;
import com.demo.lms.dto.StudentResponse;
import com.demo.lms.model.Student;

import java.util.List;

public interface StudentService {

    // ----------- ADMIN ACTIONS -----------
    Student registerStudent(StudentRegisterRequest request);

    // ----------- STUDENT LOGIN -----------
//    String loginStudent(StudentLoginRequest request);

    // ----------- CRUD -----------
    List<StudentResponse> getAllStudents();
    Student getStudentById(Integer id);
    Student updateStudent(Integer id, Student student);
    void deleteStudent(Integer id);

    // ----------- STATUS UPDATE -----------
    Student updateStatus(Integer id, String value);
}
