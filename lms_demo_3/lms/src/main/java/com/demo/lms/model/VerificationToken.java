package com.demo.lms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "verification_token")
@Data
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
