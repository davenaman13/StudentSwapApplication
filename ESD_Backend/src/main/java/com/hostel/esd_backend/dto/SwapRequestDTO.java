package com.hostel.esd_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SwapRequestDTO(
        @NotNull Long recipientId,
        String applicantMessage
) {}
