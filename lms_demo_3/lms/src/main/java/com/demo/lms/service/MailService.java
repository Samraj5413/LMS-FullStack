package com.demo.lms.service;

public interface MailService {
    void send(String to, String subject, String body);
}
