import React from 'react'
import { useWalletModal, useWallet, useConnex } from '@vechain/dapp-kit-react';
import { useWalletName, getAddress } from '@vechain.energy/dapp-kit-hooks';
import NameInput from './NameInput';
import NameDisplay from './NameDisplay';

export default function Demo() {
    const { account, disconnect } = useWallet()
    const walletModal = useWalletModal()
    const { name } = useWalletName(account)
    const [inputValue, setInputValue] = React.useState('')

    const connex = useConnex()

    const [nameForAddress, setNameForAddress] = React.useState('')
    React.useEffect(() => {
        if (!name || !connex) { return }
        getAddress(name, connex)
            .then(setNameForAddress)
            .catch(() => setNameForAddress(''))
    }, [name, connex])

    return (
        <div className="max-w-lg m-auto space-y-12 text-center">
            <div className="space-x-2">
                {Boolean(account) && (
                    <div className="flex flex-col space-y-2">
                        <span className="text-xs">Your are connected as:</span>
                        <span className="font-mono"><NameDisplay value={account} /></span>
                    </div>
                )}

                {!account
                    ? <button
                        onClick={walletModal.open}
                        className="rounded bg-orange-500 text-white p-1 px-2"
                    >
                        connect wallet
                    </button>
                    : <>
                        <button
                            onClick={disconnect}
                            className="rounded bg-red-500 text-white p-1 px-2"
                        >
                            disconnect wallet
                        </button>
                    </>
                }
            </div>

            <hr />

            <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                    <span className="text-xs">Your address resolves to:</span>
                    <span className="font-mono">{name || 'no name'}</span>
                </div>

                <div className="flex flex-col space-y-2">
                    <span className="text-xs">Your name resolves to:</span>
                    <span className="font-mono">{nameForAddress || 'no address'}</span>
                </div>
            </div>


            <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                    <span className='text-xs'>Check NameInput.tsx on how this input is enhanced with a name lookup:</span>
                    <NameInput
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="0x.. or .vet address"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <span className="text-xs">Input resolves to:</span>
                    <span className="font-mono">{inputValue}</span>
                </div>
            </div>
        </div>
    )
}