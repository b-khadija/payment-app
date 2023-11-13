import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "mysql_db",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, //3306
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/Products", (req, res) => {
  const sql = "SELECT * FROM Products";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error inside server:", err);
      return res.json({ Message: "Error inside server" });
    }
    // Affiche le résultat dans la console
    return res.json(result);
  });
});

// Endpoint pour valider une commande
app.post("/Orders", async (req, res) => {
  const { cartItems, totalCartPrice } = req.body;
  console.log("Received order request. Data 🚨:", req.body);

  // Logs pour vérifier les données reçues
  console.log("Received data:", cartItems, totalCartPrice);

  // Créer un tableau pour stocker les valeurs de chaque article
  const orderData = cartItems.map((item) => {
    const { productId, quantity, totalPrice } = item;
    return [productId, quantity, totalPrice];
  });

  console.log("Order data to be inserted:", orderData);

  // Insérer une seule ligne avec toutes les informations de commande
  const insertOrderSql =
    "INSERT INTO Orders (product_ids, quantity, total_price) VALUES ?";

  db.query(insertOrderSql, [orderData], (err, result) => {
    if (err) {
      console.error("Error validating order:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Order inserted successfully. Result:", result);

      // Mettre à jour le stock dans la table "Products" pour chaque article
      const updateStockSql =
        "UPDATE Products SET inventory = inventory - ? WHERE id = ?";

      cartItems.forEach((item) => {
        const { productId, quantity } = item;
        db.query(updateStockSql, [quantity, productId], (stockUpdateError) => {
          if (stockUpdateError) {
            console.error('"Error updating stock:", stockUpdateError');
            res.status(500).json({ error: "Internal Server Error" });
          }
        });
      });

      console.log("Order validation success");
      res.status(200).json({ success: true });
    }
  });
});

app.listen(8081, () => {
  console.log("Listen");
});
