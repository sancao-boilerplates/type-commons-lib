import { GoogleService } from './google-service';
import {
    AddressResult, GoogleAddressResponse,
} from './cep-type';
import { Logger, log } from '../../logger';
import { RegexUtils } from '../regex-utils';
import { CorreiosService } from './correios-serivce';
import { AppConstants } from '../../constants';

const correiosService = new CorreiosService();
const googleService = new GoogleService();
export class CepUtils {
    @log
    static async getAddressFrom(cep: string): Promise<AddressResult> {
        try {
            cep = CepUtils.validateCep(cep);

            let result = await correiosService.getFromCorreios(cep);

            result = await CepUtils.loadGeoLocation(result);

            return result;
        } catch (err) {
            Logger.error('Error whule getting address from cep', err);
            throw err;
        }
    }

    private static async loadGeoLocation(address: AddressResult): Promise<AddressResult> {
        try {
            if (!address || !AppConstants.GOOGLE_API_KEY) {
                return address;
            }
            let googleResponse = await CepUtils.getGeoLocation(address.cep);
            if (!googleResponse || googleResponse.results.length === 0) {
                googleResponse = await CepUtils.getGeoLocation(`${address.neighborhood}${address.state}`);
            }

            if (googleResponse && googleResponse.results.length > 0) {
                address.geoLocation = {
                    latitude: googleResponse.results[0].geometry.location.lat,
                    longitude: googleResponse.results[0].geometry.location.lng,
                    googleResponse,
                };
            }
            return address;
        } catch (err) {
            Logger.error(err);
            return address;
        }
    }

    @log
    static async getGeoLocation(address: string): Promise<GoogleAddressResponse> {
        try {
            const googleResponse = await googleService.getAddressFromGoogle(address);
            return googleResponse;
        } catch (err) {
            Logger.error(err);
            return null;
        }
    }

    @log
    private static validateCep(cep: string): string {
        if (!cep) {
            throw new Error(`Invalid cep! ${cep}, cep must have 8 digits`);
        }
        cep = cep.replace(/-/g, '');

        if (!RegexUtils.CEP_REGEX.test(cep)) {
            throw new Error(`Invalid cep! ${cep}, cep must have 8 digits`);
        }

        return cep;
    }

    @log
    private static validateGeoLocation(lat: number, lng: number): void {
        if (!lat || lat >= 90 || lat <= -90) {
            throw new Error(`Invalid value for latitude: ${lat}`);
        }

        if (!lng || lng >= 180 || lng <= -180) {
            throw new Error(`Invalid value for longitude: ${lng}`);
        }
    }

    @log
    static async getAddressFromGeoLocation(lat: number, lng: number): Promise<GoogleAddressResponse> {
        this.validateGeoLocation(lat, lng);
        return googleService.getAddressFromGeoLocation(lat, lng);
    }
}
