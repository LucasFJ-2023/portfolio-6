SELECT * FROM student_cafe.users;

ALTER TABLE users
ADD COLUMN password VARCHAR(255);

UPDATE users
SET password = 'password123'
WHERE id = 1;

UPDATE users
SET password = 'password124'
WHERE id = 2;

UPDATE users
SET password = 'password125'
WHERE id = 3;

UPDATE users
SET password = 'password126'
WHERE id = 4;

UPDATE users
SET password = 'password127'
WHERE id = 5;

UPDATE users
SET password = 'password128'
WHERE id = 6;

UPDATE users
SET password = 'password129'
WHERE id = 7;

UPDATE users
SET password = 'password130'
WHERE id = 8;

UPDATE users
SET password = 'password131'
WHERE id = 9;

UPDATE users
SET password = 'password132'
WHERE id = 10;

UPDATE users
SET password = 'password133'
WHERE id = 11;


