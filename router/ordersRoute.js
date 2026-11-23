const express = require("express");

const router = express.Router();

const db = require("../db");




router.get("/daterange", async (req, res) => {
  try {
    console.log("log from");

    console.log(req.body.start,req.body.end);

    const [result] = await db.query(
      `select * from orders
where created_at between ? and ?`,
      [req.body.start,req.body.end]
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ err: error });
  }
});


router.get("/week", async (req, res) => {
  try {
    console.log("log from");
     const currentDate = new Date();

    const lastWeekDate = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000,
    );
    console.log(lastWeekDate, "date");

    const [result] = await db.query(
      `  select * from orders  
  where created_at > ?
`,
      [lastWeekDate],
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ err: error });
  }
});


router.get("/:id", async (req, res) => {
  try {
    console.log("logssssss");

    const [result] = await db.query(
      `select * from orders where customer_id = ?
`,
      [req.params.id],
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ err: error });
  }
});


router.patch("/cancel/:id", async (req, res) => {
  try {
    await db.query("update orders set status = ? where id = ?", [
      "CANCELLED",
      req.params.id,
    ]);

    const [stock] = await db.query(
      "select stock from products where id = (select product_id from orders where id = ?)",
      [req.params.id],
    );

    console.log(stock[0].stock, "stockkkkk");

    await db.query(
      "update products set stock = ? where id = (select product_id from orders where id = ?)",
      [stock[0].stock + 1, req.params.id],
    );

    res.status(202).json({ msg: "order cancelled successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ err: error });
  }
});

module.exports = router;
