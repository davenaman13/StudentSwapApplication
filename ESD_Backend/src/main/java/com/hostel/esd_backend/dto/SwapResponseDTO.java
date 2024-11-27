package com.hostel.esd_backend.dto;

import lombok.Builder;

@Builder
public record SwapResponseDTO(
        Long id,
        String applicantName,
        String recipientName,
        String applicantMessage,
        String recipientMessage,
        String status
) {}
