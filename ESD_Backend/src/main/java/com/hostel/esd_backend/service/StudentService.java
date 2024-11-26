package com.hostel.esd_backend.service;

import com.hostel.esd_backend.dto.LoginRequest;
import com.hostel.esd_backend.dto.StudentDetailsResponse;
import com.hostel.esd_backend.dto.StudentRequest;
import com.hostel.esd_backend.entity.Student;
import com.hostel.esd_backend.jwt.JwtService;
import com.hostel.esd_backend.mapper.StudentMapper;
import com.hostel.esd_backend.repo.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepo repo;
    private final StudentMapper mapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String createStudent(StudentRequest request) {
        Student student = mapper.toEntity(request);
        student.setPassword(passwordEncoder.encode(request.password()));
        repo.save(student);
        return "Student created successfully!";
    }

    public String loginStudent(LoginRequest request) {
        Student student = repo.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(request.password(), student.getPassword())) {
            return jwtService.generateToken(student);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public StudentDetailsResponse getStudentDetails(Long studentId) {
        Student student = repo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return StudentDetailsResponse.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .build();
    }
}
