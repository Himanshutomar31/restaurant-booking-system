const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = require('./src/routes'); 

const app = express();

// Swagger definition
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Restaurant API',
        version: '1.0.0',
        description: 'API for managing restaurants, menus, and orders',
      },
    },
    apis: ['./routes/restaurantRoutes.js'], // Point to your routes file
  };



const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Create a catch-all route for testing the installation.
app.get('*', (req, res) => res.status(200).send({
  message: 'Hello World!',
}));

const port = 3000;

app.listen(port, () => {
  console.log('App is now running at port ', port)
})