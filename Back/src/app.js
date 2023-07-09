const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  morgan = require('morgan');

app.use(cors());
require('dotenv').config();
app.use(morgan('tiny'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static('static'));

app.use('/auth', require('./routes/auth.routes'));
app.use('/empleado', require('./routes/empleado.routes'));
app.use('/subsidiaria', require('./routes/subsidiaria.routes'));
app.use('/rol', require('./routes/rol.routes'));

module.exports = app;
