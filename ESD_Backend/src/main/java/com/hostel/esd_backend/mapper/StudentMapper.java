package com.hostel.esd_backend.mapper;

import com.hostel.esd_backend.dto.StudentRequest;
import com.hostel.esd_backend.entity.Student;
import org.springframework.stereotype.Service;

@Service
public class StudentMapper {
    public Student toEntity(StudentRequest request) {
        return Student.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(request.password())
                .build();
    }
}
