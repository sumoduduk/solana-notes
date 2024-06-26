import {
    PublicKey,
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';

export async function requestAirdrop(pubkey: PublicKey) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const airdropSig = await connection.requestAirdrop(
        pubkey,
        LAMPORTS_PER_SOL,
    );

    const latestBlockHash = await connection.getLatestBlockhash('finalized');

    const confirmation = await connection.confirmTransaction({
        signature: airdropSig,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    });

    return confirmation;
}
