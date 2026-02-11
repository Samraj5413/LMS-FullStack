package com.demo.lms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "student")
@DynamicUpdate
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Name cannot be empty")
    private String name;

//    @Email(message = "Invalid email format")
//    @NotBlank(message = "Email is required")
//    private String email;

    @Pattern(regexp = "^\\d{10}$", message = "Phone must be 10 digits")
    private String phone;

    private String department;
    private String status = "active";

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "student", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<IssueRecord> issueRecords;
}
