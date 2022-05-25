process.env.NODE_ENV = 'test';
import { GenericServiceTest } from '../../unit-tests/service/test-generic-service';
describe('[Integration] Generic Service', () => {
    let service: GenericServiceTest;
    const url = 'commons-lib/public-mocks';
    beforeEach(() => {
        service = new GenericServiceTest({ baseUrl: 'https://tslib.free.beeceptor.com' });
    });

    it('[GET] should do request successfully', async () => {
        const response = await service.get(url);
        expect(response).toBeDefined();
    });
    it('[PATCH] should do request successfully', async () => {
        const response = await service.patch(url);
        expect(response).toBeDefined();
    });
    it('[PUT] should do request successfully', async () => {
        const response = await service.put(url);
        expect(response).toBeDefined();
    });
    it('[POST] should do request successfully', async () => {
        const response = await service.post(url);
        expect(response).toBeDefined();
    });
    it('[DELETE] should do request successfully', async () => {
        const response = await service.delete(url);
        expect(response).toBeDefined();
    });

    describe('With returnHeaders = true', () => {
        it('[GET] should return headers', async () => {
            const response = await service.get(url, null, { returnHeaders: true });
            expect(response.headers).toBeDefined();
        });
        it('[PATCH] should return headers', async () => {
            const response = await service.patch(url, null, null, { returnHeaders: true });
            expect(response.headers).toBeDefined();
        });
        it('[PUT] should return headers', async () => {
            const response = await service.put(url, null, null, { returnHeaders: true });
            expect(response.headers).toBeDefined();
        });
        it('[POST] should return headers', async () => {
            const response = await service.post(url, null, null, { returnHeaders: true });
            expect(response.headers).toBeDefined();
        });
        it('[DELETE] should return headers', async () => {
            const response = await service.delete(url, null, null, { returnHeaders: true });
            expect(response.headers).toBeDefined();
        });
    });
});
