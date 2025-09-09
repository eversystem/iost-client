import { IOST } from '../src/iost';

const config = {
  host: 'http://api.iost.io',
  chainId: 1024,
};
const iost = new IOST(config);

async function f() {
  //console.log('ADDRESS', ADDRESS);
  const res = await iost.rpc.getContractStorage(
    'Contract3e1wfM1FhyULnLHusbmHxvDbiuSs73LBHBdxBBPkE8Eh',
    'news',
    '',
  );
  const news = JSON.parse(res.data);
  console.log(news);
}

f();
