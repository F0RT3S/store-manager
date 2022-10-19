const express = require('express');

const app = express();
app.use(express.json());

const routeProducts = require('./routes/productRoute');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routeProducts);
module.exports = app;
