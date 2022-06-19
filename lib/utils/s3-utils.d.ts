import { S3 } from 'aws-sdk';
export declare class S3Utils {
    /**
     * Provide the file as base64 string
     * @param base64File {string}
     * The s3 bucket name
     * @param bucketName {string}
     * Object key
     * @param key {string}
     * Define if the file will be public, default false
     * @param isPublic {boolea}
     * It returns the aws url
     * @returns {string}
     */
    static uploadFile(base64File: string, bucketName: string, key: string, isPublic?: boolean): Promise<string>;
    static delete(bucketName: string, key: string): Promise<void>;
    static getFile(bucketName: string, key: string): Promise<S3.Body>;
    private static getS3;
}
