package com.demo.lms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "ISBN cannot be blank")
    @Column(name = "isbn", nullable = false, unique = true)
    private String isbn;

    @NotBlank(message = "title is required")
    @Column(name = "title", nullable = false)
    private String title;

    private String author;

    @Column(nullable = false)
    private String category;

    @Min(value = 1, message = "Total copies must be at least 1")
    @Column(name = "total_copies", nullable = false)
    private Integer totalCopies;

    @Min(value = 0, message = "Available copies cannot be negative")
    @Column(name = "available_copies", nullable = false)
    private Integer availableCopies;
}
