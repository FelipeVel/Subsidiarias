const app = require('./app');
const swaggerDocs = require('./swagger');
const port = process.env.PORT || 3080;

app.listen(port, (err) => {
  if (err) {
    console.error('Error escuchando: ', err);
    return;
  }
  console.log(`Escuchando en: http://localhost:${port}`);
  swaggerDocs(app, port);
});
