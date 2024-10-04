import { OpenAPIV3 } from 'openapi-types';

import { errorResponse } from './error-helpers';

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
            InternalServerError: errorResponse({
                status: 500,
                message: 'An unknown error occurred',
            }),
            MultiExampleError: errorResponse({
                status: 400,
                message: 'Your request was malformed or invalid',
                examples: {
                    'Example One': {
                        message: 'Multi-error example 1',
                        details: { example: 'details 1' },
                    },
                    'Example Two': {
                        message: 'Multi-error example 2',
                        details: { example: 'details 2' },
                    },
                },
            }),
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
