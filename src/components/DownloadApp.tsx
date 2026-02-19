"use client";

import { useState } from "react";

export default function DownloadApp() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const downloadUrl = "https://expo.dev/artifacts/eas/mw2zsx83Ckp8yRHeeVt1gf.apk";

    const handleDownloadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);

        // Simulate "starting in a few seconds" then trigger download
        setTimeout(() => {
            window.location.href = downloadUrl;
        }, 3000);
    };

    return (
        <div className="bg-black py-20 px-10 text-center mt-20 relative">
            <h2 className="text-white font-black text-3xl lg:text-5xl mb-6">
                Experience Q on Mobile
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Download the Q app for the best experience. Manage your subscriptions, split bills, and track your savings on the go.
            </p>
            <button
                onClick={handleDownloadClick}
                className="bg-[#EB4219] text-white px-8 py-4 rounded-full font-black text-xl hover:bg-[#d13a15] transition-colors inline-block"
            >
                Download for Android
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative animate-fade-in-up">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black"
                        >
                            ✕
                        </button>
                        <div className="text-6xl mb-4">⬇️</div>
                        <h3 className="text-2xl font-black text-black mb-2">Downloading...</h3>
                        <p className="text-gray-600 mb-6">
                            Your download should start automatically in a few seconds.
                        </p>
                        <div className="animate-pulse w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
                            <div className="bg-[#EB4219] h-full w-full origin-left animate-[grow_2s_ease-in-out]"></div>
                        </div>
                        <p className="text-sm text-gray-500">
                            If it doesn't start, <a href={downloadUrl} className="text-[#EB4219] font-bold underline">click here</a> to restart.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
