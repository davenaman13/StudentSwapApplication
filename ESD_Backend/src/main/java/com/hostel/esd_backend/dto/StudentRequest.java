package com.hostel.esd_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record StudentRequest(
        @NotBlank String firstName,
        String lastName,
        @NotBlank @Email String email,
        @NotBlank String password
) {}
