import { AddressResult, GoogleAddressResponse } from './cep-type';
export declare class CepUtils {
    static getAddressFrom(cep: string): Promise<AddressResult>;
    private static loadGeoLocation;
    static getGeoLocation(address: string): Promise<GoogleAddressResponse>;
    private static validateCep;
    private static validateGeoLocation;
    static getAddressFromGeoLocation(lat: number, lng: number): Promise<GoogleAddressResponse>;
}
