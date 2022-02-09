import { AddressOrigin } from '../../../src/utils/cep/cep-type';

export class UtilTestHelper {
    static readonly cep = '11111111';
    static readonly ApiCorreiosCepResponseInvalidCep = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <soap:Fault>
            <faultcode>soap:Server</faultcode>
            <faultstring>CEP NAO ENCONTRADO</faultstring>
            <detail>
                <ns2:SigepClienteException xmlns:ns2="http://cliente.bean.master.sigep.bsb.correios.com.br/">CEP NAO ENCONTRADO</ns2:SigepClienteException>
            </detail>
        </soap:Fault>
    </soap:Body>
</soap:Envelope>`;
    static readonly ApiCorreiosCepResponseOk =
        '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns2:consultaCEPResponse xmlns:ns2="http://cliente.bean.master.sigep.bsb.correios.com.br/"><return><bairro>Correios Bairro</bairro><cep>11111111</cep><cidade>cidade</cidade><complemento2>- até 249/250</complemento2><end>end</end><uf>uf</uf></return></ns2:consultaCEPResponse></soap:Body></soap:Envelope>';

    static readonly correiosResponseJson = {
        bairro: 'Correios Bairro',
        cep: '11111111',
        cidade: 'cidade',
        end: 'end',
        uf: 'uf',
    };
    static readonly ApiCorpCepResponseOk = {
        bairro: 'bairro',
        cep: '11111111',
        localidade: 'localidade',
        logradouro: 'logradouro',
        uf: 'CP',
    };
    static readonly CepOk = {
        cep: '11111111',
        state: 'state',
        city: 'city',
        street: 'street',
        neighborhood: 'neighborhood',
        origin: AddressOrigin.API_CORREIOS,
    };
    static readonly correiosRequestBody = (cep: string) => {
        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">\n        <soapenv:Header/>\n        <soapenv:Body>\n           <cli:consultaCEP>\n              <!--Optional:-->\n              <cep>${cep}</cep>\n           </cli:consultaCEP>\n        </soapenv:Body>\n     </soapenv:Envelope>`;
    };

    static readonly templateEmailResponse = '<html> <body><h1>Hello mr ${name} </h1></body></html>';
}
