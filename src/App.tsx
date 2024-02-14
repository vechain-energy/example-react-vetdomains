import React from 'react';
import { DAppKitProvider } from '@vechain/dapp-kit-react';
import Demo from './Demo';

export default function App() {

    return (
        <DAppKitProvider
            nodeUrl='https://node-mainnet.vechain.energy'
            genesis='main'
            usePersistence
        >
            <Demo />
        </DAppKitProvider>
    );
}