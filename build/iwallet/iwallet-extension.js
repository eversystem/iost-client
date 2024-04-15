"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIwalletJS = exports.AbstractIOSTAdapter = exports.AbstractRPCAdapter = exports.AbstractHTTPProviderAdapter = exports.AbstractAccountAdapter = void 0;
class AbstractAccountAdapter {
    get name() {
        return this._id;
    }
    constructor(_id) {
        this._id = _id;
    }
}
exports.AbstractAccountAdapter = AbstractAccountAdapter;
class AbstractHTTPProviderAdapter {
    constructor(_host) {
        this._host = _host;
    }
}
exports.AbstractHTTPProviderAdapter = AbstractHTTPProviderAdapter;
class AbstractRPCAdapter {
    constructor(_provider) {
        this._provider = _provider;
    }
}
exports.AbstractRPCAdapter = AbstractRPCAdapter;
class AbstractIOSTAdapter {
    constructor(config) {
        this.config = config;
    }
}
exports.AbstractIOSTAdapter = AbstractIOSTAdapter;
const getIwalletJS = () => {
    const iwallet = window && window['IWalletJS'];
    if (iwallet.network === 'LOCALNET') {
        iwallet.rpc._provider._host = 'http://127.0.0.1:30001';
    }
    return iwallet;
};
exports.getIwalletJS = getIwalletJS;
//# sourceMappingURL=iwallet-extension.js.map