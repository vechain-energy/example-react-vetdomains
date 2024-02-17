import { useEffect, useState } from 'react';
import { getName } from '@vechain.energy/dapp-kit-hooks';
import { useConnex } from '@vechain/dapp-kit-react';

const CACHE: Record<string, string> = {};

export default function NameDisplay({ value }: { value?: string | null }): string {
    const connex = useConnex();
    const [nameOrAddress, setNameOrAddress] = useState('');

    useEffect(() => {
        let cancelled = false
        const strValue = String(value || '');

        if (nameOrAddress === value) {
            return
        }

        else if (!strValue || !strValue.startsWith('0x')) {
            setNameOrAddress(strValue)
        }

        else if (CACHE[strValue]) {
            setNameOrAddress(CACHE[strValue])
        }
        else {
            getName(strValue, connex)
                .then((name) => {
                    CACHE[strValue] = name || strValue
                    if (cancelled) return
                    setNameOrAddress(CACHE[strValue])
                })
                .catch(() => {
                    if (cancelled) return
                    setNameOrAddress(strValue)
                })
        }

        return () => { cancelled = true }
    }, [nameOrAddress, value, connex])

    return nameOrAddress
}
