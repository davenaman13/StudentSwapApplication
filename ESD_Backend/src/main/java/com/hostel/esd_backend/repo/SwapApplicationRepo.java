package com.hostel.esd_backend.repo;

import com.hostel.esd_backend.entity.SwapApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SwapApplicationRepo extends JpaRepository<SwapApplication, Long> {
    List<SwapApplication> findByRecipientIdAndStatus(Long recipientId, SwapApplication.Status status);
}