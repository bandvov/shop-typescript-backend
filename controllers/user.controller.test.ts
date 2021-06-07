import request from 'supertest';
import { app } from '../app';
import User from '../models/User';
import { connectDb, disconnectDb } from '../db';
import {
  GET_USER_BY_ID_ROUTE,
  GET_ALL_USERS_ROUTE,
  DELETE_USER_ROUTE,
  UPDATE_USER_ROUTE,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
} from '../constants';

const newUserData = {
  email: 'new@aa.aa',
  password: '123aA$456',
  firstName: 'Vova',
  lastName: 'Vas',
};
let createdUserId;
const fakeUserId = '6098e3fc5fc9d803043fec33';
let existingUserId;
describe('UserController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeAll(async () => {
    connectDb();
    const user = new User(newUserData);
    await user.save();
    existingUserId = user._id;
  });
  afterAll(async () => {
    await User.findByIdAndDelete(createdUserId);
    await User.findByIdAndDelete(existingUserId);
    disconnectDb();
  });

  test('get all users', (done) => {
    request(app)
      .get(GET_ALL_USERS_ROUTE)
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.users[0].firstName).toBe(newUserData.firstName);
        expect(res.body.users[0].lastName).toBe(newUserData.lastName);
        expect(res.body.users[0].email).toBe(newUserData.email);
        done();
      });
  });
  test('get user by Id', (done) => {
    request(app)
      .get(GET_USER_BY_ID_ROUTE.replace(':id', '') + existingUserId)
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(JSON.stringify(res.body.user._id)).toBe(
          JSON.stringify(existingUserId),
        );
        expect(res.body.user.firstName).toBe(newUserData.firstName);
        expect(res.body.user.lastName).toBe(newUserData.lastName);
        expect(res.body.user.email).toBe(newUserData.email);
        done();
      });
  });
  test('Should return error if user doesn"t exist', (done) => {
    request(app)
      .get(GET_USER_BY_ID_ROUTE.replace(':id', '') + fakeUserId)
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });
  test('Test missing email', (done) => {
    request(app)
      .post(REGISTER_ROUTE)
      .type('form')
      .send({ password: '123456', firstName: 'Vova', lastName: 'Vas' })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe('Email not provided');
        done();
      });
  });

  test('Test missing password', (done) => {
    request(app)
      .post(REGISTER_ROUTE)
      .type('form')
      .send({ email: 'aa@aa.aa', firstName: 'Vova', lastName: 'Vas' })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Password not provided');
        done();
      });
  });

  test('Test missing firstName', (done) => {
    request(app)
      .post(REGISTER_ROUTE)
      .type('form')
      .set('Accept', 'application/json')
      .send({ email: 'aa@aa.aa', password: '123aA$456', lastName: 'Vas' })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing parameters');
        done();
      });
  });
  test('Test invalid firstName format', (done) => {
    request(app)
      .post(REGISTER_ROUTE)
      .type('form')
      .set('Accept', 'application/json')
      .send({
        email: 'aa@aa.aa',
        password: '123aA$456',
        firstName: '3',
        lastName: 'Vas',
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing parameters');
        done();
      });
  });

  test('Test missing lastName', (done) => {
    request(app)
      .post(REGISTER_ROUTE)
      .type('form')
      .set('Accept', 'application/json')
      .send({ email: 'aa@aa.aa', password: '123aA*456', firstName: 'Vova' })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing parameters');
        done();
      });
  });
  test('Test invalid lastName format', (done) => {
    request(app)
      .post(REGISTER_ROUTE)
      .type('form')
      .set('Accept', 'application/json')
      .send({
        email: 'aa@aa.aa',
        password: '123aA$456',
        firstName: 'Vova',
        lastName: '4%',
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing parameters');
        done();
      });
  });

  test('Test user already exist', (done) => {
    request(app)
      .post(REGISTER_ROUTE)
      .type('form')
      .set('Accept', 'application/json')
      .send(newUserData)
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User already exist');
        done();
      });
  });

  test('Create new user', (done) => {
    request(app)
      .post(REGISTER_ROUTE)
      .type('form')
      .set('Accept', 'application/json')
      .send({ ...newUserData, email: 'baacscc@hh.ds' })
      .end((err, res) => {
        expect(res.status).toBe(201);
        createdUserId = res.body.id;
        expect(res.body.message).toBe('User successfully registered');
        done();
      });
  });

  test('Login user', (done) => {
    request(app)
      .post(LOGIN_ROUTE)
      .type('form')
      .set('Accept', 'application/json')
      .send({ email: 'baacscc@hh.ds', password: newUserData.password })
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Successfully logged in');
        done();
      });
  });

  test('Login as not existing user', (done) => {
    request(app)
      .post(LOGIN_ROUTE)
      .type('form')
      .set('Accept', 'application/json')
      .send({ email: 'notexist@hh.ds', password: '123f$Adfs' })
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });

  test('should update user', (done) => {
    request(app)
      .put(UPDATE_USER_ROUTE.replace(':id', createdUserId))
      .set('Accept', 'application/json')
      .send({
        email: 'updated@aa.aa',
        pasword: '1654b$Hfgd',
        firstName: 'updated firstName',
        lastName: 'updated lastName',
        active: false,
        confirmed: true,
        avatar: 'dasasdasdasd',
      })
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User data successfully updated');
        done();
      });
  });

  test('update not existing user should return error', (done) => {
    request(app)
      .put(UPDATE_USER_ROUTE.replace(':id', fakeUserId))
      .set('Accept', 'application/json')
      .send({
        email: 'updated@aa.aa',
        pasword: '1654bfgd',
        firstName: 'updated firstName',
        lastName: 'updated lastName',
        active: false,
        confirmed: true,
        avatar: 'dasasdasdasd',
      })
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });

  test('should delete user', (done) => {
    request(app)
      .delete(DELETE_USER_ROUTE.replace(':id', createdUserId))
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User successfully deleted');
        done();
      });
  });

  test('should return error if delete not existing user', (done) => {
    request(app)
      .delete(DELETE_USER_ROUTE.replace(':id', fakeUserId))
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });
  test('If route does not exist should return error', (done) => {
    request(app)
      .get('/fakepath')
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Route not found');
        done();
      });
  });
});
