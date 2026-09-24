# MysqlPractice — solutions

Based on the "Working with databases (MySQL)" practice exercises and the
`Relational_Database_Example_for_Apple_s_iphones_page_.xlsx` schema (5 tables:
**products**, **product_description**, **product_price**, **users**, **orders**).

## Folder contents

```
MysqlPractice/
├── app.js                      # Question 1, 2 (both methods) and 3
├── package.json
├── public/
│   └── index.html              # Question 3 form
└── sql/
    ├── 01_create_db_and_user.sql   # Question 1 — run this first, by hand
    └── 02_create_tables.sql        # Question 2 — reference copy (app.js also runs this)
```

## How to run

1. **Start MAMP/WAMP/XAMPP** so your local MySQL server is running.

2. **Question 1 — create the database & user.**
   Run the SQL setup script once, from a terminal (adjust the `-u`/`-p` to
   your MySQL root credentials):
   ```bash
   mysql -u root -p < sql/01_create_db_and_user.sql
   ```
   This creates database `myDB` and user `myDBuser` (password
   `myDBuserPass123`) with full privileges on `myDB`. If you'd rather use
   phpMyAdmin, just open `sql/01_create_db_and_user.sql` and run the
   statements there instead.

   > If you change the password, update the same value in `app.js`
   > (the two `mysql.createConnection({...})` blocks).

3. **Install Node dependencies:**
   ```bash
   cd MysqlPractice
   npm install
   ```

4. **Run the app:**
   ```bash
   node app.js
   ```
   You should see in the console:
   - `✅ Successfully connected to the myDB database!` (Question 1)
   - `✅ Tables created (or already exist) — direct execution on startup.` (Question 2, method 1)
   - `🚀 Server running at http://localhost:3000`

5. **Question 2, method 2 — create tables via the `/install` route.**
   Visit in your browser:
   ```
   http://localhost:3000/install
   ```
   This re-runs the same `CREATE TABLE IF NOT EXISTS ...` statements, this
   time triggered by the HTTP request instead of running on startup.

6. **Question 3 — add a product through the HTML form.**
   Visit:
   ```
   http://localhost:3000/index.html
   ```
   Fill in the product name and URL and submit. The form POSTs to
   `/add-product`, which is handled by Express + `body-parser`, and the
   data is inserted into the `products` table with a plain SQL
   `INSERT INTO products (...) VALUES (...)` query. Check your database
   (phpMyAdmin or `SELECT * FROM products;`) to confirm the new row.

## Schema (from the Excel file)

| Table                | Key columns                                                                 |
|----------------------|------------------------------------------------------------------------------|
| `products`           | `product_id` (PK), `product_url`, `product_name`                            |
| `product_description`| `description_id` (PK), `product_id` (FK), `product_brief_description`, `product_description`, `product_img`, `product_link` |
| `product_price`      | `price_id` (PK), `product_id` (FK), `starting_price`, `price_range`         |
| `users`              | `user_id` (PK), `user_name`, `user_password`                                |
| `orders`             | `order_id` (PK), `product_id` (FK), `user_id` (FK)                          |

## Notes / troubleshooting

- If `/install` or startup logs an error about the `users`/`products`
  tables already existing with different columns, drop the database and
  re-run `sql/01_create_db_and_user.sql`, or manually `DROP TABLE` the
  conflicting tables first.
- `mysql` (the classic driver used in the class videos) doesn't run
  multiple semicolon-separated statements by default, so the
  table-creation queries use a dedicated connection with
  `multipleStatements: true`. The regular `db` connection (used for the
  Question 3 insert) is left as a normal single-statement connection.
- CORS is enabled so the form will also work if you ever serve
  `index.html` from a different port/origin.
