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
FROM products p, sizes s
WHERE p.name='Basic T-Shirt';

-- Jeans sizes
INSERT INTO product_sizes (product_id, size_id, stock)
SELECT p.id, s.id, 30
FROM products p, sizes s
WHERE p.name='Blue Jeans';

-- Hoodie sizes
INSERT INTO product_sizes (product_id, size_id, stock)
SELECT p.id, s.id, 40
FROM products p, sizes s
WHERE p.name='Cozy Hoodie';

-- Dress sizes
INSERT INTO product_sizes (product_id, size_id, stock)
SELECT p.id, s.id, 25
FROM products p, sizes s
WHERE p.name='Summer Dress';
