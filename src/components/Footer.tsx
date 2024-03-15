import Link from "next/link";
import QRScanner from "./scanner/Scanner";

export const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 w-full bg-white dark:bg-theme-dark text-white dark:text-white p-4 max-w-[100vw]">
            <div className="flex items-center justify-between w-full px-3">
                <Link href={'/dashboard'} className="footer-item flex items-center text-xs flex-col">
                    <i className="fas fa-tachometer-alt text-lg"></i>
                    <p>Dashboard</p>
                </Link>
                <QRScanner />
                <Link href={'/help'} className="footer-item flex items-center text-xs flex-col">
                    <i className="fas fa-question-circle text-lg"></i>
                    <p>Help</p>
                </Link>
            </div>
        </footer>
    );
}