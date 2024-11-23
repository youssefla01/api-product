const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Products Api',
    version: '1.0.0',
    description: 'API for managing products',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
  paths: {
    '/api/products': {
      get: {
        summary: 'Get all products',
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      price: { type: 'number' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new product',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number' },
                },
                required: ['name', 'price'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    product: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        price: { type: 'number' },
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
    '/api/products/{id}': {
      get: {
        summary: 'Get a product by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The product ID',
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
          },
          404: {
            description: 'Product not found',
          },
        },
      },
    },
  },
};

export default swaggerDocument;
