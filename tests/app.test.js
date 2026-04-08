const request = require('supertest');
const app = require('../src/server');

describe('Sızma Testi Projesi - API Güvenlik Testleri', () => {
    it('Yetkili kullanıcı kendi faturasına erişebilmeli', async () => {
        const res = await request(app).get('/api/invoice/100?loginAs=user1');
        expect(res.statusCode).toBe(200);
    });

    it('Yetkisiz kullanıcı başkasının faturasına erişememeli (IDOR Test)', async () => {
        const res = await request(app).get('/api/invoice/100?loginAs=user2');
        expect(res.statusCode).toBe(403);
    });
});
