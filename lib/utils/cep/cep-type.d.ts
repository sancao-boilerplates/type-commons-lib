export declare enum AddressOrigin {
    API_CORREIOS = "api-correios",
    API_CORP = "api-corp"
}
export interface AddressLocation {
    latitude: number;
    longitude: number;
    googleResponse: GoogleAddressResponse;
}
export interface AddressResult {
    cep: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    origin: AddressOrigin;
    geoLocation?: AddressLocation;
}
export interface GoogleLocation {
    lat: number;
    lng: number;
}
interface AddressComponent {
    long_name: string;
    short_name: string;
    types: Array<string>;
}
export interface GoogleAddress {
    address_components: Array<AddressComponent>;
    formatted_address: string;
    geometry: {
        location: GoogleLocation;
        location_type: string;
        viewport: {
            northeast: GoogleLocation;
            southwest: GoogleLocation;
        };
    };
    place_id: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
    types: Array<string>;
}
export interface GoogleAddressResponse {
    results: Array<GoogleAddress>;
    status: string;
}
export {};
