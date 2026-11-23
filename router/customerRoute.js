const express = require("express");

const router = express.Router();

const db = require("../db");

router.get("/search", async (req, res) => {
  try {

    const [result] = await db.query(`select * from customers where name like ?
`,[`%${req.query.name}%`]);

    console.log(result, "llll");

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ err: error });
  }
});

router.get("/customerDetails", async (req, res) => {
  try {
    console.log("log");

    const [result] = await db.query(`select c.name,c.email,c.phone, count(o.id) as no_of_orders
from customers c
inner join orders o 
on c.id = o.customer_id
GROUP by o.customer_id`);

    console.log(result, "llll");

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ err: error });
  }
});

// select o.id, o.total_amount, o.status from orders o
// join customers c on o.customer_id = c.id



module.exports = router;
