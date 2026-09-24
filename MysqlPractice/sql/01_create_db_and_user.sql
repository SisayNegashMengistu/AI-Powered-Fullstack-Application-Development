-- ============================================================
-- Question 1: Create database "myDB" and user "myDBuser"
-- ============================================================
-- Run this file in your MySQL client (MAMP/WAMP/XAMPP -> phpMyAdmin
-- or the mysql command line) BEFORE running app.js.
--
-- Example (command line):
--   mysql -u root -p < sql/01_create_db_and_user.sql
-- ============================================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS myDB;

-- 2. Create the user
--    Change 'myDBuserPass123' to whatever password you want,
--    then update the same password in app.js (DB config).
CREATE USER IF NOT EXISTS 'myDBuser'@'localhost' IDENTIFIED BY 'myDBuserPass123';

-- 3. Grant myDBuser permission to connect to / use myDB
GRANT ALL PRIVILEGES ON myDB.* TO 'myDBuser'@'localhost';

FLUSH PRIVILEGES;
