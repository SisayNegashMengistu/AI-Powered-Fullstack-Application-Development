
// ============================================================
// products.js
// CRUD operations for products
// ============================================================
//
// GET    /products       -> Fetch all products + descriptions
// PUT    /products/:id   -> Update product + description
// DELETE /products/:id   -> Delete product + description
//
// ============================================================

const { db } = require("./connection");

// ============================================================
// REGISTER PRODUCT ROUTES
// ============================================================

function registerProductsRoute(app) {

  // ==========================================================
  // GET /products
  // ==========================================================
  // Fetch products together with product_description
  // ==========================================================

  app.get("/products", (req, res) => {

    const sql = `
      SELECT
        p.product_id,
        p.product_url,
        p.product_name,

        pd.description_id,
        pd.product_brief_description,
        pd.product_description,
        pd.product_img,
        pd.product_link

      FROM products p

      LEFT JOIN product_description pd
        ON p.product_id = pd.product_id

      ORDER BY p.product_id DESC
    `;

    db.query(
      sql,
      (err, results) => {

        if (err) {

          console.error(
            "Error fetching products:",
            err.message
          );

          return res.status(500).json({
            success: false,
            message: "Unable to fetch products.",
            error: err.message
          });
        }

        return res.json({
          success: true,
          products: results
        });

      }
    );

  });


  // ==========================================================
  // PUT /products/:id
  // ==========================================================
  // Update product + product description
  // ==========================================================

  app.put("/products/:id", (req, res) => {

    const productId =
      req.params.id;

    const {
      product_name,
      product_url,
      product_brief_description,
      product_description,
      product_img,
      product_link
    } = req.body;

    // ========================================================
    // CLEAN VALUES
    // ========================================================

    const productName =
      typeof product_name === "string"
        ? product_name.trim()
        : "";

    const productUrl =
      typeof product_url === "string"
        ? product_url.trim()
        : "";

    const briefDescription =
      typeof product_brief_description === "string"
        ? product_brief_description.trim()
        : "";

    const description =
      typeof product_description === "string"
        ? product_description.trim()
        : "";

    const productImg =
      typeof product_img === "string"
        ? product_img.trim()
        : "";

    const productLink =
      typeof product_link === "string"
        ? product_link.trim()
        : "";

    // ========================================================
    // VALIDATE
    // ========================================================

    if (!productName) {

      return res.status(400).json({
        success: false,
        message: "Product name is required."
      });

    }

    if (!productUrl) {

      return res.status(400).json({
        success: false,
        message: "Product URL is required."
      });

    }

    // ========================================================
    // VALIDATE URL
    // ========================================================

    try {

      const url =
        new URL(productUrl);

      if (
        !["http:", "https:"].includes(
          url.protocol
        )
      ) {
        throw new Error();
      }

    } catch {

      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid HTTP or HTTPS product URL."
      });

    }

    // ========================================================
    // UPDATE PRODUCTS TABLE
    // ========================================================

    const productSql = `
      UPDATE products
      SET
        product_name = ?,
        product_url = ?
      WHERE product_id = ?
    `;

    db.query(
      productSql,
      [
        productName,
        productUrl,
        productId
      ],
      (err, result) => {

        if (err) {

          console.error(
            "Error updating product:",
            err.message
          );

          return res.status(500).json({
            success: false,
            message: "Unable to update product.",
            error: err.message
          });

        }

        // ====================================================
        // PRODUCT DOES NOT EXIST
        // ====================================================

        if (result.affectedRows === 0) {

          return res.status(404).json({
            success: false,
            message: "Product not found."
          });

        }

        // ====================================================
        // CHECK DESCRIPTION RECORD
        // ====================================================

        const checkDescriptionSql = `
          SELECT description_id
          FROM product_description
          WHERE product_id = ?
          LIMIT 1
        `;

        db.query(
          checkDescriptionSql,
          [productId],
          (descriptionErr, descriptionRows) => {

            if (descriptionErr) {

              console.error(
                "Error checking description:",
                descriptionErr.message
              );

              return res.status(500).json({
                success: false,
                message:
                  "Product updated, but description could not be checked.",
                error: descriptionErr.message
              });

            }

            // =================================================
            // DESCRIPTION EXISTS -> UPDATE
            // =================================================

            if (descriptionRows.length > 0) {

              const descriptionSql = `
                UPDATE product_description
                SET
                  product_brief_description = ?,
                  product_description = ?,
                  product_img = ?,
                  product_link = ?
                WHERE product_id = ?
              `;

              db.query(
                descriptionSql,
                [
                  briefDescription || null,
                  description || null,
                  productImg || null,
                  productLink || productUrl,
                  productId
                ],
                (updateDescriptionErr) => {

                  if (updateDescriptionErr) {

                    console.error(
                      "Error updating description:",
                      updateDescriptionErr.message
                    );

                    return res.status(500).json({
                      success: false,
                      message:
                        "Product updated, but description could not be updated.",
                      error:
                        updateDescriptionErr.message
                    });

                  }

                  return res.json({
                    success: true,
                    message:
                      "Product and description updated successfully."
                  });

                }
              );

            }

            // =================================================
            // DESCRIPTION DOES NOT EXIST -> INSERT
            // =================================================

            else {

              const descriptionSql = `
                INSERT INTO product_description
                (
                  product_id,
                  product_brief_description,
                  product_description,
                  product_img,
                  product_link
                )
                VALUES (?, ?, ?, ?, ?)
              `;

              db.query(
                descriptionSql,
                [
                  productId,
                  briefDescription || null,
                  description || null,
                  productImg || null,
                  productLink || productUrl
                ],
                (insertDescriptionErr) => {

                  if (insertDescriptionErr) {

                    console.error(
                      "Error inserting description:",
                      insertDescriptionErr.message
                    );

                    return res.status(500).json({
                      success: false,
                      message:
                        "Product updated, but description could not be created.",
                      error:
                        insertDescriptionErr.message
                    });

                  }

                  return res.json({
                    success: true,
                    message:
                      "Product and description updated successfully."
                  });

                }
              );

            }

          }
        );

      }
    );

  });


  // ==========================================================
  // DELETE /products/:id
  // ==========================================================
  // Delete description first, then product
  // ==========================================================

  app.delete("/products/:id", (req, res) => {

    const productId =
      req.params.id;

    // ========================================================
    // DELETE DESCRIPTION
    // ========================================================

    const descriptionSql = `
      DELETE FROM product_description
      WHERE product_id = ?
    `;

    db.query(
      descriptionSql,
      [productId],
      (descriptionErr) => {

        if (descriptionErr) {

          console.error(
            "Error deleting description:",
            descriptionErr.message
          );

          return res.status(500).json({
            success: false,
            message:
              "Unable to delete product description.",
            error:
              descriptionErr.message
          });

        }

        // ====================================================
        // DELETE PRODUCT
        // ====================================================

        const productSql = `
          DELETE FROM products
          WHERE product_id = ?
        `;

        db.query(
          productSql,
          [productId],
          (err, result) => {

            if (err) {

              console.error(
                "Error deleting product:",
                err.message
              );

              return res.status(500).json({
                success: false,
                message:
                  "Unable to delete product.",
                error: err.message
              });

            }

            // ================================================
            // PRODUCT NOT FOUND
            // ================================================

            if (result.affectedRows === 0) {

              return res.status(404).json({
                success: false,
                message:
                  "Product not found."
              });

            }

            console.log(
              `🗑️ Product ${productId} deleted successfully`
            );

            return res.json({
              success: true,
              message:
                "Product and description deleted successfully."
            });

          }
        );

      }
    );

  });

}

module.exports = {
  registerProductsRoute
};
