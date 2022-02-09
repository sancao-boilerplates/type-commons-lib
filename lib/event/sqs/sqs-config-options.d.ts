export interface SqsConfigOptions {
    /**
     * The sqs api version
     * @default 2012-11-05
     */
    apiVersion?: string;
    /**
     * The aws iam credentials
     */
    credentials?: {
        accessKeyId: string;
        secretAccessKey: string;
    };
    /**
     * The aws sqs region
     * @default us-east-1
     */
    region?: string;
}
