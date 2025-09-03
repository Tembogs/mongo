import request from 'supertest';
import { connect, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from "../src/app.js";
import  User  from '../src/model/user.js';

let mongoServer;



describe('User API', () => {

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

beforeEach(async () => {
  await User.deleteMany({}); 
});


  describe('GET /api/v1/users', () => {
    it('should return an empty array when no users exist', async () => {
      const response = await request(app).get('/api/v1/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });


  describe('POST /api/v1/users', () => {
  it('should create a new user', async () => {
  const newUser = {
      name: 'John Doe',
      email: 'temmytizzy@example.com',
      password: 'securepassword',
      phoneNumber: '08012345678',
      gender:'temmygender'
    }
;
    const response = await request(app).post('/api/v1/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.phoneNumber).toBe(newUser.phoneNumber);
    expect(response.body.password).toBe(newUser.password);
    expect(response.body.gender).toBe(newUser.gender)

  });

  it('should return 400 if required fields are missing', async () => {
    const incompleteUser = { name: 'Jane Doe', email: 'toppy'};
    const response = await request(app).post('/api/v1/users').send(incompleteUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Could not create user');
  });
});

describe('GET /api/v1/users/:id', () => {
 it("should get a single user by id", async () => {
  const user = await User.create({
    name: 'Alice',
    email:"alice@rest.com",
    password: 'alicepassword',
    phoneNumber: '08098765432',
    gender:'aliocegender'
  })
  const response = await request(app).get(`/api/v1/users/${user._id}`);
  expect(response.status).toBe(200);
  expect(response.body.name).toBe('Alice');
 })

 it("should return 404 if user not found", async () => {
   const fakeId = await request(app).get('/api/v1/users/64b64c4f4f4f4f4f4f4f4f4f');
   expect(fakeId.status).toBe(400);
   expect(fakeId.body.message).toBe('new user not found');
 })
})

describe('Put /api/v1/users/:id', () => {
  it("should update a user by id", async () => {
   const user = await User.create({
     name: 'Bob',
     email:"bob@test.com",
    password: 'bobpassword',
     phoneNumber: '0800075432',
     gender:'bobgender'
    })

     const updateUser = await User.create({
      name: "Bobby",
      email:"Bobby@test.com",
      password: 'bobbypassword',
      phoneNumber: '08098765432', 
      gender:'bobgender'
     })

     const res = await request(app).put(`/api/v1/users/${updateUser._id}`).send(updateUser)
     expect(res.status).toBe(200)
     expect(res.body.name).toBe(updateUser.name)
     expect(res.body.email).toBe(updateUser.email)
     expect(res.body.password).toBe(updateUser.password)
     expect(res.body.phoneNumber).toBe(updateUser.phoneNumber)
     expect(res.body.gender).toBe(updateUser.gender)
   })

  })
 describe('DELETE /api/v1/users/:id', () => {
  it("should delete a user", async () => {
    const user = await User.create({
      name: "Charlie",
      email: "charlie@example.com",
      password: "charliepassword",
      gender: "charliegender",
      phoneNumber: "08012345678"
    });

    const response = await request(app).delete(`/api/v1/users/${user._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Charlie");
    expect(response.body.email).toBe(user.email);
    expect(response.body.phoneNumber).toBe(user.phoneNumber);
    expect(response.body.gender).toBe(user.gender);
    expect(response.body.password).toBe(user.password); // optional

    const checkUser = await User.findById(user._id);
    expect(checkUser).toBeNull();
    console.log("Response body:", response.body);

  });
});

})
