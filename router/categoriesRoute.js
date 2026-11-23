const express = require("express");

const router = express.Router();

const db = require("../db");

router.get("/", async (req, res) => {
  try {
    console.log("log");

    const [result] = await db.query(`select c.name,c.description, count(p.name) as no_of_products
from categories c
inner join products p 
on c.id = p.category_id
GROUP by p.category_id`);

    console.log(result, "llll");

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ err: error });
  }
});

module.exports = router;
