'use client'
import { signOut } from "@/auth";
import { SignOutBtn } from "@/shared/SignOutBtn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import TransitionLink from "./TransistionLink";

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
];

export const Header: React.FC = () => {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-theme-dark h-16 w-full flex justify-between items-center px-4 mb-5">
            <div className="text-white text-xl">
                <button className="relative group" onClick={toggleMenu}>
                    <div className="relative flex items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-theme-dark ring-0 ring-opacity-0 duration-200 shadow-md">
                        <div className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 ${isMenuOpen ? 'rotate-45' : 'rotate-0'} origin-center`}>
                            <div className={`bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 ${isMenuOpen ? '-rotate-90 h-[1px] -translate-y-[1px]' : 'rotate-0'} origin-right delay-75`}></div>
                            <div className="bg-white h-[1px] rounded"></div>
                            <div className={`bg-white h-[2px] w-1/2 rounded self-end transform transition-all duration-300 ${isMenuOpen ? '-rotate-90 h-[1px] translate-y-[1px]' : 'rotate-0'} origin-left delay-75`}></div>
                        </div>
                    </div>
                </button>
            </div>
            <Image src="/logo.png" alt="CarEvents.com" width={100} height={100} className="max-w-16" />
            <div className={`absolute top-16 left-0 bg-theme-dark w-1/2 h-[calc(100vh-4rem)] p-4 z-10 transition-all duration-300 ${isMenuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-[100%] pointer-events-none'}`}>
                <ul className="flex flex-col h-full justify-between">
                    <div className="top-nav flex flex-col gap-4">
                        {navLinks.map((link, index) => (
                            <li key={index} onClick={closeMenu}>
                                <TransitionLink href={link.href} label={link.label} className={`${pathname === link.href ? 'text-white/60' : 'text-white '}`} />
                            </li>
                        ))}
                    </div>

                    <div className="bottom-nav">
                        <li onClick={closeMenu}>
                            <SignOutBtn />
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
}