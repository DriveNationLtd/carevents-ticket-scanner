"use client"
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { ScanResult } from './ScanResult';

const QRScanner = () => {
    const [result, setResult] = useState<string | null>(null);
    const [startScan, setStartScan] = useState<boolean>(false);

    const handleScan = (data: string | null) => {
        if (data) {
            setResult(data);
        }
    };

    const handleError = (err: Error) => {
        console.error(err);
    };

    return (
        <div className='w-full h-full flex justify-center items-center'>
            {(!result && startScan) && (
                <QrReader
                    scanDelay={500}
                    className='w-full h-full max-w-lg max-h-lg px-23'
                    constraints={{ frameRate: { ideal: 10, max: 15 }, facingMode: "environment", displaySurface: "window" }}
                    onResult={(result, error) => {
                        if (result) {
                            handleScan(result.getText());
                        }

                        if (error) {
                            handleError(error);
                        }
                    }}
                />
            )}
            {(!result && !startScan) && (
                <div className='flex flex-col items-center'>
                    <div className='flex flex-col items-center'>
                        {/* Scan icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-blue-500 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => setStartScan(true)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l9-5-9-5-9 5 9 5z"
                            />
                        </svg>
                        {/* Optional text */}
                        <p className="text-sm text-gray-500">Click to scan QR code</p>
                    </div>
                </div>
            )}
            {result && <ScanResult result={result} callback={setResult} />}
        </div>
    );
};

export default QRScanner;
