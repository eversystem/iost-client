"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iost_1 = require("../src/iost");
const config = {
    host: 'http://api.iost.io',
    chainId: 1024,
};
const iost = new iost_1.IOST(config);
async function f() {
    const res = await iost.rpc.getContractStorage('Contract3e1wfM1FhyULnLHusbmHxvDbiuSs73LBHBdxBBPkE8Eh', 'news', '');
    const news = JSON.parse(res.data);
    console.log(news);
}
f();
//# sourceMappingURL=test.js.map