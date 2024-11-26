package com.hostel.esd_backend.dto;

import lombok.Builder;

@Builder
public record StudentDetailsResponse(
        Long id,
        String firstName,
        String lastName,
        String email
) {}
