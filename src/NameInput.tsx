import React, { type InputHTMLAttributes, useRef } from 'react';
import { getAddress } from '@vechain.energy/dapp-kit-hooks';
import { useConnex } from '@vechain/dapp-kit-react';

const CACHE: Record<string, string> = {};
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default function NameInput({ onChange, ...props }: InputHTMLAttributes<HTMLInputElement>) {
    const connex = useConnex();
    const latestCallId = useRef(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) { return }

        const value = e.target.value;
        if (!String(value).includes('.')) { return onChange(e); }

        if (CACHE[value]) {
            return passOnChangeWithValue(onChange, e, CACHE[value])
        }

        const callId = ++latestCallId.current;
        getAddress(value, connex)
            .then((address) => {
                CACHE[value] = address === ZERO_ADDRESS ? '' : address
                if (callId !== latestCallId.current) return; // Ignore if not the latest call
                return passOnChangeWithValue(onChange, e, CACHE[value])
            })
            .catch(() => {
                if (callId !== latestCallId.current) return; // Ignore if not the latest call
                onChange(e)
            })
    }

    return (
        <input
            {...props}
            onChange={handleChange}
        />
    )
}

function passOnChangeWithValue(handler, e: React.ChangeEvent<HTMLInputElement>, value) {
    handler({
        ...e,
        target: {
            ...e.target,
            value
        }
    });
}