const app = require('../src/app');
const request = require('supertest');

describe('GET /rol', () => {
  it('respond with an array of roles', (done) => {
    request(app)
      .get('/rol')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body = Array.isArray(res.body);
      })
      .expect(200, done);
  });
});
