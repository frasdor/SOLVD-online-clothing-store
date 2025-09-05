-- ----------------------------
-- Users
-- ----------------------------
INSERT INTO users (first_name, last_name, email, password)
VALUES 
('Alice', 'Smith', 'alice@example.com', 'password123'),
('Bob', 'Johnson', 'bob@example.com', 'password456');

-- ----------------------------
-- Categories
-- ----------------------------
INSERT INTO categories (description)
VALUES 
('T-Shirts'),
('Jeans'),
('Jackets');

-- ----------------------------
-- Products
-- ----------------------------
INSERT INTO products (name, size, price, description, category_id)
VALUES 
('Basic T-Shirt', 'M', 19.99, 'Cotton t-shirt', (SELECT id FROM categories WHERE description='T-Shirts')),
('Blue Jeans', 'L', 49.99, 'Denim jeans', (SELECT id FROM categories WHERE description='Jeans')),
('Leather Jacket', 'M', 129.99, 'Genuine leather', (SELECT id FROM categories WHERE description='Jackets'));

-- ----------------------------
-- Orders
-- ----------------------------
INSERT INTO orders (user_id, status)
VALUES 
((SELECT id FROM users WHERE email='alice@example.com'), 'pending'),
((SELECT id FROM users WHERE email='bob@example.com'), 'paid');

-- ----------------------------
-- Order Items
-- ----------------------------
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
(
  (SELECT id FROM orders WHERE user_id=(SELECT id FROM users WHERE email='alice@example.com') LIMIT 1),
  (SELECT id FROM products WHERE name='Basic T-Shirt'),
  2,
  19.99
),
(
  (SELECT id FROM orders WHERE user_id=(SELECT id FROM users WHERE email='bob@example.com') LIMIT 1),
  (SELECT id FROM products WHERE name='Blue Jeans'),
  1,
  49.99
);
