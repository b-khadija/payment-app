USE bradery;

-- Table des commandes valider
CREATE TABLE Orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number INT,
  product_ids TEXT,
  quantity INT,
  total_price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);