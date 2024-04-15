"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPProvider = void 0;
const axios = require("axios");
const iwallet_adapter_1 = require("../iwallet/iwallet-adapter");
class HTTPProvider extends iwallet_adapter_1.HTTPProviderAdapter {
    async get(url) {
        try {
            const config = {
                method: 'get',
                baseURL: this._host,
                url,
                headers: {
                    'Content-Type': 'text/plain',
                },
            };
            const res = await axios.default(config);
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
            const config = {
                method: 'post',
                baseURL: this._host,
                url,
                data,
                headers: {
                    'Content-Type': 'text/plain',
                },
            };
            const res = await axios.default(config);
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
            const config = {
                method: 'post',
                baseURL: this._host,
                url,
                data,
                headers: {
                    'Content-Type': 'text/plain',
                },
                responseType: 'stream',
            };
            const res = await axios.default(config);
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