"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPProvider = void 0;
const axios = require("axios");
const iwallet_adapter_1 = require("../iwallet/iwallet-adapter");
class HTTPProvider extends iwallet_adapter_1.HTTPProviderAdapter {
    async get(url) {
        try {
            const instance = axios.default.create({
                baseURL: this._host,
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            const res = await instance.get(url);
            return res.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    async post(url, data) {
        try {
            const instance = axios.default.create({
                baseURL: this._host,
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            const res = await instance.post(url, { data });
            return res.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    async stream(url, data) {
        try {
            const instance = axios.default.create({
                baseURL: this._host,
                headers: {
                    'Content-Type': 'text/plain',
                },
                responseType: 'stream',
            });
            const res = await instance.post(url, { data });
            return res.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
}
exports.HTTPProvider = HTTPProvider;
//# sourceMappingURL=http-provider.js.map