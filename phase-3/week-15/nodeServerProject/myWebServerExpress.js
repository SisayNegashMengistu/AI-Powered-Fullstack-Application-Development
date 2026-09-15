const express = require("express");
const path = require("path");
const random = require("./randomNumber"); // same random() function reused

const app = express();
const STATIC_DIR = path.join(__dirname, "static", "apple-html-css-replica");

// Q6c equivalent: a plain text route
app.get("/message", (req, res) => {
  res.send("Request received and processed");
});

// Q7a equivalent: return a random number
app.get("/random", (req, res) => {
  res.send(`Your random number is: ${random()}`);
});

// Q8c-e equivalent: serve static files from the "static" folder.
// express.static() is Express's built-in way to serve an entire folder
// (html, css, js, images, etc.) without manually reading files with fs.
app.use(express.static(STATIC_DIR));

app.listen(1234, () => {
  console.log("Server running"); // same confirmation message as the HTTP version
});
