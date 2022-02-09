import { Environment } from './env/environment';

export class AplicationEnvironment {
    static getEnvironment(): Environment {
        if (process.env.NODE_ENV === Environment.DEVELOPMENT || process.env.NOTIFICATION_ENVIRONMENT === Environment.DEVELOPMENT) {
            return Environment.DEVELOPMENT;
        }
        if (process.env.NODE_ENV === Environment.PRODUCTION || process.env.NOTIFICATION_ENVIRONMENT === Environment.PRODUCTION) {
            return Environment.PRODUCTION;
        }

        return Environment.HOMOLOGATION;
    }
}
