import { StatusCodes, getReasonPhrase } from 'http-status-codes';
const HttpStatusCode = {
    ...StatusCodes,
    getStatusText: getReasonPhrase,
};
export { HttpStatusCode };
