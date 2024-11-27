package com.hostel.esd_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hostel")
public class Hostel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "floor", nullable = false)
    private String floor;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
}
