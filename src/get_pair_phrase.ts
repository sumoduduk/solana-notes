import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { genPaths } from './utils/gen_paths';

export function genPairMnemonic(path44Change: string, phrase: string) {
    const seed = mnemonicToSeedSync(phrase).toString('hex');
    const derivedSeed = derivePath(path44Change, seed).key;

    const pair = Keypair.fromSeed(derivedSeed);
    return pair;
}

export function generateAllPairs(len: number, mnemonic: string) {
    const paths = genPaths(len);
    const pairs = paths.map((path44) => {
        const pair = genPairMnemonic(path44, mnemonic);
        return pair;
    });

    return pairs;
}

export function genSecrets(len: number, mnemonic: string) {
    const paths = genPaths(len);
    const secretKeys = paths.map((path44) => {
        const pair = genPairMnemonic(path44, mnemonic);
        return pair.secretKey;
    });

    return secretKeys;
}
