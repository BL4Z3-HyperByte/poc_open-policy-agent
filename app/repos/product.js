const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');

class Product {
  constructor(id, name, price, description, edit_link) {
    this.id = id ?? nanoid(8);
    this.name = name ?? faker.commerce.productName();
    this.price =
      price ?? faker.commerce.price({ min: 1000, max: 10000, dec: 2 });
    this.description = description ?? faker.commerce.productDescription();
    this.edit_link = edit_link ?? faker.internet.url({ protocol: 'https' });
  }

  toString() {
    return JSON.stringify(this, null, 4);
  }
}

module.exports = Product;
