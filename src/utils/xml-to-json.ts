import * as xml2json from 'xml2js';
import { Logger } from 'node-smart-log';

export class XmlToJsonUtil {
    static async xmlToJson<T>(xml: string, node?: string): Promise<T> {
        return new Promise((resolve, reject) => {
            xml2json.parseString(xml, { ignoreAttrs: true }, (err, result) => {
                if (err) {
                    Logger.error(err);
                    return reject(err);
                }

                const json: T = node ? XmlToJsonUtil.getSpecificNode(result, node) : result;

                return resolve(json);
            });
        });
    }

    private static getSpecificNode(obj: { [key: string]: unknown }, node: string): unknown {
        for (let i = 0; i < Object.keys(obj).length; i += 1) {
            const k = Object.keys(obj)[i];
            if (k === node) {
                const result: { [key: string]: unknown } = {};
                Object.keys(obj[k]['0']).forEach((j) => {
                    result[j] = obj[k]['0'][j]['0'];
                });
                return result;
            }
            if (typeof obj[k] === 'object') {
                const result = XmlToJsonUtil.getSpecificNode(obj[k] as { [key: string]: unknown }, node);
                if (result) {
                    return result;
                }
            }
        }

        return null;
    }
}
