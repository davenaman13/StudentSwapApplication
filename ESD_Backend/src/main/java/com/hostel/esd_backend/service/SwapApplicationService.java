package com.hostel.esd_backend.service;

import com.hostel.esd_backend.dto.SwapRequestDTO;
import com.hostel.esd_backend.dto.SwapResponseDTO;
import com.hostel.esd_backend.entity.*;
import com.hostel.esd_backend.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SwapApplicationService {
    private final StudentRepo studentRepo;
    private final HostelRepo hostelRepo;
    private final SwapApplicationRepo swapApplicationRepo;

    public String createSwapRequest(Long applicantId, SwapRequestDTO request) {
        Student applicant = studentRepo.findById(applicantId).orElseThrow();
        Student recipient = studentRepo.findById(request.recipientId()).orElseThrow();
        boolean existingRequest = swapApplicationRepo.existsByApplicantIdAndRecipientIdAndStatus(
                applicantId,
                request.recipientId(),
                SwapApplication.Status.PENDING
        );
        if (existingRequest) {
            throw new RuntimeException("A pending swap request already exists between the applicant and recipient");
        }
        SwapApplication swapApplication = SwapApplication.builder()
                .applicant(applicant)
                .recipient(recipient)
                .applicantMessage(request.applicantMessage())
                .status(SwapApplication.Status.PENDING)
                .build();

        swapApplicationRepo.save(swapApplication);
        return "Swap request created successfully!";
    }

    public List<SwapResponseDTO> getPendingRequests(Long recipientId) {
        List<SwapApplication> requests = swapApplicationRepo.findByRecipientIdAndStatus(recipientId, SwapApplication.Status.PENDING);
        return requests.stream()
                .map(request -> SwapResponseDTO.builder()
                        .id(request.getId())
                        .applicantName(request.getApplicant().getFirstName())
                        .recipientName(request.getRecipient().getFirstName())
                        .applicantMessage(request.getApplicantMessage())
                        .recipientMessage(request.getRecipientMessage())
                        .status(request.getStatus().name())
                        .build())
                .collect(Collectors.toList());
    }

    public String acceptRequest(Long requestId) {
        SwapApplication request = swapApplicationRepo.findById(requestId).orElseThrow();
        if (request.getStatus() != SwapApplication.Status.PENDING) {
            throw new IllegalStateException("Request is no longer pending.");
        }

        Hostel applicantHostel = request.getApplicant().getHostel();
        Hostel recipientHostel = request.getRecipient().getHostel();

        // Swap room details
        String tempRoom = applicantHostel.getRoomNumber();
        applicantHostel.setRoomNumber(recipientHostel.getRoomNumber());
        recipientHostel.setRoomNumber(tempRoom);

        hostelRepo.save(applicantHostel);
        hostelRepo.save(recipientHostel);

        // Update request status
        request.setStatus(SwapApplication.Status.ACCEPTED);
        swapApplicationRepo.save(request);

        return "Room swap request accepted!";
    }

    public String rejectRequest(Long requestId) {
        SwapApplication request = swapApplicationRepo.findById(requestId).orElseThrow();
        request.setStatus(SwapApplication.Status.REJECTED);
        swapApplicationRepo.save(request);
        return "Room swap request rejected!";
    }

    public List<SwapResponseDTO> getApplicantRequests(Long applicantId) {
        List<SwapApplication> requests = swapApplicationRepo.findByApplicantId(applicantId);
        return requests.stream()
                .map(request -> SwapResponseDTO.builder()
                        .id(request.getId())
                        .applicantName(request.getApplicant().getFirstName())
                        .recipientName(request.getRecipient().getFirstName())
                        .applicantMessage(request.getApplicantMessage())
                        .recipientMessage(request.getRecipientMessage())
                        .status(request.getStatus().name())
                        .build())
                .collect(Collectors.toList());
    }
}
