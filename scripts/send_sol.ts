import { Connection, clusterApiUrl } from '@solana/web3.js';
import { generateAllPairs } from '../src/get_pair_phrase';
import { TransactData, sendSol } from '../src/transactions';
import 'dotenv/config';

async function transact_send() {
    try {
        const mnemonic = process.env.SECRET!;

        const pairs = generateAllPairs(3, mnemonic);

        const payerPub = pairs[0];
        const targetPub = pairs[2].publicKey;

        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

        const data: TransactData = {
            payer: payerPub,
            toPub: targetPub,
            value: 0.05,
        };

        const confirm = await sendSol(connection, data);
        console.log({ confirm });
    } catch (error) {
        console.log('error', error);
    }
}

transact_send();
