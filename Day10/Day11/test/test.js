const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../models/userModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/userdb_test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com', age: 25 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test User');
  });

  it('should fail validation', async () => {
    const res = await request(app).post('/users').send({ name: '', email: 'invalid' });
    expect(res.statusCode).toEqual(400);
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
