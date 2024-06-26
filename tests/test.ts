import 'dotenv/config';
import { expect } from 'chai';
import { genPaths } from '../src/utils/gen_paths';
import { genPairMnemonic, generateAllPairs } from '../src/get_pair_phrase';
import { getBalance } from '../src/check_balance';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { TransactData, sendSol } from '../src/transactions';

describe('test the code', () => {
    const phrase = process.env.SECRET as string;
    it('can generate paths', () => {
        const len = 3;
        const paths = genPaths(len);
        console.log(paths);

        const path_last = paths[len - 1];

        expect(path_last).to.eq(`m/44'/501'/2'/0'`);
    });

    it('can generate pub key pair from mnemonic', () => {
        const targetPubs = [
            'Dv82Zy1serDSABhfRBvQUnwGjNVmVzgbYUBXdFsK1Yw6',
            '499pgGxXUS193epuhpxsgbDh8HWBj18WJVve5A9bX4Ck',
            'GFvyFgbWu7XantZKQUzn28mnUaH79p5qvMAdBhiD4p2X',
        ];

        const paths = genPaths(3);

        const pubs = paths.map((path) => {
            const pair = genPairMnemonic(path, phrase);
            return pair.publicKey.toBase58();
        });
        console.log(pubs);

        expect(targetPubs).to.deep.eq(pubs);
    });

    it('can send solana and check the balance', async () => {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

        const pairs = generateAllPairs(3, phrase);

        const payer = pairs[0];
        const targetPub = pairs[1].publicKey;

        const balancePayer = await getBalance(payer.publicKey, connection);
        const balanceTarget = await getBalance(targetPub, connection);

        console.log({ balancePayer, balanceTarget });

        const data: TransactData = {
            payer: payer,
            toPub: targetPub,
            value: 0.04,
        };

        const confirmed = await sendSol(connection, data);
        const jsonStr = JSON.stringify(confirmed, null, 4);
        console.log(jsonStr);

        const newBalancePayer = await getBalance(payer.publicKey, connection);
        const newBalanceTarget = await getBalance(targetPub, connection);

        console.log({ newBalancePayer, newBalanceTarget });

        expect(newBalancePayer).to.lt(balancePayer);
        expect(newBalanceTarget).to.gt(balanceTarget);
    });
});
