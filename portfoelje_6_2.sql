CREATE DATABASE student_cafe;

USE student_cafe;


CREATE TABLE cafes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cafe_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  description VARCHAR (1000),
  wifi BOOLEAN NOT NULL,
  serve_food BOOLEAN NOT NULL
);

-- Table: users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR (50) NOT NULL,
  username VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  location VARCHAR (255) NOT NULL
);


-- Table: favorites
CREATE TABLE favorites (
  user_id INT NOT NULL,
  cafe_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (cafe_id) REFERENCES cafes(id),
  UNIQUE KEY unique_favorites (user_id, cafe_id)
);



CREATE TABLE comments (
	id INT AUTO_INCREMENT PRIMARY KEY,
	comment VARCHAR (255),
	cafe_id INT NOT NULL,
    user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (cafe_id) REFERENCES cafes(id)
  );

CREATE TABLE ratings (
	rating INT NOT NULL,
	user_id INT NOT NULL,
    cafe_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (cafe_id) REFERENCES cafes(id)
  );


CREATE TABLE opening_hours (
	cafe_id INT NOT NULL,
	hverdag_opening_time TIME NOT NULL,
	hverdag_closing_time TIME NOT NULL,
    weekend_opening_time TIME,
	weekend_closing_time TIME,
  FOREIGN KEY (cafe_id) REFERENCES cafes(id)
);




INSERT INTO cafes (cafe_name, address, city, description, wifi, serve_food)
VALUES
  ('Café Nabo', 'Arne Jacobsens Allé 17', 'København', 'Vi er en nabocafe som elsker kaffe', true,true),
  ('Riccos kaffebar', 'Sluseholmen 28', 'København', 'Kom og se hvor seje vi er', true,false),
  ('The Living Room', 'Larsbjørnsstræde 17', 'København','kæmpe kaffe og kæmpe kærlighed', true,true),
  ('Cafe Kaffeblomst', 'Vester Torv 14', 'Espergærde','Min bror holder mig fanget hjælp', false,true),
  ('Halsnæs Bryghus', 'Norde Beddingsvej 35', 'Hundested','Her er vi næsvise hahahaha', false,false),
  ('Café Dagmar', 'Nørregade 20A', 'Hundested','vow vow vow.', true,true),
  ('Knæwr Kaffebar', 'Gerritsgade 21', 'Svendborg','Vi er alle pisse skæve men vores kage er ok', false,true),
  ('Brød', 'Gerritsgade 18B', 'Svendborg','Vi har brød', true,true),
  ('Frøken Friis', 'Nørregade 2', 'Kongens Lyngby','Vi brygger kaffe og sutter for samme pris', true,false),
  ('Minas Kaffebar', 'Nørrebrogade 72', 'København','Vi har både kaffe og kage og mere kaffe tihi', false,true);
  

  
INSERT INTO users (first_name, last_name, email, username, location) 
VALUES 
('john', 'Smith', 'john@mail.dk', 'johnny', 'Copenhagen'),
('Emily', 'Davis', 'emily@gmail.com', 'EmilyD', 'Aarhus'),
('Michael', 'Johnson', 'michael@outlook.dk', 'MichaelDK', 'Odense'),
('Sophia', 'Wilson', 'sophia@mail.dk', 'Sophia', 'Aalborg'),
('Jessica', 'Brown', 'jessica@gmail.com', 'JessicaBro', 'Esbjerg'),
('Christopher', 'Lee', 'christopherLee@gmail.com', 'Christoph', 'Randers'),
('Ashley', 'Martinez', 'Martinez@gmail.com', 'Ashley', 'Kolding'),
('Daniel', 'Taylor', 'DanielTaylor@mail.dk', 'Daniel', 'Horsens'),
('Olivia', 'Anderson', 'olivia@gmail.com', 'Olivia', 'Vejle'),
('William', 'White', 'willimWhite@gmail.com', 'William', 'Roskilde');




  
  
  INSERT INTO opening_hours (cafe_id, hverdag_opening_time, hverdag_closing_time, weekend_opening_time, weekend_closing_time)
VALUES
  (1, '07:30:00', '17:00:00', '08:00:00','18:00:00'),
  (2, '07:30:00', '18:00:00', '08:00:00', '18:00:00'),
  (3, '09:00:00', '23:00:00', '07:30:00', '21:00:00'),
  (4, '09:00:00', '18:00:00', '09:00:00', '16:00:00'),
  (5, '11:00:00', '21:00:00', '10:00:00', '22:00:00'),
  (6, '10:00:00', '17:00:00', '10:00:00', '17:00:00'),
  (7, '09:00:00', '17:30:00', '09:00:00', '17:00:00'),
  (8, '08:00:00', '17:30:00', '08:00:00', '16:00:00'),
  (9, '10:00:00', '20:00:00', '10:00:00', '18:00:00'),
  (10,'08:00:00', '22:00:00', '09:00:00', '22:00:00');


INSERT INTO favorites (user_id, cafe_id)
VALUES
  (1, 10),
  (2,9),
  (3,8),
  (4,7),
  (5,6),
  (6,5),
  (7,4),
  (8,3),
  (9,2),
  (10,1);
  
  select * from cafes;


