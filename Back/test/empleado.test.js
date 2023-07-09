const app = require('../src/app');
const request = require('supertest');

describe('GET /empleado', () => {
  it('respond with an array of empleados', (done) => {
    request(app)
      .get('/empleado')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body = Array.isArray(res.body);
      })
      .expect(200, done);
  });
});

describe('GET /empleado/:id', () => {
  it('respond with json containing a single empleado', (done) => {
    request(app)
      .get('/empleado/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('respond with json "empleado no encontrado" when the empleado does not exist', (done) => {
    request(app)
      .get('/empleado/9999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('POST /empleado', () => {
  it('respond with 201 created', (done) => {
    const data = {
      nombre: 'TestCreated',
      apellido: 'TestCreated',
      usuario: 'TestCreated',
      contrasena: 'TestCreated',
      rol: 1,
      subsidiaria: 1,
    };
    request(app)
      .post('/empleado')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
  it('respond with 400 bad request when the body is empty', (done) => {
    request(app)
      .post('/empleado')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
  it('respond with 400 bad request when the body is incomplete', (done) => {
    const data = {
      nombre: 'Test',
      apellido: 'Test',
      usuario: 'Test',
      contrasena: 'Test',
      rol: 1,
    };
    request(app)
      .post('/empleado')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
  it('respond with 403 forbidden when the user isnt admin', (done) => {
    const data = {
      nombre: 'Test',
      apellido: 'Test',
      usuario: 'Test',
      contrasena: 'Test',
      rol: 1,
      subsidiaria: 1,
    };
    request(app)
      .post('/empleado')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.USER_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
  it('respond with 401 unauthorized when the token is invalid', (done) => {
    const data = {
      nombre: 'Test',
      apellido: 'Test',
      usuario: 'Test',
      contrasena: 'Test',
      rol: 1,
      subsidiaria: 1,
    };
    request(app)
      .post('/empleado')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + 'INVALID_TOKEN')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
  it('respond with 401 unauthorized when the token is missing', (done) => {
    const data = {
      nombre: 'Test',
      apellido: 'Test',
      usuario: 'Test',
      contrasena: 'Test',
      rol: 1,
      subsidiaria: 1,
    };
    request(app)
      .post('/empleado')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
  it('respond with 409 conflict when the user already exists', (done) => {
    const data = {
      nombre: 'Test',
      apellido: 'Test',
      usuario: 'Usuario 3',
      contrasena: 'Test',
      rol: 1,
      subsidiaria: 1,
    };
    request(app)
      .post('/empleado')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(409, done);
  });
});

describe('PUT /empleado/:id', () => {
  it('respond with 200 ok', (done) => {
    const data = {
      nombre: 'Test',
      apellido: 'Test',
      usuario: 'Test',
      contrasena: 'Test',
      rol: 1,
      subsidiaria: 1,
    };
    request(app)
      .put('/empleado/1')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('respond with 400 bad request when the body is empty', (done) => {
    request(app)
      .put('/empleado/1')
      .send({})
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
  it('respond with 403 Forbidden when the user isnt admin', (done) => {
    const data = {
      nombre: 'Test',
      apellido: 'Test',
      usuario: 'Test',
      contrasena: 'Test',
      rol: 1,
      subsidiaria: 1,
    };
    request(app)
      .put('/empleado/1')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.USER_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
});

describe('DELETE /empleado/:id', () => {
  it('respond with 200 ok', (done) => {
    request(app)
      .delete('/empleado/2')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('respond with 403 Forbidden when the user isnt admin', (done) => {
    request(app)
      .delete('/empleado/3')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.USER_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
  it('respond with 404 not found when the empleado does not exist', (done) => {
    request(app)
      .delete('/empleado/9999')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
