import { CameraDevice, Html5Qrcode } from 'html5-qrcode';
import { Html5QrcodeError } from 'html5-qrcode/esm/core';
import { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner';
import { useEffect, useRef, useState } from 'react'

interface Html5QRScannerProps {
    onScanSuccess: (decodedText: string) => void;
    handleError?: (errorMessage: string, error: Html5QrcodeError) => void;
}

const qrcodeRegionId = "reader";
let html5QrCode: Html5Qrcode;
let defaultConfig: Html5QrcodeScannerConfig = { qrbox: { width: 250, height: 250 }, fps: 20, }

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props?: Html5QrcodeScannerConfig): Html5QrcodeScannerConfig => {
    let config: Html5QrcodeScannerConfig = defaultConfig;

    if (!props) {
        return config;
    }

    if (props.fps) {
        config.fps = props.fps;
    }

    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }

    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }

    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }

    return config;
};


export const Html5QRScanner: React.FC<Html5QRScannerProps> = ({
    onScanSuccess,
    handleError
}) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const [cameraList, setCameraList] = useState<CameraDevice[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [activeCamera, setActiveCamera] = useState<CameraDevice>();

    useEffect(() => {
        html5QrCode = new Html5Qrcode(qrcodeRegionId);
        getCameras();
        const oldRegion = document.getElementById("qr-shaded-region");
        oldRegion && oldRegion.remove();
    }, []);

    const handleClickAdvanced = () => {
        const config = createConfig();
        setIsScanning(true);

        const qrCodeSuccessCallback = (decodedText: string) => {
            onScanSuccess(decodedText);
            console.log(`QR Code detected: ${decodedText}`);
            handleStop();
        };

        html5QrCode.start(
            { facingMode: "environment" },
            // @ts-ignore
            config,
            qrCodeSuccessCallback,
            handleError
        ).then(() => {
            // const oldRegion = document.getElementById("qr-shaded-region");
            // if (oldRegion) oldRegion.innerHTML = "";
        });
    };

    const getCameras = () => {
        Html5Qrcode.getCameras()
            .then((devices) => {
                /**
                 * devices would be an array of objects of type:
                 * { id: "id", label: "label" }
                 */
                if (devices && devices.length) {
                    setCameraList(devices);
                    setActiveCamera(devices[0]);
                }
            })
            .catch((err) => {
                console.error(err);
                setCameraList([]);
            });
    };

    const onCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.selectedIndex) {
            let selectedCamera = e.target.options[e.target.selectedIndex];
            let cameraId = selectedCamera.dataset.key;
            setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
        }
    };

    const handleStop = () => {
        setIsScanning(false);
        try {
            html5QrCode
                .stop()
                .then((res) => {
                    html5QrCode.clear();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const scanLocalFile = () => {
        handleStop();

        if (!fileRef.current) return;
        fileRef.current.click();
    };

    const scanFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        if (e.target.files.length === 0) {
            // No file selected, ignore
            return;
        }

        // Use the first item in the list
        const imageFile = e.target.files[0];

        html5QrCode.scanFile(imageFile, /* showImage= */ true)
            .then((qrCodeMessage) => {
                onScanSuccess(qrCodeMessage);
                handleStop();
                html5QrCode.clear();
            })
            .catch((err) => {
                // failure, handle it.
                console.log(`Error scanning file. Reason: ${err}`);
            });
    };

    return (
        <div className="container">
            <div id={qrcodeRegionId}></div>

            <div className="flex flex-col justify-center">
                {!isScanning ? (
                    <button onClick={handleClickAdvanced}>Start Scanning</button>
                ) :
                    <>
                        <button onClick={handleStop}>Stop Scanning</button>
                        <button onClick={scanLocalFile}>Scan File</button>
                    </>
                }
                <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    onChange={scanFile}
                    style={{ display: "none" }}
                />
            </div>
        </div>
    );
}