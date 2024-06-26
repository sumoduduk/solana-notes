import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';

export interface TransactData {
    payer: Keypair;
    toPub: PublicKey;
    value: number;
}

export async function sendSol(connection: Connection, data: TransactData) {
    try {
        const latestBlockHash =
            await connection.getLatestBlockhash('finalized');

        const transaction = new Transaction();
        const value = data.value * LAMPORTS_PER_SOL;

        transaction.add(
            SystemProgram.transfer({
                fromPubkey: data.payer.publicKey,
                toPubkey: data.toPub,
                lamports: value,
            }),
        );

        const sig = await sendAndConfirmTransaction(connection, transaction, [
            data.payer,
        ]);

        const confirm = await connection.confirmTransaction({
            signature: sig,
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        });

        return confirm;
    } catch (error) {
        console.log(error);
    }
}
