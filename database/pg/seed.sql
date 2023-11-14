-- Seed data for Users table
INSERT INTO Users (name, last_name, middle_name, email, password, role, country, city, address, phone)
VALUES ('John', 'Doe', 'Smith', 'johndoe@example.com', 'password', 'customer', 'USA', 'New York', '123 Main St', '555-555-5555');

INSERT INTO Users (name, last_name, middle_name, email, password, role, country, city, address, phone)
VALUES ('Jane', 'Doe', 'Lee', 'janedoe@example.com', 'password', 'employee', 'USA', 'San Francisco', '456 Elm St', '555-555-5556');

INSERT INTO Users (name, last_name, middle_name, email, password, role, country, city, address, phone)
VALUES ('Bob', 'Smith', 'Johnson', 'bobsmith@example.com', 'password', 'customer', 'USA', 'Los Angeles', '789 Oak St', '555-555-5557');

INSERT INTO Users (name, last_name, middle_name, email, password, role, country, city, address, phone)
VALUES ('Alice', 'Johnson', 'Brown', 'alicejohnson@example.com', 'password', 'employee', 'USA', 'Chicago', '1010 Maple St', '555-555-5558');

INSERT INTO Users (name, last_name, middle_name, email, password, role, country, city, address, phone)
VALUES ('Mike', 'Williams', 'Davis', 'mikewilliams@example.com', 'password', 'customer', 'USA', 'Houston', '1111 Pine St', '555-555-5559');

INSERT INTO Users (name, last_name, middle_name, email, password, role, country, city, address, phone)
VALUES ('Sarah', 'Davis', 'Wilson', 'sarahdavis@example.com', 'password', 'employee', 'USA', 'Seattle', '1212 Cedar St', '555-555-5560');

-- Seed data for Positions table
INSERT INTO Positions (type, level, name)
VALUES ('manager', 'senior', 'project-manager');

INSERT INTO Positions (type, level, name)
VALUES ('developer', 'middle', 'backend');

INSERT INTO Positions (type, level, name)
VALUES ('developer', 'junior', 'frontend');

INSERT INTO Positions (type, level, name)
VALUES ('manager', 'junior', 'team-lead');

INSERT INTO Positions (type, level, name)
VALUES ('developer', 'senior', 'full-stack');

INSERT INTO Positions (type, level, name)
VALUES ('manager', 'middle', 'product-manager');

-- Seed data for Customers table
INSERT INTO Customers (user_id, license)
VALUES (1, 'pe');

INSERT INTO Customers (user_id, license)
VALUES (3, 'ee');

INSERT INTO Customers (user_id, license)
VALUES (5, 'pe');

-- Seed data for Employees table
INSERT INTO Employees (user_id, avaliable, sallary, position_id)
VALUES (2, true, 5000, 2);

INSERT INTO Employees (user_id, avaliable, sallary, position_id)
VALUES (4, true, 6000, 5);

INSERT INTO Employees (user_id, avaliable, sallary, position_id)
VALUES (6, true, 7000, 1);

-- Seed data for Proposals table
INSERT INTO Proposals (title, content, budget, customer_id, state)
VALUES ('New Website Design', 'We need a new website design for our company', 10000, 1, 'pending');

INSERT INTO Proposals (title, content, budget, customer_id, state)
VALUES ('Mobile App Development', 'We need a mobile app for our business', 15000, 3, 'pending');

INSERT INTO Proposals (title, content, budget, customer_id, state)
VALUES ('E-commerce Website', 'We need an online store for our products', 20000, 5, 'pending');

-- Seed data for ProjectsEstimations table
INSERT INTO ProjectsEstimations (responsible_employee_id, proposal_id, cost, state, message)
VALUES (1, 1, 8000, 'processing', 'We can complete this project within 2 months');

INSERT INTO ProjectsEstimations (responsible_employee_id, proposal_id, cost, state, message)
VALUES (2, 2, 12000, 'processing', 'We can complete this project within 3 months');

INSERT INTO ProjectsEstimations (responsible_employee_id, proposal_id, cost, state, message)
VALUES (3, 3, 18000, 'processing', 'We can complete this project within 4 months');

-- Seed data for Tasks table
INSERT INTO Tasks (project_estimation_id, employee_id, estimate, description)
VALUES (1, 2, '10 hours', 'Design homepage layout');

INSERT INTO Tasks (project_estimation_id, employee_id, estimate, description)
VALUES (2, 4, '60 hours', 'Develop mobile app UI');

INSERT INTO Tasks (project_estimation_id, employee_id, estimate, description)
VALUES (3, 6, '20 hours', 'Create online store layout');

-- Seed data for InvolvedEmployees table
INSERT INTO InvolvedEmployees (project_estimation_id, employee_id)
VALUES (1, 2);

INSERT INTO InvolvedEmployees (project_estimation_id, employee_id)
VALUES (2, 4);

INSERT INTO InvolvedEmployees (project_estimation_id, employee_id)
VALUES (3, 6);
