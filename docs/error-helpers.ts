import crypto from 'node:crypto';

import { OpenAPIV3 } from 'openapi-types';

interface ErrorResponseOptions {
    status: number;
    message: string;
    details?: object;
    examples?: Record<string, ErrorExample>;
}

interface ErrorExample {
    message: string;
    details?: object;
}

export function errorResponse(options: ErrorResponseOptions): OpenAPIV3.ResponseObject {
    const examples: Record<string, OpenAPIV3.ExampleObject> = {};
    if (options.examples) {
        for (const [name, example] of Object.entries(options.examples)) {
            examples[name] = {
                summary: name,
                value: { id: crypto.randomUUID(), status: options.status, ...example },
            };
        }
    }

    return {
        description: options.message,
        content: {
            'application/json': {
                schema: {
                    allOf: [
                        { $ref: '#/components/schemas/Error' },
                        Object.keys(examples).length === 0
                            ? {
                                  properties: {
                                      status: { example: options.status },
                                      message: { example: options.message },
                                      details: { example: options.details ?? {} },
                                  },
                              }
                            : {},
                    ],
                },
                ...(options.examples ? { examples } : {}),
            },
        },
    };
}
