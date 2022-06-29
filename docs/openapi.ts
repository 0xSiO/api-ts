import { OpenAPIV3 } from 'openapi-types';

const apiDefinition: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'API',
    version: '0.0.0',
  },
  components: {
    schemas: {
      Error: {
        type: 'object',
        required: ['id', 'status', 'message', 'details'],
        discriminator: { propertyName: 'status' },
        properties: {
          id: { type: 'string', format: 'uuid' },
          status: { type: 'number' },
          message: { type: 'string' },
          details: { type: 'object' },
        },
      },
      InternalServerError: {
        allOf: [
          { $ref: '#/components/schemas/Error' },
          {
            properties: {
              status: { default: 500 },
              message: { default: 'An unknown error occurred' },
            },
          },
        ],
      },
      BadRequestError: {
        allOf: [
          { $ref: '#/components/schemas/Error' },
          {
            properties: {
              status: { default: 400 },
              message: { default: 'Your request was malformed or invalid' },
            },
          },
        ],
      },
    },
    responses: {
      InternalServerError: {
        description: '',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/InternalServerError' },
          },
        },
      },
      BadRequestError: {
        description: '',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/BadRequestError' },
          },
        },
      },
    },
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
