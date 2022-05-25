import axios from 'axios';
process.env.GOOGLE_API_KEY = 'AIzaSyBBQmvbk9mJ_tzVywEaKue45mUwzjwnFhc';
import { CepUtils } from '../../../src/utils/cep/cep-utils';
import { UtilTestHelper } from './util-test-helper';
import { CorreiosService } from '../../../src/utils/cep/correios-serivce';
import { GoogleService } from '../../../src/utils/cep/google-service';
import { ServiceTestHelper } from '../service/service-test-helper';

const cep = '04676040';

const sensedia = {
    clientId: 'superClientId',
    secret: 'superSecret',
    url: 'https://url',
};

jest.mock('axios');
let mockedAxios: jest.Mocked<typeof axios>;

describe('Utils - Cep Test Suite', () => {
    beforeEach(() => {
        jest.spyOn(GoogleService.prototype, 'getAddressFromGoogle').mockResolvedValue(null);
        process.env.GOOGLE_API_KEY = 'AIzaSyBBQmvbk9mJ_tzVywEaKue45mUwzjwnFhc';
    });
    afterEach(() => {
        jest.clearAllMocks();
        delete process.env.GOOGLE_API_KEY;
    });
    it(`Should throws error in case passing null`, async () => {
        await expect(CepUtils.getAddressFrom(null)).rejects.toThrow();
    });

    it(`Should throws error in case passing invalid cep`, async () => {
        await expect(CepUtils.getAddressFrom('1111111')).rejects.toThrow();
    });
    it(`Should throws error in case passing invalid cep`, async () => {
        await expect(CepUtils.getAddressFrom('1111111-')).rejects.toThrow();
    });

    describe('getAddressFromGeolocation', () => {
        beforeAll(() => {
            process.env.GOOGLE_API_KEY = '12345678901234567890';
        });
        const mockGoogleResponse = {
            results: [
                {
                    address_components: [
                        {
                            long_name: '277',
                            short_name: '277',
                            types: ['street_number'],
                        },
                        {
                            long_name: 'Bedford Avenue',
                            short_name: 'Bedford Ave',
                            types: ['route'],
                        },
                        {
                            long_name: 'Williamsburg',
                            short_name: 'Williamsburg',
                            types: ['neighborhood', 'political'],
                        },
                        {
                            long_name: 'Brooklyn',
                            short_name: 'Brooklyn',
                            types: ['sublocality', 'political'],
                        },
                        {
                            long_name: 'Kings',
                            short_name: 'Kings',
                            types: ['administrative_area_level_2', 'political'],
                        },
                        {
                            long_name: 'New York',
                            short_name: 'NY',
                            types: ['administrative_area_level_1', 'political'],
                        },
                        {
                            long_name: 'United States',
                            short_name: 'US',
                            types: ['country', 'political'],
                        },
                        {
                            long_name: '11211',
                            short_name: '11211',
                            types: ['postal_code'],
                        },
                    ],
                    formatted_address: '277 Bedford Avenue, Brooklyn, NY 11211, USA',
                    geometry: {
                        location: {
                            lat: 40.714232,
                            lng: -73.9612889,
                        },
                        location_type: 'ROOFTOP',
                        viewport: {
                            northeast: {
                                lat: 40.7155809802915,
                                lng: -73.9599399197085,
                            },
                            southwest: {
                                lat: 40.7128830197085,
                                lng: -73.96263788029151,
                            },
                        },
                    },
                    place_id: 'ChIJd8BlQ2BZwokRAFUEcm_qrcA',
                    types: ['street_address'],
                },
            ],
        };

        it('Should return the google service response on a valid lat and lng', async () => {
            // Given
            const cepMock = jest.spyOn(GoogleService.prototype as any, 'get');
            cepMock.mockResolvedValue(mockGoogleResponse);
            const old = process.env.GOOGLE_API_KEY;

            // When
            const response = await CepUtils.getAddressFromGeoLocation(40.714232, -73.9612889);

            // Then
            expect(response).toStrictEqual(mockGoogleResponse);
        });

        it('Should throw on invalid latitudes and longitudes', async () => {
            await expect(CepUtils.getAddressFromGeoLocation(40, -181)).rejects.toThrowError(new Error('Invalid value for longitude: -181'));
            await expect(CepUtils.getAddressFromGeoLocation(40, 181)).rejects.toThrowError(new Error('Invalid value for longitude: 181'));
            await expect(CepUtils.getAddressFromGeoLocation(-91, -179)).rejects.toThrowError(new Error('Invalid value for latitude: -91'));
            await expect(CepUtils.getAddressFromGeoLocation(91, -179)).rejects.toThrowError(new Error('Invalid value for latitude: 91'));
            await expect(CepUtils.getAddressFromGeoLocation(40, null)).rejects.toThrowError(new Error('Invalid value for longitude: null'));
            await expect(CepUtils.getAddressFromGeoLocation(40, undefined)).rejects.toThrowError(new Error('Invalid value for longitude: undefined'));
        });

        it('Should handle request failures', async () => {
            // Given
            const cepMock = jest.spyOn(GoogleService.prototype as any, 'get');
            cepMock.mockImplementationOnce(() => {
                throw new Error('Mock Error');
            });

            // When
            // Then
            await expect(CepUtils.getAddressFromGeoLocation(40.714232, -73.9612889)).rejects.toThrowError(new Error('Mock Error'));
        });
    });
});
