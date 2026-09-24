/* ==============================================================
   QUESTION 1
   Create a connection to the "myDB" database using the "mysql"
   module, with the "myDBuser" credentials, and log success/error.
   ============================================================== */

const mysql = require("mysql2"); // Import the mysql module to connect to MySQL databases

// Shared connection settings (reused by question2.js so credentials live in one place)
const dbConfig = {
  host: "localhost",
  user: "myDBuser",
  password: "sisay@21,1993",
  database: "myDB",
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.log("Error connecting to myDB:", err.message);
  } else {
    console.log("Successfully connected to the myDB database!");
  }
});

module.exports = { db, dbConfig };