import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Task from './src/models/taskSchema.js';
import TaskHistory from './src/models/taskHistorySchema.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks back - express API with Swagger',
      version: '1.0.0',
      description: 'API documentation with swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/swagger/*.yml'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};
