const express = require('express');
const app = express();
const port = 5001;
const categoriesRoute = require('./router/categoriesRoute')
const customerRoute = require('./router/customerRoute')
const orderRoute = require('./router/ordersRoute')




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());



app.use('/categories',categoriesRoute);

app.use('/customers',customerRoute);
app.use('/orders',orderRoute);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});