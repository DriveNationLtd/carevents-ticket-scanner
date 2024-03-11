import React from 'react'

interface ThemeBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export const ThemeBtn: React.FC<ThemeBtnProps> = (props) => {
    const { onClick, className, children } = props;

    return (
        <button
            {...props}
            className={`bg-theme-dark hover:bg-theme-primary px-4 py-2 rounded-lg transition-colors duration-200 ${className || ''}`}
            onClick={onClick}>
            {children}
        </button>
    );
}