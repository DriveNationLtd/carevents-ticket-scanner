import { useEffect, useState } from "react";

export const useConnectiviy = () => {
    const [isOnline, setIsOnline] = useState<boolean>(
        typeof window !== 'undefined' ? window.navigator.onLine : true
    );

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };

    }, []);

    return {
        isOnline
    }
}