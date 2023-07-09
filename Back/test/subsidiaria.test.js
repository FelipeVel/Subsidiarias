const app = require('../src/app');
const request = require('supertest');

describe('GET /subsidiaria', () => {
  it('respond with an array of subsidiarias', (done) => {
    request(app)
      .get('/subsidiaria')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body = Array.isArray(res.body);
      })
      .expect(200, done);
  });
});

describe('GET /subsidiaria/:id', () => {
  it('respond with json containing a single subsidiaria', (done) => {
    request(app)
      .get('/subsidiaria/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('respond with json "subsidiaria no encontrada" when the subsidiaria does not exist', (done) => {
    request(app)
      .get('/subsidiaria/9999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('POST /subsidiaria', () => {
  it('respond with 201 created', (done) => {
    const data = {
      nombre: 'Test',
      direccion: 'Test',
      telefono: 'Test',
      correo: 'Test',
    };
    request(app)
      .post('/subsidiaria')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
  it('respond with 400 bad request when the body is empty', (done) => {
    request(app)
      .post('/subsidiaria')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
  it('respond with 401 unauthorized when the token is invalid', (done) => {
    const data = {
      nombre: 'Test',
      direccion: 'Test',
      telefono: 'Test',
      correo: 'Test',
    };
    request(app)
      .post('/subsidiaria')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer invalidToken')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
  it('respond with 403 forbidden when the token is not admin', (done) => {
    const data = {
      nombre: 'Test',
      direccion: 'Test',
      telefono: 'Test',
      correo: 'Test',
    };
    request(app)
      .post('/subsidiaria')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.USER_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
});

describe('PUT /subsidiaria/:id', () => {
  it('respond with 200 ok', (done) => {
    const data = {
      nombre: 'Test',
      direccion: 'Test',
      telefono: 'Test',
      correo: 'Test',
    };
    request(app)
      .put('/subsidiaria/1')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('respond with 404 not found', (done) => {
    const data = {
      nombre: 'Test',
      direccion: 'Test',
      telefono: 'Test',
      correo: 'Test',
    };
    request(app)
      .put('/subsidiaria/9999')
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('DELETE /subsidiaria/:id', () => {
  it('respond with 200 ok', (done) => {
    request(app)
      .delete('/subsidiaria/3')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect(200, done);
  });
  it('respond with 404 not found', (done) => {
    request(app)
      .delete('/subsidiaria/9999')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN_TEST)
      .expect(404, done);
  });
});
