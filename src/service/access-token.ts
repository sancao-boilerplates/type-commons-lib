export interface AccessToken {
    clientId: string;
    token: string;
    expiration: moment.Moment;
}
