import request from 'supertest';
import { connect, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from "../src/app.js";
import product from "../src/model/product.schema.js"

let mongoServer;



describe('Product API', () => {

  beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await product.deleteMany({}); 
});


  describe('GET /api/v2/product', () => {
    it('should return an empty array when no product exist', async () => {
      const response = await request(app).get('/api/v2/product');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/v2/product', () => {
  it('should create a new user', async () => {
  const newProduct = {
      name: 'John Doe',
      price: 126345,
      description: 'securepassword',
     images: ['1243563'],
      stock:12346
    }
;
    const response = await request(app).post('/api/v2/product').send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.price).toBe(newProduct.price);
    expect(response.body.description).toBe(newProduct.description);
    expect(response.body.images).toEqual(newProduct.images);
    expect(response.body.stock).toBe(newProduct.stock)

  });

  it('should return 400 if required fields are missing', async () => {
    const incompleteProduct = { name: 'Jane Doe', price: 12244};
    const response = await request(app).post('/api/v2/product').send(incompleteProduct);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Could not create new product");
  });
});

describe('GET /api/v2/product/:id', () => {
 it("should get a single Product by id", async () => {
  const products = await product.create({
    name: 'Alice',
    price:9847,
    description: 'alicepassword',
    images: ['08098765432'],
    stock:445236
  })
  const response = await request(app).get(`/api/v2/product/${products._id}`);
  expect(response.status).toBe(200);
  expect(response.body.name).toBe('Alice');
 })

 it("should return 404 if user not found", async () => {
   const fakeId = await request(app).get('/api/v2/product/64b64c4f4f4f4f4f4f4f4f4f');
   expect(fakeId.status).toBe(400);
   expect(fakeId.body.message).toBe("product not found");
 })
})

 describe('DELETE /api/v2/product/:id', () => {
  it("should delete a product", async () => {
    const products = await product.create({
      name: "Charlie",
      price: 342562,
      description: "charliepassword",
      images: ["charliegender"],
      stock: 1616
    });

    const response = await request(app).delete(`/api/v2/product/${products._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Charlie");
    expect(response.body.price).toBe(products.price);
    expect(response.body.description).toBe(products.description);
    expect(response.body.images).toEqual(products.images);
    expect(response.body.stock).toBe(products.stock); // optional

    const checkProduct = await product.findById(products._id);
    expect(checkProduct).toBeNull();
    console.log("Response body:", response.body);

  });
});
})