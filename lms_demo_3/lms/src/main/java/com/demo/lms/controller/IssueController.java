package com.demo.lms.controller;

import com.demo.lms.dto.IssueRequest;
import com.demo.lms.dto.IssueResponse;
import com.demo.lms.model.IssueRecord;
import com.demo.lms.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issue")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping
    public ResponseEntity<IssueRecord> issueBook(@RequestBody IssueRequest request){
        return ResponseEntity.ok(issueService.issueBook(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IssueRecord> returnBook(@PathVariable Integer id){
        return ResponseEntity.ok(issueService.returnBook(id));
    }

//    @GetMapping
//    public ResponseEntity<List<IssueRecord>> getAllIssuedBooks(){
//        return ResponseEntity.ok(issueService.getAllIssueRecords());
//    }

    @GetMapping("/active")
    public ResponseEntity<List<IssueResponse>> getActiveIssues(){
        return ResponseEntity.ok(issueService.getActiveIssues());
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<IssueResponse>> getOverDueIssues(){
        return ResponseEntity.ok(issueService.getOverDueIssues());
    }

//    @GetMapping("/all")
//    public ResponseEntity<List<IssueResponse>> getAllIssues(){
//        return ResponseEntity.ok(issueService.getAllIssues());
//    }

//    GET http://localhost:8080/api/issues/student/1
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getIssuesByStudent(@PathVariable Integer studentId){
        return ResponseEntity.ok(issueService.getIssuesByStudent(studentId));
    }

    @GetMapping("/returned")
    public ResponseEntity<List<IssueResponse>> getReturned(){
        return ResponseEntity.ok(issueService.getReturnedBooks());
    }

}
