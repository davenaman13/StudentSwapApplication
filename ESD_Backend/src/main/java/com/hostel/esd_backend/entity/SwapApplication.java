package com.hostel.esd_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "swap_application")
public class SwapApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "applicant", nullable = false)
    private Student applicant;

    @ManyToOne
    @JoinColumn(name = "recipient", nullable = false)
    private Student recipient;

    @Column(name = "applicant_message")
    private String applicantMessage;

    @Column(name = "recipient_message")
    private String recipientMessage;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    public enum Status {
        PENDING, ACCEPTED, REJECTED
    }
}
