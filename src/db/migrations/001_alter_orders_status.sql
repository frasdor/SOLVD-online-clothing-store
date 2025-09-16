-- 1. Create enum type (if it doesn’t already exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
    END IF;
END$$;

-- 2. Drop the old VARCHAR column
ALTER TABLE orders DROP COLUMN status;

-- 3. Add a new column with ENUM type
ALTER TABLE orders ADD COLUMN status order_status DEFAULT 'pending' NOT NULL;
