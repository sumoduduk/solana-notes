import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

export async function getBalance(pubKey: PublicKey, connection: Connection) {
    const balance = await connection.getBalance(pubKey);

    return balance / LAMPORTS_PER_SOL;
}
