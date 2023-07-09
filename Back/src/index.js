const app = require('./app');

app.listen(process.env.PORT || 3080, (err) => {
  if (err) {
    console.error('Error escuchando: ', err);
    return;
  }
  console.log(`Escuchando en el puerto :${process.env.PORT || 3080}`);
});
