import { DAppKitProvider } from '@vechain/dapp-kit-react';
import type { WalletConnectOptions } from '@vechain/dapp-kit';
import Demo from './Demo';
const walletConnectOptions: WalletConnectOptions = {
    projectId: process.env.WALLET_CONNECT_PROJECT_ID,
    metadata: {
        name: 'vet.domains',
        description: 'Manage your web3 name on Vechain',
        url: window.location.origin,
        icons: [`https://vet.domains/assets/walletconnect.png`],
    },
};

export default function App() {

    return (
        <DAppKitProvider
            nodeUrl={'https://node-mainnet.vechain.energy'}
            genesis={'main'}
            usePersistence
            walletConnectOptions={walletConnectOptions}
        >
            <Demo />
        </DAppKitProvider>
    );
}