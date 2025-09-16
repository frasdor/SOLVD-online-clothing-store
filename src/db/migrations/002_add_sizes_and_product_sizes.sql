-- 1. Create the "sizes" table
CREATE TABLE IF NOT EXISTS sizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    size VARCHAR(10) NOT NULL
);

-- 2. Insert standard sizes (optional)
INSERT INTO sizes (size) VALUES
('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL')
ON CONFLICT DO NOTHING;

-- 3. Create the "product_sizes" table
CREATE TABLE IF NOT EXISTS product_sizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size_id UUID NOT NULL REFERENCES sizes(id) ON DELETE CASCADE,
    stock INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- 4. Drop the old "size" column from "products"
ALTER TABLE products
DROP COLUMN IF EXISTS size;

-- 5. Change the "quantity" column type in "order_items" to INTEGER
ALTER TABLE order_items
ALTER COLUMN quantity TYPE INTEGER USING quantity::INTEGER;
