"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPProvider = void 0;
const iwallet_adapter_1 = require("../iwallet/iwallet-adapter");
class HTTPProvider extends iwallet_adapter_1.HTTPProviderAdapter {
    constructor() {
        super(...arguments);
        this.headers = { 'Content-Type': 'text/plain' };
    }
    async request(method, url, data, opts) {
        const fullUrl = new URL(url, this._host).toString();
        const init = {
            method,
            headers: this.headers,
        };
        if (method === 'POST') {
            if (data == null)
                throw new Error('post data is undefied');
            init.body = typeof data === 'string' ? data : String(data);
        }
        const res = await fetch(fullUrl, init);
        if (opts === null || opts === void 0 ? void 0 : opts.stream) {
            if (!res.ok)
                throw new Error(await this.readError(res));
            return res.body;
        }
        const ct = res.headers.get('content-type') || '';
        const isJSON = ct.includes('application/json') || ct.includes('+json');
        if (!res.ok) {
            throw new Error(await this.readError(res, isJSON));
        }
        const body = isJSON ? await res.json() : await res.text();
        return body;
    }
    async readError(res, isJSONHint) {
        var _a;
        try {
            const ct = (_a = res.headers.get('content-type')) !== null && _a !== void 0 ? _a : '';
            const isJSON = isJSONHint !== null && isJSONHint !== void 0 ? isJSONHint : (ct.includes('application/json') || ct.includes('+json'));
            const payload = isJSON ? await res.json() : await res.text();
            return typeof payload === 'string' ? payload : JSON.stringify(payload);
        }
        catch (_b) {
            return `HTTP ${res.status} ${res.statusText}`;
        }
    }
    async get(url) {
        return this.request('GET', url);
    }
    async post(url, data) {
        return this.request('POST', url, data);
    }
    async stream(url, data) {
        return this.request('POST', url, data, { stream: true });
    }
}
exports.HTTPProvider = HTTPProvider;
//# sourceMappingURL=http-provider.js.map