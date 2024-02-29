const supertest = require('supertest');
const app = require('..');
const path = require('path');
const jestOpenAPI = require('jest-openapi').default;

jestOpenAPI(path.join(__dirname, '..', 'swagger.yml'));

describe('When a GET request is sent to /products', () => {
  it('should send an object containing an array of all available products', async () => {
    const response = await supertest(app)
      .get('/products')
      .expect(200)
      .expect('Content-Type', /json/)
      .timeout(200);

    console.log(response.body);

    expect(response.body).toHaveProperty('products');
    expect(response.body.products).toHaveProperty('length');
    expect(response).toSatisfyApiSpec();
  });
});

describe('When a GET request is sent to /products/000-0000', () => {
  it('should send an object containing the data of the product 000-0000', async () => {
    const response = await supertest(app)
      .get('/products/000-0000')
      .expect(200)
      .expect('Content-Type', /json/)
      .timeout(200);

    expect(response.body).toHaveProperty('product');
    expect(response.body).toMatchInlineSnapshot(
      {
        product: {
          id: expect.any(String),
          name: expect.any(String),
          price: expect.any(String),
          description: expect.any(String),
        },
      },
      `
{
  "product": {
    "description": Any<String>,
    "id": Any<String>,
    "name": Any<String>,
    "price": Any<String>,
  },
}
`
    );
    expect(response).toSatisfyApiSpec();
  });
});
