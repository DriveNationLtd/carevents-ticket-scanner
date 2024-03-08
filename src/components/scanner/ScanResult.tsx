import { TicketScanResponse } from '@/types/event';
import React from 'react'

interface ScanResultProps {
    result: TicketScanResponse | null;
    callback: (result: null) => void;
}

export const ScanResult: React.FC<ScanResultProps> = ({
    result,
    callback
}) => {
    if (result === null) {
        return (
            <div>
                <p>Scan a QR code to see the result</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col max-w-lg mx-auto">
            <p className="text-white text-xl">{JSON.stringify(result?.data)}</p>
        </div>
    );
}