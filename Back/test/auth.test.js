const app = require('../src/app');
const request = require('supertest');

describe('POST /auth/login', () => {
  it('respond with 200 ok', (done) => {
    const data = {
      usuario: 'Usuario 2',
      contrasena: 'Contrasena 2',
    };
    request(app)
      .post('/auth/login')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('respond with 401 unauthorized when the password is incorrect', (done) => {
    const data = {
      usuario: 'Usuario 2',
      contrasena: 'incorrect',
    };
    request(app)
      .post('/auth/login')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
  it('respond with 401 unauthorized when the user does not exist', (done) => {
    const data = {
      usuario: 'incorrect',
      contrasena: 'Contrasena 2',
    };
    request(app)
      .post('/auth/login')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});
