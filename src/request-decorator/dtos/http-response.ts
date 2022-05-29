/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class HttpResponse {
    constructor(public status: number, public data?: unknown, public error?: any) {}
}
