"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlToJsonUtil = void 0;
const xml2json = require("xml2js");
const node_smart_log_1 = require("node-smart-log");
class XmlToJsonUtil {
    static xmlToJson(xml, node) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                xml2json.parseString(xml, { ignoreAttrs: true }, (err, result) => {
                    if (err) {
                        node_smart_log_1.Logger.error(err);
                        return reject(err);
                    }
                    const json = node ? XmlToJsonUtil.getSpecificNode(result, node) : result;
                    return resolve(json);
                });
            });
        });
    }
    static getSpecificNode(obj, node) {
        for (let i = 0; i < Object.keys(obj).length; i += 1) {
            const k = Object.keys(obj)[i];
            if (k === node) {
                const result = {};
                Object.keys(obj[k]['0']).forEach((j) => {
                    result[j] = obj[k]['0'][j]['0'];
                });
                return result;
            }
            if (typeof obj[k] === 'object') {
                const result = XmlToJsonUtil.getSpecificNode(obj[k], node);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }
}
exports.XmlToJsonUtil = XmlToJsonUtil;
