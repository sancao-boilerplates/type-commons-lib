"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorreiosService = void 0;
const logger_1 = require("../../logger");
const service_1 = require("../../service");
const xml_to_json_1 = require("../xml-to-json");
const cep_type_1 = require("./cep-type");
class CorreiosService extends service_1.HttpService {
    constructor() {
        super({
            baseUrl: 'https://apps.correios.com.br',
            headers: { Accept: 'text/plain;charset=utf-8', 'Content-Type': 'text/plain;charset=utf-8' },
        });
    }
    getFromCorreios(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const correiosUrl = 'SigepMasterJPA/AtendeClienteService/AtendeCliente';
                const body = this.getCorreiosRequestBory(cep);
                const responseString = yield this.post(correiosUrl, body);
                const response = yield this.parseResponse(responseString);
                return response;
            }
            catch (err) {
                logger_1.Logger.error(err);
                return null;
            }
        });
    }
    parseResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (response && response.includes('soap:Fault')) {
                return null;
            }
            const result = yield xml_to_json_1.XmlToJsonUtil.xmlToJson(response, 'return');
            return {
                cep: result.cep,
                city: result.cidade,
                neighborhood: result.bairro,
                state: result.uf,
                street: result.end,
                origin: cep_type_1.AddressOrigin.API_CORREIOS,
            };
        });
    }
    getCorreiosRequestBory(cep) {
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
exports.CorreiosService = CorreiosService;
