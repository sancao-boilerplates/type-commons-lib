/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { RequestDecoratorOptions } from '../decorator-interfaces';
import { HttpResponse } from '../dtos';
import { RequestValidator } from '../request-decorator-helper/request-validator';
import { BaseDecorator } from './base-decorator';
import { HttpMethod } from '../types';
import { HttpStatusCode } from '../../status-code';
import { InputRequest } from '../dtos/input-request';
import { HttpGenericError } from '../../service';

export class BaseHttpMethodDecorator extends BaseDecorator {
    protected static handleError(err?: any): unknown {
        if (err == null || err.status == null) {
            return new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusCode.getStatusText(HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
        return new HttpResponse(err.status, err.message ?? HttpStatusCode.getStatusText(err.status));
    }

    protected static handleSuccess(result: any, statusCode?: number): unknown {
        const status = statusCode || (result !== null && result !== undefined && result !== '' ? HttpStatusCode.OK : HttpStatusCode.NO_CONTENT);
        return new HttpResponse(status, result);
    }

    static request(target: object, propertyKey: string, propDesc: PropertyDescriptor, method: HttpMethod, statusCode?: number, self?: any) {
        const originalFunction: Function = propDesc.value;
        const originalTarget = target;
        const originalKey = propertyKey;
        const successHandle = (result) => BaseHttpMethodDecorator.handleSuccess(result, statusCode);
        const errorHandle = (err) => BaseHttpMethodDecorator.handleError(err);

        propDesc.value = function (rawRequest: InputRequest) {
            BaseHttpMethodDecorator.validateMethod(method, rawRequest.method);

            const key = BaseHttpMethodDecorator.generateKey(originalTarget, originalKey);

            const args = RequestValidator.validate(key, rawRequest);

            return BaseHttpMethodDecorator.applyOriginal(this, originalFunction, args, successHandle, errorHandle);
        };
        return propDesc;
    }

    protected static validateMethod(expected: HttpMethod, found: HttpMethod) {
        if (expected !== found) {
            throw new HttpGenericError(HttpStatusCode.METHOD_NOT_ALLOWED, `${found} - Method not allowed!`);
        }
    }
}
