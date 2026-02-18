"use client";

import { useState } from "react";

import { ToastType } from "./Toast";

type VerificationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (code: string) => void;
    email: string;
    isLoading?: boolean;
    onShowToast?: (message: string, type: ToastType) => void;
};

export default function VerificationModal({
    isOpen,
    onClose,
    onVerify,
    email,
    isLoading = false,
    onShowToast,
}: VerificationModalProps) {
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single char
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerify = () => {
        // Mock verification logic
        if (code.join("").length === 6) {
            onVerify(code.join(""));
        } else {
            if (onShowToast) {
                onShowToast("Please enter a valid 6-digit code.", "error");
            } else {
                alert("Please enter a valid 6-digit code.");
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl animate-fade-in-up">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        ✕
                    </button>
                </div>
                <h2 className="text-2xl font-black text-[#EB4219] mb-2 text-center">
                    Verify Your Email
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    We sent a 6-digit code to <strong>{email}</strong>. Enter it below to
                    continue.
                </p>

                <div className="flex justify-between gap-2 mb-8">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !digit && index > 0) {
                                    const prevInput = document.getElementById(`otp-${index - 1}`);
                                    prevInput?.focus();
                                }
                                if (e.key === "ArrowLeft" && index > 0) {
                                    const prevInput = document.getElementById(`otp-${index - 1}`);
                                    prevInput?.focus();
                                }
                                if (e.key === "ArrowRight" && index < 5) {
                                    const nextInput = document.getElementById(`otp-${index + 1}`);
                                    nextInput?.focus();
                                }
                            }}
                            onPaste={(e) => {
                                e.preventDefault();
                                const pastedData = e.clipboardData.getData("text").slice(0, 6);
                                if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

                                const newCode = [...code];
                                pastedData.split("").forEach((char, i) => {
                                    if (index + i < 6) {
                                        newCode[index + i] = char;
                                    }
                                });
                                setCode(newCode);

                                // Focus the last filled input or the next empty one
                                const focusIndex = Math.min(index + pastedData.length, 5);
                                const nextInput = document.getElementById(`otp-${focusIndex}`);
                                nextInput?.focus();

                                // Optional: Auto verify if full code pasted
                                if (newCode.join("").length === 6) {
                                    // small delay to let state update logic settle if needed, 
                                    // but handleVerify uses current 'code' state which might be stale here if we called it directly.
                                    // better to let user click or use effect. 
                                    // Actually, let's just focus end.
                                }
                            }}
                            className="w-12 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-[#EB4219] focus:outline-none transition-colors"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="w-full bg-[#EB4219] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d13a15] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Verify Code"
                    )}
                </button>

                <p className="text-center mt-6 text-sm text-gray-500">
                    Didn&apos;t receive code?{" "}
                    <button className="text-[#EB4219] font-bold hover:underline">
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
