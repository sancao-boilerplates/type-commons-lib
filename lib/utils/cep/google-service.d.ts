import { HttpService } from '../../service';
import { GoogleAddressResponse } from './cep-type';
export declare class GoogleService extends HttpService {
    private gKey;
    constructor();
    private setGoogleApiKey;
    getAddressFromGoogle(address: string): Promise<GoogleAddressResponse>;
    getAddressFromGeoLocation(lat: number, lng: number): Promise<GoogleAddressResponse>;
}
