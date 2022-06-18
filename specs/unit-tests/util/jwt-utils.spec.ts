import * as Jwt from 'jsonwebtoken';
import { JwtUtils } from '../../../src';
import { JwtExpiredError } from '../../../src/utils/jwt-expired-exception';
describe('[JwtUtils]', () => {
    const obj = {
        user: 'teste',
        email: 'teste@teste',
    };
    const secret = 'teste';

    describe('[generate]', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('Should generate sucessfully a JWT Token', () => {
            const token = JwtUtils.generate(obj, { secreteKey: secret, expiration: 5 });
            expect(token).toEqual(expect.any(String));
        });
        it('In case no expiration be providede should set 1 minute as expiratioj', () => {
            const signSpy = jest.spyOn(Jwt as any, 'sign');
            signSpy.mockImplementationOnce(() => 'token');
            const token = JwtUtils.generate(obj, { secreteKey: secret });
            expect(token).toEqual(expect.any(String));
            expect(token).toEqual('token');
            expect(signSpy).toHaveBeenCalledTimes(1);
            const param = signSpy.mock.calls[0][2] as object;
            expect(param['expiresIn']).toEqual(60);
        });
    });
    describe('[validate]', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('Should sucessfully validate a valid JWT Token', () => {
            const token = JwtUtils.generate(obj, { secreteKey: secret, expiration: 5 });
            const validated = JwtUtils.validate(token, secret);
            expect(validated).toMatchObject(obj);
        });
        it('In case time is expired shoudl throw JWT Error', async () => {
            const tokes = JwtUtils.generate(obj, { secreteKey: secret, expiration: 1 });
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
            expect(() => JwtUtils.validate(tokes, secret)).toThrow(JwtExpiredError);
        });
        it('Should use enviroment variable as secret', async () => {
            const old = process.env;
            process.env.JWT_SECRET = '12345';
            const token = JwtUtils.generate(obj);
            const result = JwtUtils.validate(token, '12345');
            expect(result).toMatchObject(obj);
            process.env = old;
        });
    });
});
