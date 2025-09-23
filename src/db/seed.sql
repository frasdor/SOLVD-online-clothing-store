-- Clear existing data
TRUNCATE TABLE product_sizes RESTART IDENTITY CASCADE;
TRUNCATE TABLE products RESTART IDENTITY CASCADE;
TRUNCATE TABLE categories RESTART IDENTITY CASCADE;
TRUNCATE TABLE sizes RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Users
INSERT INTO users (name, email, password)
VALUES
('Alice Smith', 'alice@example.com', 'password1'),
('Bob Johnson', 'bob@example.com', 'password2');

-- Categories
INSERT INTO categories (name, description)
VALUES
('T-Shirts', 'Casual T-Shirts for everyday wear'),
('Jeans', 'Denim jeans for men and women'),
('Hoodies', 'Comfortable hooded sweatshirts'),
('Dresses', 'Various styles of dresses');

-- Sizes
INSERT INTO sizes (size, sorting_order)
VALUES
('XS', 1),
('S', 2),
('M', 3),
('L', 4),
('XL', 5),
('XXL', 6);

-- Products
INSERT INTO products (name, description, price, category_id)
VALUES
('Basic T-Shirt', 'Cotton T-Shirt', 15.99, (SELECT id FROM categories WHERE name='T-Shirts')),
('Blue Jeans', 'Slim fit jeans', 49.99, (SELECT id FROM categories WHERE name='Jeans')),
('Cozy Hoodie', 'Warm cotton hoodie', 35.99, (SELECT id FROM categories WHERE name='Hoodies')),
('Summer Dress', 'Light summer dress', 29.99, (SELECT id FROM categories WHERE name='Dresses'));

-- Product Sizes
-- T-Shirt sizes
INSERT INTO product_sizes (product_id, size_id, stock)
SELECT p.id, s.id, 50
FROM products p
JOIN sizes s ON s.sorting_order BETWEEN 1 AND 6
WHERE p.name='Basic T-Shirt'
ORDER BY s.sorting_order;

-- Jeans sizes
INSERT INTO product_sizes (product_id, size_id, stock)
SELECT p.id, s.id, 30
FROM products p
JOIN sizes s ON s.sorting_order BETWEEN 1 AND 6
WHERE p.name='Blue Jeans'
ORDER BY s.sorting_order;

-- Hoodie sizes
INSERT INTO product_sizes (product_id, size_id, stock)
SELECT p.id, s.id, 40
FROM products p
JOIN sizes s ON s.sorting_order BETWEEN 1 AND 6
WHERE p.name='Cozy Hoodie'
ORDER BY s.sorting_order;

-- Dress sizes
INSERT INTO product_sizes (product_id, size_id, stock)
SELECT p.id, s.id, 25
FROM products p
JOIN sizes s ON s.sorting_order BETWEEN 1 AND 6
WHERE p.name='Summer Dress'
ORDER BY s.sorting_order;

-- Check seeded data with sizes ordered XS -> XXL
SELECT 
    p.name AS product_name,
    s.size,
    ps.stock
FROM product_sizes ps
JOIN products p ON ps.product_id = p.id
JOIN sizes s ON ps.size_id = s.id
ORDER BY p.name, s.sorting_order;