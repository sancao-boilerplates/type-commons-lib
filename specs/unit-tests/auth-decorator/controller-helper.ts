import { Service } from 'typedi';

import { Auth } from '../../../src';
import { Get, Controller } from 'node-http-serverless';

@Controller('/tests')
@Service()
export class ControllerHelper {
    @Auth()
    @Get('')
    public async testAuth(): Promise<string> {
        return new Promise<string>((resolve) => resolve('ok'));
    }

    @Auth({ role: 3 })
    @Get('/role')
    public async testAuthRole(): Promise<string> {
        return new Promise<string>((resolve) => resolve('ok'));
    }
}
