INSERT INTO users (
    name,
    email,
    password,
    is_admin
)
VALUES
(
    'Admin',
    'admin@example.com',
    '$2b$10$8v8M4n4F9t9G4qT7Jk4QVe6w7k6cH5J9lJYJ8cQ3g3sVY7YQh7B3S',
    TRUE
),
(
    'John Doe',
    'john@example.com',
    '$2b$10$8v8M4n4F9t9G4qT7Jk4QVe6w7k6cH5J9lJYJ8cQ3g3sVY7YQh7B3S',
    FALSE
),
(
    'Jane Doe',
    'jane@example.com',
    '$2b$10$8v8M4n4F9t9G4qT7Jk4QVe6w7k6cH5J9lJYJ8cQ3g3sVY7YQh7B3S',
    FALSE
);