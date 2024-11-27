-- Insert sample students
INSERT INTO student (first_name, last_name, email, password)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 'password123'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'password123'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 'password123');

-- Insert sample hostels
INSERT INTO hostel (name, floor, room_number, student_id)
VALUES
    ('Hostel A', '1', '101', 1),
    ('Hostel B', '2', '201', 2),
    ('Hostel C', '3', '301', 3);

-- Insert sample swap applications
INSERT INTO swap_application (applicant, recipient, applicant_message, recipient_message, status)
VALUES
    (1, 2, 'I want to swap rooms with you.', NULL, 'PENDING'),
    (2, 3, 'Can we exchange rooms?', NULL, 'PENDING'),
    (3, 1, 'Interested in swapping rooms?', NULL, 'ACCEPTED');
