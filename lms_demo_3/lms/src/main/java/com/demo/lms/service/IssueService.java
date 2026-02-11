package com.demo.lms.service;

import com.demo.lms.dto.IssueRequest;
import com.demo.lms.dto.IssueResponse;
import com.demo.lms.model.IssueRecord;

import java.util.List;

public interface IssueService {
    IssueRecord issueBook(IssueRequest request);
    IssueRecord returnBook(Integer id);
//    List<IssueRecord> getAllIssueRecords();
    List<IssueResponse> getActiveIssues();
    List<IssueResponse> getOverDueIssues();

//    List<IssueResponse> getAllIssues();
    List<IssueResponse> getIssuesByStudent(Integer studentId);
    List<IssueResponse> getReturnedBooks();
}
