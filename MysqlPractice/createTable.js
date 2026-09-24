/* ==============================================================
   QUESTION 2
   SQL to create the 5 apple.com/iphones tables:
     1. products             (PK)
     2. product_description  (FK -> products)
     3. product_price        (FK -> products)
     4. users                (additional table)
     5. orders               (FK -> products, FK -> users)

   Per the assignment, we try BOTH ways of running this query:
     (a) directly in the module, executed as soon as the app runs
     (b) via Express, executed only when "/install" is visited
   ============================================================== */

const mysql = require("mysql2");// Import the mysql module to connect to MySQL databases
const { dbConfig } = require("./connection");// Import the database connection configuration from connection.js

const createTablesSQL = `
  CREATE TABLE IF NOT EXISTS products (
    product_id   INT AUTO_INCREMENT PRIMARY KEY,
    product_url  VARCHAR(255) NOT NULL,
    product_name VARCHAR(150) NOT NULL
  );

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

  CREATE TABLE IF NOT EXISTS product_price (
    price_id       INT AUTO_INCREMENT PRIMARY KEY,
    product_id     INT NOT NULL,
    starting_price DECIMAL(10,2) NOT NULL,
    price_range    VARCHAR(255),
    CONSTRAINT fk_price_product
      FOREIGN KEY (product_id) REFERENCES products(product_id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS users (
    user_id       INT AUTO_INCREMENT PRIMARY KEY,
    user_name     VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL
  );

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
`;

// mysql's default driver runs one statement per query() call, so we
// use a dedicated connection with multipleStatements enabled just for
// this install script (keeps the main `db` connection simple/safe).
const installDb = mysql.createConnection({
  ...dbConfig,
  multipleStatements: true,
});
// (a) Run directly, as soon as this module is loaded (app startup)
function createTablesOnStartup() {
  installDb.query(createTablesSQL, (err) => {
    if (err) {
      console.log("Error creating tables directly on startup:", err.message);
    } else {
      console.log("Tables created (or already exist) — direct execution on startup.");
    }
  });
}

// (b) Run the same query only when "/install" is visited
function registerInstallRoute(app) {
  app.get("/install", (req, res) => {
    installDb.query(createTablesSQL, (err) => {
      if (err) {
        console.log("Error creating tables via /install:", err.message);
        res.status(500).send("Error creating tables: " + err.message);
      } else {
        console.log("Tables created (or already exist) — via /install route.");
        res.send("Tables created (or already existed) successfully!");
      }
    });
  });
}

module.exports = { createTablesOnStartup, registerInstallRoute };