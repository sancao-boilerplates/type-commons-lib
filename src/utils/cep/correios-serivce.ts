import { Logger } from 'node-smart-log';
import { HttpService } from '../../service';
import { XmlToJsonUtil } from '../xml-to-json';
import { AddressOrigin, AddressResult } from './cep-type';

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
export class CorreiosService extends HttpService {
    constructor() {
        super({
            baseUrl: 'https://apps.correios.com.br',
            headers: { Accept: 'text/plain;charset=utf-8', 'Content-Type': 'text/plain;charset=utf-8' },
        });
    }

    async getFromCorreios(cep: string): Promise<AddressResult | null> {
        try {
            const correiosUrl = 'SigepMasterJPA/AtendeClienteService/AtendeCliente';

            const body = this.getCorreiosRequestBory(cep);

            const responseString = await this.post(correiosUrl, body);

            const response = await this.parseResponse(responseString);

            return response;
        } catch (err) {
            Logger.error(err);
            return null;
        }
    }

    private async parseResponse(response: string): Promise<AddressResult | null> {
        if (response && response.includes('soap:Fault')) {
            return null;
        }
        const result: Correiosresponse = await XmlToJsonUtil.xmlToJson<Correiosresponse>(response, 'return');
        return {
            cep: result.cep,
            city: result.cidade,
            neighborhood: result.bairro,
            state: result.uf,
            street: result.end,
            origin: AddressOrigin.API_CORREIOS,
        };
    }

    private getCorreiosRequestBory(cep: string): string {
        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">
        <soapenv:Header/>
        <soapenv:Body>
           <cli:consultaCEP>
              <!--Optional:-->
              <cep>${cep}</cep>
           </cli:consultaCEP>
        </soapenv:Body>
     </soapenv:Envelope>`;
    }
}
