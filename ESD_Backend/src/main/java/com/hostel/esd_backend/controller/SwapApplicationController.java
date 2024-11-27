package com.hostel.esd_backend.controller;

import com.hostel.esd_backend.dto.SwapRequestDTO;
import com.hostel.esd_backend.dto.SwapResponseDTO;
import com.hostel.esd_backend.service.SwapApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/swap")
public class SwapApplicationController {
    private final SwapApplicationService swapApplicationService;

    @PostMapping("/request")
    public ResponseEntity<String> createSwapRequest(@RequestParam Long applicantId, @RequestBody @Valid SwapRequestDTO request) {
        return ResponseEntity.ok(swapApplicationService.createSwapRequest(applicantId, request));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<SwapResponseDTO>> getPendingRequests(@RequestParam Long recipientId) {
        return ResponseEntity.ok(swapApplicationService.getPendingRequests(recipientId));
    }

    @GetMapping("/applicant")
    public ResponseEntity<List<SwapResponseDTO>> getApplicantRequests(@RequestParam Long applicantId) {
        return ResponseEntity.ok(swapApplicationService.getApplicantRequests(applicantId));
    }




    @PostMapping("/accept/{id}")
    public ResponseEntity<String> acceptRequest(@PathVariable Long id) {
        return ResponseEntity.ok(swapApplicationService.acceptRequest(id));
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable Long id) {
        return ResponseEntity.ok(swapApplicationService.rejectRequest(id));
    }
}
