CREATE TABLE users(id INT, nama VARCHAR(64), email VARCHAR(64));

INSERT TABLE users (id, nama, email) VALUES (1, 'faqih', 'faqih@gmail.com');

SELECT id, nama, email FROM users;

UPDATE users SET nama = 'ibnu', email = 'ibnu@gmail.com' WHERE id = 1;

DELETE FROM users WHERE id = 1;