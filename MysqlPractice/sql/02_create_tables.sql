-- ============================================================
-- Question 2: Create the 5 apple.com/iphones tables inside myDB
-- ============================================================
-- This is a standalone copy of the same queries that app.js runs
-- programmatically (both directly, and again via the /install route).
-- You do NOT need to run this file by hand -- it's here for reference.
-- ============================================================

USE myDB;

-- 1) products  (PK table)
CREATE TABLE IF NOT EXISTS products (
  product_id   INT AUTO_INCREMENT PRIMARY KEY,
  product_url  VARCHAR(255) NOT NULL,
  product_name VARCHAR(150) NOT NULL
);

-- 2) product_description  (FK -> products)
CREATE TABLE IF NOT EXISTS product_description (
  description_id            INT AUTO_INCREMENT PRIMARY KEY,
  product_id                INT NOT NULL,
  product_brief_description VARCHAR(255),
  product_description       TEXT,
  product_img               VARCHAR(500),
  product_link              VARCHAR(500),
  CONSTRAINT fk_description_product
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE
);

-- 3) product_price  (FK -> products)
CREATE TABLE IF NOT EXISTS product_price (
  price_id       INT AUTO_INCREMENT PRIMARY KEY,
  product_id     INT NOT NULL,
  starting_price DECIMAL(10,2) NOT NULL,
  price_range    VARCHAR(255),
  CONSTRAINT fk_price_product
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE
);

-- 4) users  (additional table, standalone)
CREATE TABLE IF NOT EXISTS users (
  user_id       INT AUTO_INCREMENT PRIMARY KEY,
  user_name     VARCHAR(50) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

-- 5) orders  (additional table, FK -> products and FK -> users)
CREATE TABLE IF NOT EXISTS orders (
  order_id   INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id    INT NOT NULL,
  CONSTRAINT fk_order_product
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_order_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);
