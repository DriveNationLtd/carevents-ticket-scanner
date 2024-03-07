"use client"

import { useEffect, useRef, useState } from 'react';

// Server actions
import { verifyScan } from '@/actions/VerifyScan';

// Scanner library
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner';
import { Html5QrcodeError } from 'html5-qrcode/esm/core';

// Components
import { ScanResult } from './ScanResult';

interface QRScannerProps {
}

let config: Html5QrcodeScannerConfig = { qrbox: { width: 250, height: 250 }, fps: 20}

const QRScanner: React.FC<QRScannerProps> = ({  }) => {
    const [result, setResult] = useState<string | null>(null);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        if (result === null) {
            scannerRef.current = null;
        }

        if (!scannerRef.current) {
            const scanner = new Html5QrcodeScanner("reader", config, false); // Assuming 'config' is defined elsewhere
            scannerRef.current = scanner;

            const onScanSuccess = async (decodedText: string) => {
                scanner.clear();
                setResult(decodedText);
            };

            const handleError = (errorMessage: string, error: Html5QrcodeError) => {
                // console.log('handleError', errorMessage, error);
            };

            scanner.render(onScanSuccess, handleError);
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
                scannerRef.current = null;
            }
        };
    }, [result]);

    useEffect(() => {
        async function callAction(result: string) {
            const response = await verifyScan(result);
            console.log('response', response);
            if (response.success) {
            }
        }

        if (result) {
            callAction(result);
        }
    }, [result]);

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div id="reader"></div>

            <button onClick={() => setResult('bC90bEVNdzNDdzJiRFBCeHdhQUYwdz09')}>Reset</button>

            {result && <ScanResult result={result} callback={setResult} />}
        </div>
    );
};

export default QRScanner;
