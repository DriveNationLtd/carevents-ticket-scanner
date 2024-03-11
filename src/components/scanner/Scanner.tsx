"use client"
import { useState } from 'react';

// Server actions
import { verifyScan } from '@/actions/VerifyScan';

// Scanner library
import { Html5QrcodeError } from 'html5-qrcode/esm/core';

// Components
import { ScanResult } from './ScanResult';
import { TicketScanResponse } from '@/types/event';
import { Html5QRScanner } from './Html5QRScanner';
import Modal from '@/shared/Modal';

interface QRScannerProps {
}

const QRScanner: React.FC<QRScannerProps> = ({ }) => {
    const [result, setResult] = useState<TicketScanResponse | null>(null);

    const onScanSuccess = async (decodedText: string) => {
        const response = await verifyScan(decodedText);
        console.log(response);
        setResult(response);
    };

    const handleError = (errorMessage: string, error: Html5QrcodeError) => {
        // console.log('handleError', errorMessage, error);
    };

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            {!result && (
                <Html5QRScanner
                    onScanSuccess={onScanSuccess}
                    handleError={handleError}
                    startScanning={true}
                />
            )}
            <Modal isOpen={result ? true : false} onClose={() => setResult(null)}>
                <ScanResult result={result} callback={setResult} />
            </Modal>
        </div>
    );
};

export default QRScanner;