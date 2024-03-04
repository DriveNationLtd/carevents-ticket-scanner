import React from 'react'

interface ScanResultProps {
    result: string | null;
    callback: (result: string | null) => void;
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
            <p className="text-white text-xl">{result}</p>
            <button
                onClick={() => callback(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            >
                Scan Again
            </button>
        </div>
    );
}