"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPProvider = void 0;
const iwallet_adapter_1 = require("../iwallet/iwallet-adapter");
const node_stream_1 = require("node:stream");
class HTTPProvider extends iwallet_adapter_1.HTTPProviderAdapter {
    async get(url) {
        var _a, _b;
        const fullUrl = new URL(url, this._host).toString();
        const headers = { 'Content-Type': 'text/plain' };
        try {
            const res = await fetch(fullUrl, { method: 'GET', headers });
            const ct = (_a = res.headers.get('content-type')) !== null && _a !== void 0 ? _a : '';
            const isJSON = ct.includes('application/json') || ct.includes('+json');
            if (!res.ok) {
                let payload;
                try {
                    payload = isJSON ? await res.json() : await res.text();
                }
                catch (_c) { }
                throw new Error(typeof payload === 'string'
                    ? payload
                    : payload
                        ? JSON.stringify(payload)
                        : `HTTP ${res.status} ${res.statusText}`);
            }
            const data = isJSON ? await res.json() : await res.text();
            return data;
        }
        catch (err) {
            throw new Error((_b = err === null || err === void 0 ? void 0 : err.message) !== null && _b !== void 0 ? _b : String(err));
        }
    }
    async post(url, data) {
        var _a, _b;
        const fullUrl = new URL(url, this._host).toString();
        try {
            const res = await fetch(fullUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(data),
            });
            const ct = (_a = res.headers.get('content-type')) !== null && _a !== void 0 ? _a : '';
            const isJSON = ct.includes('application/json') || ct.includes('+json');
            if (!res.ok) {
                let payload;
                try {
                    payload = isJSON ? await res.json() : await res.text();
                }
                catch (_c) { }
                throw new Error(typeof payload === 'string'
                    ? payload
                    : payload
                        ? JSON.stringify(payload)
                        : `HTTP ${res.status} ${res.statusText}`);
            }
            const out = isJSON ? await res.json() : await res.text();
            return out;
        }
        catch (err) {
            throw new Error((_b = err === null || err === void 0 ? void 0 : err.message) !== null && _b !== void 0 ? _b : String(err));
        }
    }
    async stream(url, data) {
        var _a;
        const fullUrl = new URL(url, this._host).toString();
        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: typeof data === 'string' ? data : String(data),
        });
        const ct = (_a = res.headers.get('content-type')) !== null && _a !== void 0 ? _a : '';
        const isJSON = ct.includes('application/json') || ct.includes('+json');
        if (!res.ok) {
            let payload;
            try {
                payload = isJSON ? await res.json() : await res.text();
            }
            catch (_b) { }
            throw new Error(typeof payload === 'string'
                ? payload
                : payload
                    ? JSON.stringify(payload)
                    : `HTTP ${res.status} ${res.statusText}`);
        }
        if (!res.body)
            throw new Error('Empty response body');
        const nodeStream = node_stream_1.Readable.fromWeb(res.body);
        return nodeStream;
    }
}
exports.HTTPProvider = HTTPProvider;
//# sourceMappingURL=http-provider.js.map