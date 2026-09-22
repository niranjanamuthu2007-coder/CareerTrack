-- =====================================================
-- CAREERTRACK DATABASE
-- =====================================================

-- ================= USERS =================

CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- ================= DSA PROBLEMS =================

CREATE TABLE dsa_problems (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name VARCHAR(200) NOT NULL,

    topic VARCHAR(100) NOT NULL,

    difficulty VARCHAR(20) NOT NULL,

    solved BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_dsa_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


-- ================= JOB APPLICATIONS =================

CREATE TABLE job_applications (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    company VARCHAR(150) NOT NULL,

    position VARCHAR(150) NOT NULL,

    location VARCHAR(150),

    application_date DATE NOT NULL,

    status VARCHAR(30) DEFAULT 'Applied',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


-- ================= SKILLS =================

CREATE TABLE skills (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name VARCHAR(100) NOT NULL,

    category VARCHAR(100),

    progress INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_skill_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT skill_progress_check
        CHECK (progress >= 0 AND progress <= 100)

);


-- ================= STUDY TASKS =================

CREATE TABLE study_tasks (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    task_name VARCHAR(255) NOT NULL,

    category VARCHAR(100),

    priority VARCHAR(20) DEFAULT 'Medium',

    due_date DATE NOT NULL,

    completed BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_task_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);