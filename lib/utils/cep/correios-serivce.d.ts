import { HttpService } from '../../service';
import { AddressResult } from './cep-type';
export interface Correiosresponse {
    bairro: string;
    cep: string;
    cidade: string;
    end: string;
    uf: string;
}
export interface CepResponse {
    bairro: string;
    cep: string;
    localidade: string;
    logradouro: string;
    uf: string;
}
export declare class CorreiosService extends HttpService {
    constructor();
    getFromCorreios(cep: string): Promise<AddressResult | null>;
    private parseResponse;
    private getCorreiosRequestBory;
}
