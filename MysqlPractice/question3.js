
// ============================================================
// question3.js
// ============================================================
// Handles manually typed product submission.
// POST /add-product
// Product fields:
//   product_name
//   product_url
// Description fields:
//   product_brief_description
//   product_description
//   product_img
//   product_link

const { db } = require("./connection");

// ============================================================
// REGISTER ADD PRODUCT ROUTE
// ============================================================

function registerAddProductRoute(app) {
  app.post("/add-product", (req, res) => {

    // ========================================================
    // GET PRODUCT DATA
    // ========================================================

    const {
      product_name,
      product_url,
      product_brief_description,
      product_description,
      product_img,
      product_link
    } = req.body;

    // ========================================================
    // TRIM VALUES
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
    // VALIDATION
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
    // VALIDATE PRODUCT URL
    // ========================================================

    try {

      const url = new URL(productUrl);

      if (
        !["http:", "https:"].includes(url.protocol)
      ) {
        throw new Error("Invalid protocol");
      }

    } catch {

      return res.status(400).json({
        success: false,
        message: "Please enter a valid HTTP or HTTPS product URL."
      });

    }

    // ========================================================
    // INSERT PRODUCT
    // ========================================================

    const productSql = `
      INSERT INTO products
      (
        product_url,
        product_name
      )
      VALUES (?, ?)
    `;

    db.query(
      productSql,
      [
        productUrl,
        productName
      ],
      (err, productResult) => {

        if (err) {

          console.error(
            "Error inserting product:",
            err.message
          );

          return res.status(500).json({
            success: false,
            message: "Unable to add product.",
            error: err.message
          });
        }

        // ====================================================
        // GET NEW PRODUCT ID
        // ====================================================

        const productId =
          productResult.insertId;

        // ====================================================
        // INSERT PRODUCT DESCRIPTION
        // ====================================================

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
          (descriptionErr, descriptionResult) => {

            if (descriptionErr) {

              console.error(
                "Error inserting product description:",
                descriptionErr.message
              );

              // ----------------------------------------------
              // Roll back the product if description failed
              // ----------------------------------------------

              db.query(
                `
                  DELETE FROM products
                  WHERE product_id = ?
                `,
                [productId],
                () => {}
              );

              return res.status(500).json({
                success: false,
                message:
                  "Product was created but its description could not be saved.",
                error: descriptionErr.message
              });
            }

            // =================================================
            // SUCCESS
            // =================================================

            console.log(
              `Product ${productId} added successfully`
            );

            return res.status(201).json({
              success: true,
              message: "Product added successfully.",
              product: {
                product_id: productId,
                product_name: productName,
                product_url: productUrl
              },
              description: {
                description_id:
                  descriptionResult.insertId,
                product_id: productId,
                product_brief_description:
                  briefDescription || null,
                product_description:
                  description || null,
                product_img:
                  productImg || null,
                product_link:
                  productLink || productUrl
              }
            });

          }
        );

      }
    );

  });

}

module.exports = {
  registerAddProductRoute
};
