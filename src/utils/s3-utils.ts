import { S3 } from '@aws-sdk/client-s3';
import * as fileType from 'file-type';
import { log, Logger } from 'node-smart-log';
import { Readable } from 'stream';

export class S3Utils {
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
    @log()
    static async uploadFile(base64File: string, bucketName: string, key: string, isPublic = false): Promise<string> {
        try {
            const buffer = Buffer.from(base64File, 'base64');

            const s3 = S3Utils.getS3();
            const type = await fileType.fromBuffer(buffer);

            await s3.putObject({
                Body: buffer,
                Bucket: bucketName,
                Key: key,
                ContentType: type.mime,
                ACL: isPublic ? 'public-read' : '',
            });
            return `https://${bucketName}.s3.amazonaws.com/${key}`;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    @log()
    static async delete(bucketName: string, key: string): Promise<void> {
        try {
            const s3 = S3Utils.getS3();

            await s3.deleteObject({
                Bucket: bucketName,
                Key: key,
            });
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    @log()
    static async getFile(bucketName: string, key: string): Promise<Readable | ReadableStream | Blob> {
        try {
            const s3 = S3Utils.getS3();
            const result = await s3.getObject({
                Bucket: bucketName,
                Key: key,
            });
            return result.Body;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    private static getS3(): S3 {
        return process.env.NODE_ENV !== 'local'
            ? new S3({})
            : new S3({
                  credentials: {
                      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                      secretAccessKey: process.env.AWS_S3_SECRETE_KEY,
                  },
              });
    }
}
