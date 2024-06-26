import 'dotenv/config';
import { genPairMnemonic } from '../src/get_pair_phrase';
import { requestAirdrop } from '../src/dev_airdrop';

async function reqAirdrop() {
    const mnemonic = process.env.SECRET as string;
    const path44 = `m/44'/501'/0'/0'`;

    const pair = genPairMnemonic(path44, mnemonic);
    const pubKey = pair.publicKey;

    const sig = await requestAirdrop(pubKey);
    console.log(sig);
}

reqAirdrop();
