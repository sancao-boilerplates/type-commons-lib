import { StatusCodes, getReasonPhrase } from 'http-status-codes';
declare const HttpStatusCode: {
    getStatusText: typeof getReasonPhrase;
    ACCEPTED: StatusCodes.ACCEPTED;
    BAD_GATEWAY: StatusCodes.BAD_GATEWAY;
    BAD_REQUEST: StatusCodes.BAD_REQUEST;
    CONFLICT: StatusCodes.CONFLICT;
    CONTINUE: StatusCodes.CONTINUE;
    CREATED: StatusCodes.CREATED;
    EXPECTATION_FAILED: StatusCodes.EXPECTATION_FAILED;
    FAILED_DEPENDENCY: StatusCodes.FAILED_DEPENDENCY;
    FORBIDDEN: StatusCodes.FORBIDDEN;
    GATEWAY_TIMEOUT: StatusCodes.GATEWAY_TIMEOUT;
    GONE: StatusCodes.GONE;
    HTTP_VERSION_NOT_SUPPORTED: StatusCodes.HTTP_VERSION_NOT_SUPPORTED;
    IM_A_TEAPOT: StatusCodes.IM_A_TEAPOT;
    INSUFFICIENT_SPACE_ON_RESOURCE: StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE;
    INSUFFICIENT_STORAGE: StatusCodes.INSUFFICIENT_STORAGE;
    INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR;
    LENGTH_REQUIRED: StatusCodes.LENGTH_REQUIRED;
    LOCKED: StatusCodes.LOCKED;
    METHOD_FAILURE: StatusCodes.METHOD_FAILURE;
    METHOD_NOT_ALLOWED: StatusCodes.METHOD_NOT_ALLOWED;
    MOVED_PERMANENTLY: StatusCodes.MOVED_PERMANENTLY;
    MOVED_TEMPORARILY: StatusCodes.MOVED_TEMPORARILY;
    MULTI_STATUS: StatusCodes.MULTI_STATUS;
    MULTIPLE_CHOICES: StatusCodes.MULTIPLE_CHOICES;
    NETWORK_AUTHENTICATION_REQUIRED: StatusCodes.NETWORK_AUTHENTICATION_REQUIRED;
    NO_CONTENT: StatusCodes.NO_CONTENT;
    NON_AUTHORITATIVE_INFORMATION: StatusCodes.NON_AUTHORITATIVE_INFORMATION;
    NOT_ACCEPTABLE: StatusCodes.NOT_ACCEPTABLE;
    NOT_FOUND: StatusCodes.NOT_FOUND;
    NOT_IMPLEMENTED: StatusCodes.NOT_IMPLEMENTED;
    NOT_MODIFIED: StatusCodes.NOT_MODIFIED;
    OK: StatusCodes.OK;
    PARTIAL_CONTENT: StatusCodes.PARTIAL_CONTENT;
    PAYMENT_REQUIRED: StatusCodes.PAYMENT_REQUIRED;
    PERMANENT_REDIRECT: StatusCodes.PERMANENT_REDIRECT;
    PRECONDITION_FAILED: StatusCodes.PRECONDITION_FAILED;
    PRECONDITION_REQUIRED: StatusCodes.PRECONDITION_REQUIRED;
    PROCESSING: StatusCodes.PROCESSING;
    PROXY_AUTHENTICATION_REQUIRED: StatusCodes.PROXY_AUTHENTICATION_REQUIRED;
    REQUEST_HEADER_FIELDS_TOO_LARGE: StatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE;
    REQUEST_TIMEOUT: StatusCodes.REQUEST_TIMEOUT;
    REQUEST_TOO_LONG: StatusCodes.REQUEST_TOO_LONG;
    REQUEST_URI_TOO_LONG: StatusCodes.REQUEST_URI_TOO_LONG;
    REQUESTED_RANGE_NOT_SATISFIABLE: StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE;
    RESET_CONTENT: StatusCodes.RESET_CONTENT;
    SEE_OTHER: StatusCodes.SEE_OTHER;
    SERVICE_UNAVAILABLE: StatusCodes.SERVICE_UNAVAILABLE;
    SWITCHING_PROTOCOLS: StatusCodes.SWITCHING_PROTOCOLS;
    TEMPORARY_REDIRECT: StatusCodes.TEMPORARY_REDIRECT;
    TOO_MANY_REQUESTS: StatusCodes.TOO_MANY_REQUESTS;
    UNAUTHORIZED: StatusCodes.UNAUTHORIZED;
    UNAVAILABLE_FOR_LEGAL_REASONS: StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS;
    UNPROCESSABLE_ENTITY: StatusCodes.UNPROCESSABLE_ENTITY;
    UNSUPPORTED_MEDIA_TYPE: StatusCodes.UNSUPPORTED_MEDIA_TYPE;
    USE_PROXY: StatusCodes.USE_PROXY;
    MISDIRECTED_REQUEST: StatusCodes.MISDIRECTED_REQUEST;
};
export { HttpStatusCode };
