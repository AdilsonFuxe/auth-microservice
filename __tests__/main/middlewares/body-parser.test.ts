import request from 'supertest';
import app from '@src/main/config/app';

describe('Body Parser Middleware', () => {
  test('Should parser body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Adilson' })
      .expect({ name: 'Adilson' });
  });
});
