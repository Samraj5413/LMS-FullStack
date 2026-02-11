package com.demo.lms.service.impl;

import com.demo.lms.dto.StudentRegisterRequest;
import com.demo.lms.dto.StudentResponse;
import com.demo.lms.model.Student;
import com.demo.lms.model.User;
import com.demo.lms.model.VerificationToken;
import com.demo.lms.repository.StudentRepository;
import com.demo.lms.repository.UserRepository;
import com.demo.lms.repository.VerificationTokenRepository;
import com.demo.lms.service.MailService;
import com.demo.lms.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;
    private final MailService mailService;

    public StudentServiceImpl(StudentRepository studentRepository,
                              UserRepository userRepository,
                              VerificationTokenRepository tokenRepository,
                              MailService mailService) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.mailService = mailService;
    }

    private StudentResponse convert(Student student){
        StudentResponse dto = new StudentResponse();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setPhone(student.getPhone());
        dto.setDepartment(student.getDepartment());
        dto.setStatus(student.getStatus());

        User user = student.getUser();
        if (user != null) {
            dto.setEmail(user.getEmail());
            dto.setVerificationStatus(user.getStatus());
        }

        return dto;
    }

    @Override
    @Transactional
    public Student registerStudent(StudentRegisterRequest request){

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setRole("STUDENT");
        user.setStatus("PENDING");
        user.setPassword("student123"); // temporary password
        user = userRepository.save(user);

        Student student = new Student();
        student.setName(request.getName());
        student.setPhone(request.getPhone().trim());
        student.setDepartment(request.getDepartment());
        student.setStatus("ACTIVE");
        student.setUser(user);
        student = studentRepository.save(student);

        String token = UUID.randomUUID().toString();
        VerificationToken vt = new VerificationToken();
        vt.setToken(token);
        vt.setUser(user);
        tokenRepository.save(vt);

        String link = "http://localhost:8080/api/auth/verify?token=" + token;

        String body = "Click to verify your email: " + link +
                "\n\nYour default password is: student123" +
                "\nYou can change your password after logging in.";

        mailService.send(user.getEmail(), "Verify Your Email", body);


        return student;
    }

    @Override
    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::convert)
                .toList();
    }

    @Override
    public Student getStudentById(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    @Transactional
    public Student updateStudent(Integer id, Student studentData) {

        Student existing = getStudentById(id);

        existing.setName(studentData.getName());
        existing.setPhone(studentData.getPhone());
        existing.setDepartment(studentData.getDepartment());

        return studentRepository.save(existing);
    }

    @Override
    @Transactional
    public void deleteStudent(Integer id) {
        Student student = getStudentById(id);
        User user = student.getUser();

        studentRepository.delete(student);

        if(user != null){
            userRepository.delete(user);
        }
    }

    @Override
    @Transactional
    public Student updateStatus(Integer id, String value) {

        Student student = getStudentById(id);

        String normalized = value.trim().toLowerCase();

        if(!normalized.equals("active") && !normalized.equals("inactive")){
            throw new RuntimeException("Invalid Status Value");
        }
        student.setStatus(normalized);
        return studentRepository.save(student);
    }
}
