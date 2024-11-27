-- Add foreign key to hostel table
ALTER TABLE hostel
    ADD CONSTRAINT fk_hostel_student
        FOREIGN KEY (student_id)
            REFERENCES student(id)
            ON DELETE CASCADE;

-- Add foreign key to swap_application table for applicant
ALTER TABLE swap_application
    ADD CONSTRAINT fk_swap_application_applicant
        FOREIGN KEY (applicant)
            REFERENCES student(id)
            ON DELETE CASCADE;

-- Add foreign key to swap_application table for recipient
ALTER TABLE swap_application
    ADD CONSTRAINT fk_swap_application_recipient
        FOREIGN KEY (recipient)
            REFERENCES student(id)
            ON DELETE CASCADE;
