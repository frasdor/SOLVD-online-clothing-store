const express = require('express');
const router = express.Router();
const client = require('../db/client');

// GET /products?size=M&category=T-Shirt&name=shirt
router.get('/', async (req, res) => {
  const { size, category, name } = req.query;

  try {
    let query = `
      SELECT p.id, p.name, p.description, p.price, c.name AS category, ps.stock, s.size
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN product_sizes ps ON ps.product_id = p.id
      JOIN sizes s ON s.id = ps.size_id
      WHERE ps.stock > 0
    `;
    const values = [];

    // Dynamic filters based on query params
    if (size) {
      values.push(size);
      query += ` AND s.size = $${values.length}`;
    }
    if (category) {
      values.push(category);
      query += ` AND c.name ILIKE $${values.length}`;
    }
    if (name) {
      values.push(`%${name}%`);
      query += ` AND p.name ILIKE $${values.length}`;
    }

    const result = await client.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;