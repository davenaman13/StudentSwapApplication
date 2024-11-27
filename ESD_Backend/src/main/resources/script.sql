-- Create student table
CREATE TABLE student (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         first_name VARCHAR(255) NOT NULL,
                         last_name VARCHAR(255),
                         email VARCHAR(255) NOT NULL UNIQUE,
                         password VARCHAR(255) NOT NULL
);

-- Create hostel table
CREATE TABLE hostel (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        floor VARCHAR(255) NOT NULL,
                        room_number VARCHAR(255) NOT NULL,
                        student_id BIGINT
);

-- Create swap_application table
CREATE TABLE swap_application (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  applicant BIGINT NOT NULL,
                                  recipient BIGINT NOT NULL,
                                  applicant_message TEXT,
                                  recipient_message TEXT,
                                  status ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL
);
