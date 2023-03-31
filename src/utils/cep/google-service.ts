import { Logger } from 'node-smart-log';
import { HttpService } from '../../service';
import { GoogleAddressResponse } from './cep-type';
import { AppConstants } from '../../constants';

export class GoogleService extends HttpService {
    private gKey: string;

    constructor() {
        super({
            baseUrl: 'https://maps.googleapis.com',
        });
    }

    private setGoogleApiKey(): void {
        if (this.gKey?.length >= 10) {
            return;
        }
        this.gKey = AppConstants.GOOGLE_API_KEY;
        if (!this.gKey || this.gKey.length < 10) {
            throw new Error('Missing GOOGLE_API_KEY environment variable key.');
        }
    }

    public async getAddressFromGoogle(address: string): Promise<GoogleAddressResponse> {
        this.setGoogleApiKey();
        try {
            address = encodeURI(address);
            const result: GoogleAddressResponse = await this.get(`maps/api/geocode/json?address=${address},BR&key=${this.gKey}`);
            return result;
        } catch (err) {
            Logger.error(`Error while getting address (${address}) from google `, err);
            throw err;
        }
    }

    public async getAddressFromGeoLocation(lat: number, lng: number): Promise<GoogleAddressResponse> {
        this.setGoogleApiKey();
        try {
            const result: GoogleAddressResponse = await this.get(`maps/api/geocode/json?latlng=${lat},${lng}&key=${this.gKey}`);
            return result;
        } catch (error) {
            Logger.error(`Error while getting geolocation (${lat},${lng}) from google `, error);
            throw error;
        }
    }
}
