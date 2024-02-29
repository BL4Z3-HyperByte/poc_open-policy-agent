const express = require('express');
const cors = require('cors');
const { productsRouter } = require('./routes/products.route');

const app = express();
app.use(cors());

app.use(productsRouter);

// app.listen(9999, () => {
//   console.log('[+] SERVER STARTED ON PORT: 9999');
// });

module.exports = app;
