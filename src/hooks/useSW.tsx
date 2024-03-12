'use client';
import { useEffect } from 'react'

const useServiceWorker = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Check if there's already a service worker registered
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    if (registrations.length === 0) {
                        // No service worker registered, register a new one
                        navigator.serviceWorker.register('/sw.js')
                            .then(registration => {
                                console.log('Service worker registered:', registration);
                            })
                            .catch(error => {
                                console.error('Service worker registration failed:', error);
                            });
                    } else {
                        // Service worker already registered
                        console.log('Service worker already registered:', registrations[0].active);
                    }
                }).catch(error => {
                    console.error('Error while checking service worker registrations:', error);
                });
            });
        }
    }, []);

    return null;
}

export default useServiceWorker;