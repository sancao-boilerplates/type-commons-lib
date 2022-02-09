import { CepUtils } from "../../../src/utils/cep/cep-utils";

describe('[Integration] CepUtils', () => {
    beforeEach(()=>{
        process.env.GOOGLE_API_KEY = 'AIzaSyBBQmvbk9mJ_tzVywEaKue45mUwzjwnFhc';
    })
    afterEach(() => {
        process.env.GOOGLE_API_KEY = undefined;
    });

    
});
