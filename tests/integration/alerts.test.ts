import request from 'supertest';
import app from '../../src/index';

describe('Alert API', () => {
  it('should reject unauthenticated alert creation', async () => {
    const res = await request(app).post('/api/alerts').send({
      symbol: 'BTC',
      targetPrice: 30000,
      direction: 'ABOVE',
    });

    expect(res.statusCode).toBe(401);
  });
});
