"use client";

import { useState } from "react";
import { ToastType } from "./Toast";

type PasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (password: string) => void;
    hint?: string;
    isLoading?: boolean;
    onShowToast?: (message: string, type: ToastType) => void;
};

export default function PasswordModal({
    isOpen,
    onClose,
    onSubmit,
    hint,
    isLoading = false,
    onShowToast,
}: PasswordModalProps) {
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (!password) {
            if (onShowToast) {
                onShowToast("Please enter the password.", "error");
            }
            return;
        }
        onSubmit(password);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl animate-fade-in-up">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-black transition-colors">
                        ✕
                    </button>
                </div>
                <h2 className="text-2xl font-black text-[#EB4219] mb-2 text-center">
                    Password Required
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    This gift is protected. Please enter the password to claim it.
                </p>

                {hint && (
                    <div className="bg-orange-50 p-4 rounded-xl mb-6 text-center">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Hint</p>
                        <p className="text-gray-800 font-medium">{hint}</p>
                    </div>
                )}

                <div className="mb-8">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#EB4219] focus:outline-none transition-colors text-center text-lg"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit();
                        }}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-[#EB4219] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d13a15] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Unlock Gift"
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
