'use client'

import Link from "next/link";
import QRScanner from "./scanner/Scanner";
import { clsx } from "clsx";
import SlideInFromBottomToTop from "@/shared/SlideIn";
import { useState } from "react";

const ScannerButton: React.FC = () => {
    const [isScanning, setIsScanning] = useState(false);

    return (
        <>
            <SlideInFromBottomToTop isOpen={isScanning} onClose={() => setIsScanning(false)}>
                <QRScanner />
            </SlideInFromBottomToTop>
            <button
                onClick={() => setIsScanning(true)}
                className={clsx(
                    "footer-item flex items-center justify-center text-xs flex-col max-w-24 rounded-t-lg w-full",
                    "bg-theme-primary px-1 pb-2 h-24 absolute bottom-0 -top-2 left-1/2 transform -translate-x-[40%]"
                )}>
                <i className="fas fa-camera text-lg"></i>
                <p>Scanner</p>
            </button>
        </>

    )
}

export const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 w-full bg-theme-dark text-white p-4 max-w-[100vw]">
            <div className="flex items-center justify-between w-full px-3">
                <Link href={'/dashboard'} className="footer-item flex items-center text-xs flex-col">
                    <i className="fas fa-tachometer-alt text-lg"></i>
                    <p>Dashboard</p>
                </Link>
                <ScannerButton />
                <Link href={'/help'} className="footer-item flex items-center text-xs flex-col">
                    <i className="fas fa-question-circle text-lg"></i>
                    <p>Help</p>
                </Link>
            </div>
        </footer>
    );
}