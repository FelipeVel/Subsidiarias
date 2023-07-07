const express = require('express'),
  app = express(),
  puerto = process.env.PORT || 3080,
  bodyParser = require('body-parser'),
  cors = require('cors');

app.use(cors());
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static('static'));

app.use('/auth', require('./routes/auth.routes'));
app.use('/empleado', require('./routes/empleado.routes'));
app.use('/subsidiaria', require('./routes/subsidiaria.routes'));

app.listen(puerto, (err) => {
  if (err) {
    console.error('Error escuchando: ', err);
    return;
  }
  console.log(`Escuchando en el puerto :${puerto}`);
});
