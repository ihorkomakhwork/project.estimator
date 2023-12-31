CREATE TYPE role_type AS ENUM('customer', 'employee', 'admin');

CREATE TYPE position_type AS ENUM('manager', 'developer');

CREATE TYPE position_level AS ENUM('trainee', 'junior', 'middle', 'senior', 'lead', 'c-level');

CREATE TYPE specialization_type AS ENUM('frontend', 'backend', 'full-stack', 'qa', 'devops', 'designer', 'project-manager', 'cto', 'ceo');

CREATE TYPE license_type AS ENUM('pe', 'le');

CREATE TYPE proposal_state AS ENUM('pending', 'processing', 'estimating', 'reject');

CREATE TYPE estimation_state AS ENUM('holding', 'processing', 'rejected', 'resolve');

CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(90) NOT NULL,
    role role_type NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Positions (
    id SERIAL PRIMARY KEY,
    area position_type NOT NULL,
    level position_level NOT NULL,
    specialization specialization_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Customers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    iban VARCHAR(255) NOT NULL,
    license license_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Employees (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    avaliable BOOLEAN NOT NULL DEFAULT TRUE,
    salary INTEGER NOT NULL,
    position_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (position_id) REFERENCES Positions(id)
);

CREATE TABLE Proposals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    budget INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    state proposal_state NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

CREATE TABLE IF NOT EXISTS ProjectsEstimations (
    id SERIAL PRIMARY KEY,
    responsible_employee_id INTEGER NOT NULL,
    proposal_id INTEGER NOT NULL,
    cost INTEGER,
    state estimation_state NOT NULL,
    message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (responsible_employee_id) REFERENCES Employees(id),
    FOREIGN KEY (proposal_id) REFERENCES Proposals(id)
);

CREATE TABLE IF NOT EXISTS Tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    project_estimation_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    estimate INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (project_estimation_id) REFERENCES ProjectsEstimations(id),
    FOREIGN KEY (employee_id) REFERENCES Employees(id)
);

CREATE TABLE IF NOT EXISTS Participants (
    id SERIAL PRIMARY KEY,
    project_estimation_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (project_estimation_id) REFERENCES ProjectsEstimations(id),
    FOREIGN KEY (employee_id) REFERENCES Employees(id)
);