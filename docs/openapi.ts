import { OpenAPIV3 } from 'openapi-types';

const apiDefinition: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'API',
    version: '0.0.0',
  },
  paths: {
    '/health': {
      get: {
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                examples: {
                  success: {
                    summary: 'Success',
                    value: {
                      status: 'up',
                      duration: 5,
                      db_version: 'PostgreSQL 14.1',
                    },
                  },
                  failure: {
                    summary: 'Failure',
                    value: {
                      status: 'down',
                      duration: 5,
                      error: 'Error: Something went wrong',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default apiDefinition;
