const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API Subsidiarias',
      description: 'API de gestión de subsidiarias',
      version: '1.0.0',
      contact: {
        name: 'Felipe Velandia',
        email: 'fvelandia695@gmail.com',
      },
    },
  },
  apis: [
    'src/routes/auth.routes.js',
    'src/routes/empleado.routes.js',
    'src/routes/subsidiaria.routes.js',
    'src/routes/rol.routes.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Documentación de Swagger disponible en http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
