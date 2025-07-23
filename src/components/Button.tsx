import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
}

export default function Button({ children, onClick, type, variant = "primary" }: ButtonProps) {
    const baseClass = "px-4 flex items-center gap-2 py-2 rounded-lg transition-colors";
    const primaryClass = "bg-primary-2 text-white hover:bg-primary-2/90";
    const secondaryClass = "bg-gray-200 text-gray-800 hover:bg-gray-300";

    return (
        <button
            onClick={onClick}
            type={type}
            className={`${baseClass} ${variant === "secondary" ? secondaryClass : primaryClass}`}
        >
            {children}
        </button>
    );
}