import { OpenAPIV3 } from 'openapi-types';

const errorResponse = (
  status: number,
  message: string,
  details: object = {}
): OpenAPIV3.ResponseObject => ({
  description: message,
  content: {
    'application/json': {
      schema: {
        allOf: [
          { $ref: '#/components/schemas/Error' },
          {
            properties: {
              status: { example: status },
              message: { example: message },
              details: { example: details },
            },
          },
        ],
      },
    },
  },
});

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
    },
    responses: {
      InternalServerError: errorResponse(500, 'An unknown error occurred'),
      BadRequestError: errorResponse(400, 'Your request was malformed or invalid'),
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
