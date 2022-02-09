import { SensediaService } from '../../service/sensedia-service';
import { AddressResult } from './cep-type';
export interface CepResponse {
    bairro: string;
    cep: string;
    localidade: string;
    logradouro: string;
    uf: string;
}
export declare class CepService extends SensediaService {
    getAddress(cep: string): Promise<AddressResult>;
}
