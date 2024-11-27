package com.hostel.esd_backend.repo;

import com.hostel.esd_backend.entity.Hostel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HostelRepo extends JpaRepository<Hostel, Long> {
}
