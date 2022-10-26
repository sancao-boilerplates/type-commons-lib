# Commons Lib

Esta lib tem como objetivo facilitar compatilhamento de soluções de codigo entre projetos de backend.

**O que há disponivel?**

Este é um pacote com as seguintes bibliotecas:

-   [Log](#log)
-   [Http Service Client](#http-service-client)
-   [CacheService](#cacheservice)
-   [Utils](#utils)

**Instalação**

Exacutar o comando:

-   `npm install https://oauth2:wnD-uH8EDBUUyQvjeHq1@gitlab.com/aec-digita/type-library/digital-commons.git -s`

## Log

Para usar a api de log basta, após a instalação do pacote, realizar a importação:

`import { Logger, log } from 'digital-commons';`

Esta lib possui dois principais componentes de log, a classe principal Logger e o decorator de metodos log

Após a importação basta usa-los no seu código:

    @log()
    public async myMethod(){
        Logger.debug('Thi is my first debug log' , { structuredLog: 'this is nice!'})
    }

O log level deverá ser passado via varável de ambiente:

`LOG_LEVEL`

-   debug
-   info
-   warn
-   error

Com o uso do decorator sempre que o método `myMethod` for chamado, será lançado um log do tipo `debug` informando a chamada desse metodo e listando os parametros passados.

Temos um plugin para log de todos os requests e responses da sua aplicação:

### Express

Basta registrar o middleware:

    import { Plugins } from 'digital-commons';

    app.use(Plugins.Express.RequestResponseLog(null));

### Hapi

    import { Plugins } from 'digital-commons';

    await server.register(Plugins.Hapi.RequestResponseLog);

Com esse plugin registrado, na entrada do rquest, será setado um correlationId e todos os logs da aplicação passarão a ter esse correlationId facilitando trace do caminho seguindo pela requisição dentro da sua aplicação.
Por default esse plugin ja vai tentar pegar no header do request o campo: 'x-correlation-id' para caso de integrações prover um mesmo log entre aplicações.
Caso seu projeto já use o pacote de service disponivel nesta lib também já é setado esse correlationID em todos os requests disparados.

## Http Service Client

A lib possui dois aquivos principais:
`HttpService`

Seu uso deve ser através de herança

`DefaultHttpService`

Em caso de uso imediato da execução de uma chamada http

### Chamada de serviços genericos com a class HttpService:

realize a importação da classe:
`import { HttpService } from 'service-lib';`

faça da classe Service a classe pai da sua classe de integração:

    .
        export class CieloService extends HttpService {
            constructor() {
            super( options );
            }
        }

options:

    .
        export interface ServiceOptions {
            /**
            *  Base service URL
            */
            baseUrl?: string;
            /**
            * The service timeout in miliseconds
            * Default: 10 seconds (10000)
            */
            timeout?: number;
            /**
            * The default service timeout in seconds
            */
            headers?: object;
            /**
            * The Class responsible for Logging
            */
            logger?: object;
        }

Uma vez definida sua classe de serviço você pode fazer seu request:

        export class CieloService extends Service {
            constructor() {
            super({
                baseUrl: CieloEnv.URL
            } );
            }

            async createPaymentLink(paramters:string):Promise<ResponseObject>{
                const responseData = await this.post(`link/${parameters}` , {PAYLOAD}, requestConfig?: AxiosRequestConfig, requestOptions?: RequestOptions)
                return responseData
            }
        }

## CacheService

Serviço de cache para ajudar na liberação de carga de serviços legados entregando uma resposta mais rápida para os consumidores com tempo de expiração determinado em config.

Pode ser implementado com Redis ou DynamoDb (**recomendável para Lambdas**). Detalhe o tipo de retorno é genérico a gosto do freguês ex:

Suponha que a aplicacão tenha a saida deteminada com os detalhes abaixo:

`export interface ResponseObject { body?: string; statusCode: number; }`

**PONTOS DE ATENÇÃO:**

-   Cachear apenas as respostas de sucesso da aplicação.
-   Chave app é um valor fixo que pode ser o nome da aplicação que esta utilizando o cache
-   Chaves para o objeto de cache tem que ser em string e unicas por objeto e a partir dessa string será gerado um ID para no cache ex: FichaId, ClienteId, CPF etc...
-   Caso necessário pode ser implementado o removeCache para remover do cache uma chave específica por ID

## Utils

Aqui temos uma série de classes de utilidades que ajudam e facilitam o trabalho no dia dia.

### CepUtils

A Classe CepUtils tem como objetivo recuperar um endereço com base em um cep passado, para isso realize a importação da classe `CepUtils` e invoque o método: `CepUtils.getAddressFrom`.

O método recebe como primeiro parâmetro o CEP que se deseja obter o endereço, o Cep pode está formatado ou não, opcionalmente é possível passar os dados da sensedia, caso os mesmos não estejam definidos nas variáveis de ambiente.

O código tentará obter o endereço direto do serviço dos Correios, caso falhe tentará obter através da API Corporativa, por isso é importante prover os dados da sensedia como segundo parâmetro.

Caso obtenha sucesso a rotina tentará buscar os dados de geolocalização através da api de maps do google, esta api pode retornar mais de um resultado para a busca de um cep, neste casos todas as opções encontradas serão retornadas e a primeira do array sempre será setado nas propriedades de latitude e longitude do objetdo de retorno: `AddressResult`. Será necessário informar a Google API Key utilizando a seguinte variável de ambiente: `GOOGLE_API_KEY`.

    export interface AddressResult {
        cep: string;
        state: string;
        city: string;
        street: string;
        neighborhood: string;
        origin: AddressOrigin;
        geoLocation?: AddressLocation;
    }

    export interface AddressLocation{
        latitude: number;
        longitude: number;
        googleResponse: GoogleAddressResponse;
    }

    export interface GoogleAddressResponse {
        results: Array<GoogleAddress>;
        status: string;
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

É possível também obter diretamente do serviço do google maps os dados e geolocalização através do método: `CepUtils.getGeoLocation`, é possível passar como parâmetro o CEP ou o endereço que se deseja buscar.

### DateUtils

Fornece uma série de métodos utilitários para manipulação de datas utilizando o modulo `moment` como base!

### EncodeUtils

Fornece métodos para encodar em base64 e cripitografia através da lib `CryptoJS`

### PhoneUtils

Fornece métodos para manipular telefones, limpando a formatação; extração do DDD...

### RegexUtils

Fornece uma série de regex comuns

## Evolução

Toda a ajuda é bem vinda, caso use alguma lib e encontre bug ou oportunidade de melhoria sinta-se a vontade pra corrigir e evoluir. Tenha em mente que pode haver varios outros projetos compartilhando desta mesma lib e antes de fazer um commit na master tenha sido devidamente testado.
Ainda não ta definido o fluxo de alteração e gostaria de deixar bem livre para que todos possam ajudar na evolução mas sempre com bastante atenção para n causar impactos.
