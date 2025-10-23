import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Tin API',
      version: '1.0.0',
      description: 'API docs for Products and Customers',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['code', 'name', 'price', 'stock'],
          properties: {
            id: { type: 'integer', example: 1 },
            code: { type: 'string', example: 'P-001' },
            name: { type: 'string', example: 'Laptop' },
            description: { type: 'string', example: 'Powerful laptop' },
            price: { type: 'number', example: 999.99 },
            stock: { type: 'integer', example: 10 },
          },
        },
        Customer: {
          type: 'object',
          required: ['name'],
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            phone: { type: 'string', example: '+123456789' },
            address: { type: 'string', example: '742 Evergreen Terrace' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
      Order: {
        type: 'object',
        required: ['customer_id', 'items'],
        properties: {
          id: { type: 'integer', example: 1 },
          customer_id: { type: 'integer', example: 1 },
          total: { type: 'number', example: 1299.97 },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product_id: { type: 'integer', example: 2 },
                quantity: { type: 'integer', example: 3 }
              }
            }
          }
        }
      },
    },
    paths: {
      '/products': {
        get: {
          summary: 'List products',
          responses: {
            '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        post: {
          summary: 'Create product',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
          responses: {
            '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
            '400': { description: 'Bad request (duplicate code)', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/products/{id}': {
        get: {
          summary: 'Get product by id',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
            '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        put: {
          summary: 'Update product',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
          responses: {
            '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
            '400': { description: 'Bad request (duplicate code)', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        delete: {
          summary: 'Delete product',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            '204': { description: 'No Content' },
            '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/customers': {
        get: {
          summary: 'List customers',
          responses: {
            '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Customer' } } } } },
          },
        },
        post: {
          summary: 'Create customer',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } },
          responses: {
            '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } },
            '400': { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/orders': {
        post: {
          summary: 'Registrar pedido',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order'
                },
                example: {
                  customer_id: 1,
                  items: [
                    { product_id: 2, quantity: 3 },
                    { product_id: 5, quantity: 1 }
                  ]
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Pedido creado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Order' },
                  example: {
                    id: 10,
                    customer_id: 1,
                    total: 1299.97,
                    items: [
                      { product_id: 2, quantity: 3 },
                      { product_id: 5, quantity: 1 }
                    ]
                  }
                }
              }
            },
            '400': {
              description: 'Stock insuficiente',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { message: 'Insufficient stock for product P-001' }
                }
              }
            },
            '404': {
              description: 'Producto no encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { message: 'Product 2 not found' }
                }
              }
            },
            '500': {
              description: 'Error interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            }
          }
        },
        get: {
          summary: 'Consultar pedidos',
          parameters: [
            { name: 'customer_id', in: 'query', required: false, schema: { type: 'integer' }, example: 1 },
            { name: 'product_id', in: 'query', required: false, schema: { type: 'integer' }, example: 2 }
          ],
          responses: {
            '200': {
              description: 'Listado de pedidos',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/Order' } },
                  example: [
                    {
                      id: 10,
                      customer_id: 1,
                      total: 1299.97,
                      items: [
                        { product_id: 2, quantity: 3 },
                        { product_id: 5, quantity: 1 }
                      ]
                    }
                  ]
                }
              }
            },
            '500': {
              description: 'Error interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            }
          }
        }
      },
      '/customers/{id}': {
        get: {
          summary: 'Get customer',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } },
            '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        put: {
          summary: 'Update customer',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } },
          responses: {
            '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } },
            '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        delete: {
          summary: 'Delete customer',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            '204': { description: 'No Content' },
            '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options as any);
export default swaggerSpec;
