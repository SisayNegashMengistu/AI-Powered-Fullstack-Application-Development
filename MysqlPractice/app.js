
// ============================================================
// MysqlPractice / app.js
// ============================================================
//
// Features:
//
// 1. Create database tables
// 2. Add one product manually
// 3. Upload TXT file containing multiple products
// 4. Insert TXT products into MySQL
// 5. View products
// 6. Update products
// 7. Delete products
//
// TXT FORMAT:
//
// Product Name|Product URL
//
// Example:
//
// iPhone 15 Pro|https://www.apple.com/iphone-15-pro/
// iPhone 15|https://www.apple.com/iphone-15/
// iPhone 14|https://www.apple.com/iphone-14/
//
// ============================================================

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// ============================================================
// DATABASE
// ============================================================

const { db } = require("./connection");

const {
  createTablesOnStartup,
  registerInstallRoute
} = require("./createTable");

const {
  registerAddProductRoute
} = require("./question3");

const {
  registerProductsRoute
} = require("./products");

// ============================================================
// EXPRESS APP
// ============================================================

const app = express();

const PORT = 3000;

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(cors());

// Parse HTML form data
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Parse JSON requests
app.use(bodyParser.json());

// Serve public directory
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

// ============================================================
// MULTER CONFIGURATION
// ============================================================

const uploadDirectory =
  path.join(__dirname, "uploads");

// Create uploads directory
if (!fs.existsSync(uploadDirectory)) {

  fs.mkdirSync(
    uploadDirectory,
    {
      recursive: true
    }
  );

}

// Configure multer
const upload =
  multer({

    dest: uploadDirectory,

    limits: {
      fileSize: 2 * 1024 * 1024
    },

    fileFilter:
      (req, file, callback) => {

        const isTxt =
          file.originalname
            .toLowerCase()
            .endsWith(".txt");

        if (!isTxt) {

          return callback(
            new Error(
              "Only .txt files are allowed."
            )
          );

        }

        callback(null, true);

      }

  });

// ============================================================
// CREATE TABLES
// ============================================================

createTablesOnStartup();

// ============================================================
// INSTALL ROUTE
// ============================================================

registerInstallRoute(app);

// ============================================================
// MANUAL ADD PRODUCT ROUTE
// ============================================================

registerAddProductRoute(app);

// ============================================================
// PRODUCT CRUD ROUTES
// ============================================================

registerProductsRoute(app);

// ============================================================
// TXT PRODUCT UPLOAD
// ============================================================

app.post(
  "/upload-products",
  upload.single("productFile"),
  (req, res) => {

    // ========================================================
    // CHECK FILE
    // ========================================================

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message:
          "Please upload a TXT file."
      });

    }

    const uploadedFile =
      req.file.path;

    try {

      // ======================================================
      // READ FILE
      // ======================================================

      const fileContent =
        fs.readFileSync(
          uploadedFile,
          "utf8"
        );

      // ======================================================
      // SPLIT FILE INTO LINES
      // ======================================================

      const lines =
        fileContent
          .split(/\r?\n/)
          .map(line => line.trim())
          .filter(line => line !== "");

      const products = [];
      const errors = [];

      // ======================================================
      // PROCESS EACH LINE
      // ======================================================

      lines.forEach(
        (line, index) => {

          // Ignore comments
          if (line.startsWith("#")) {
            return;
          }

          // --------------------------------------------------
          // Expected:
          //
          // Product Name|Product URL
          // --------------------------------------------------

          const parts =
            line.split("|");

          if (parts.length < 2) {

            errors.push(
              `Line ${index + 1}: Invalid format. Expected Product Name|Product URL`
            );

            return;

          }

          const productName =
            parts[0].trim();

          const productUrl =
            parts
              .slice(1)
              .join("|")
              .trim();

          // --------------------------------------------------
          // Validate name
          // --------------------------------------------------

          if (!productName) {

            errors.push(
              `Line ${index + 1}: Product name is empty`
            );

            return;

          }

          // --------------------------------------------------
          // Validate URL
          // --------------------------------------------------

          try {

            const url =
              new URL(productUrl);

            if (
              ![
                "http:",
                "https:"
              ].includes(
                url.protocol
              )
            ) {

              throw new Error();

            }

          } catch {

            errors.push(
              `Line ${index + 1}: Invalid URL`
            );

            return;

          }

          // --------------------------------------------------
          // Valid product
          // --------------------------------------------------

          products.push([
            productUrl,
            productName
          ]);

        }
      );

      // ======================================================
      // NO VALID PRODUCTS
      // ======================================================

      if (products.length === 0) {

        return res.status(400).json({

          success: false,

          message:
            "No valid products were found in the TXT file.",

          errors

        });

      }

      // ======================================================
      // INSERT TXT PRODUCTS
      // ======================================================

      const sql = `
        INSERT INTO products
        (
          product_url,
          product_name
        )
        VALUES ?
      `;

      db.query(
        sql,
        [products],
        (err, result) => {

          if (err) {

            console.error(
              "TXT import database error:",
              err.message
            );

            return res.status(500).json({

              success: false,

              message:
                "Products could not be added to the database.",

              error:
                err.message

            });

          }

          // ==================================================
          // SUCCESS
          // ==================================================

          return res.json({

            success: true,

            message:
              `${result.affectedRows} product(s) imported successfully.`,

            inserted:
              result.affectedRows,

            skipped:
              errors.length,

            errors

          });

        }
      );

    } catch (error) {

      console.error(
        "TXT file processing error:",
        error.message
      );

      return res.status(500).json({

        success: false,

        message:
          "Could not process the TXT file.",

        error:
          error.message

      });

    } finally {

      // ======================================================
      // DELETE TEMPORARY FILE
      // ======================================================

      setTimeout(() => {

        if (
          fs.existsSync(uploadedFile)
        ) {

          fs.unlink(
            uploadedFile,
            error => {

              if (error) {

                console.error(
                  "Could not delete temporary file:",
                  error.message
                );

              }

            }
          );

        }

      }, 1000);

    }

  }
);

// ============================================================
// MULTER / UPLOAD ERROR HANDLER
// ============================================================

app.use(
  (error, req, res, next) => {

    if (
      error instanceof
      multer.MulterError
    ) {

      return res.status(400).json({

        success: false,

        message:
          `Upload error: ${error.message}`

      });

    }

    if (
      error &&
      error.message ===
        "Only .txt files are allowed."
    ) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });

    }

    console.error(
      "Server error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "An unexpected server error occurred."

    });

  }
);

// ============================================================
// 404 HANDLER
// ============================================================

app.use(
  (req, res) => {

    return res.status(404).json({

      success: false,

      message:
        `Route not found: ${req.method} ${req.originalUrl}`

    });

  }
);

// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {

    console.log(
      "============================================"
    );

    console.log(
      "Product Management Server"
    );

    console.log(
      "============================================"
    );

    console.log(
      `Server: http://localhost:${PORT}`
    );

    console.log(
      `Add Product: http://localhost:${PORT}/index.html`
    );

    console.log(
      `Products: http://localhost:${PORT}/products.html`
    );

    console.log(
      `Install: http://localhost:${PORT}/install`
    );

    console.log(
      "TXT Upload: POST /upload-products"
    );

    console.log(
      "============================================"
    );

  }
);
