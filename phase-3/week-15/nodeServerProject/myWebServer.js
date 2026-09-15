const http = require("http");
const fs = require("fs");
const path = require("path"); // Q8: needed to resolve file paths/extensions
const random = require("./randomNumber"); // Q7a: import randomNumber module

const STATIC_DIR = path.join(__dirname, "static", "apple-html-css-replica");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

// Q6c/d, Q7a, Q8c-e: the request listener callback, evolved stage by stage.
// Each earlier stage is kept below (commented) so you can see the progression;
// the ACTIVE code implements the final stage: serving any file from /static.
const requestListener = (req, res) => {
  // --- Stage 1 (Q6c): always return a fixed text message ---
  // res.end("Request received and processed");

  // --- Stage 2 (Q7a): always return a random number ---
  // res.end(`Your random number is: ${random()}`);

  // --- Stage 3 (Q8c/d): always return about.html ---
  // fs.readFile(path.join(STATIC_DIR, "about.html"), (err, data) => {
  //   if (err) { res.writeHead(500); return res.end("Error loading page"); }
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.end(data);
  // });

  // --- Stage 4 (Q8e): serve any page inside the static folder based on the URL ---
  const requestedPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(STATIC_DIR, requestedPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Page Not Found");
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "text/plain" });
    res.end(data);
  });
};

// Q6a: server listening on port 1234
const server = http.createServer(requestListener);

server.listen(1234, () => {
  console.log("Server running"); // Q6a note: custom message to confirm server is running
});
