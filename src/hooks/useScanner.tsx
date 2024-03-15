import { CameraDevice, Html5Qrcode } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect, useRef, useState } from "react";

let defaultConfig: Html5QrcodeScannerConfig = { qrbox: { width: 250, height: 250 }, fps: 20, }
const qrcodeRegionId = "reader";

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

interface useScannerProps {
    onScanSuccess: (decodedText: string) => void;
    handleError?: (errorMessage: string, error: any) => void;
}

export const useScanner = ({
    onScanSuccess,
    handleError,
}: useScannerProps) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const html5QrCodeRef = useRef<Html5Qrcode>();
    const [cameraList, setCameraList] = useState<CameraDevice[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [activeCamera, setActiveCamera] = useState<CameraDevice>();

    useEffect(() => {
        html5QrCodeRef.current = new Html5Qrcode(qrcodeRegionId);
        getCameras();
        const oldRegion = document.getElementById("qr-shaded-region");
        oldRegion && oldRegion.remove();
    }, []);

    const handleClickAdvanced = () => {
        try {
            const config = createConfig();
            setIsScanning(true);

            const qrCodeSuccessCallback = (decodedText: string) => {
                onScanSuccess(decodedText);
                console.log(`QR Code detected: ${decodedText}`);
                handleStop();
            };

            html5QrCodeRef.current?.start(
                { facingMode: "environment" },
                // @ts-ignore
                config,
                qrCodeSuccessCallback,
                handleError
            ).then(() => {
                // const oldRegion = document.getElementById("qr-shaded-region");
                // if (oldRegion) oldRegion.innerHTML = "";
            });
        } catch (err) {
            console.error(err);
            setIsScanning(false);
        }
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

    const handleStop = () => {
        setIsScanning(false);
        try {
            html5QrCodeRef.current?.stop()
                .then((res) => {
                    html5QrCodeRef.current?.clear();
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

        html5QrCodeRef.current?.scanFile(imageFile, /* showImage= */ true)
            .then((qrCodeMessage) => {
                onScanSuccess(qrCodeMessage);
                handleStop();
                html5QrCodeRef.current?.clear();
            })
            .catch((err) => {
                // failure, handle it.
                console.log(`Error scanning file. Reason: ${err}`);
            });
    };

    return {
        isScanning,
        cameraList,
        activeCamera,
        handleClickAdvanced,
        scanLocalFile,
        scanFile,
        handleStop,
    };
}