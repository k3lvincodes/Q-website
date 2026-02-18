"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = () => {
        // Clear session cookie
        document.cookie = "q_session=; path=/; max-age=0; SameSite=Lax";
        // Redirect to home
        window.location.href = "/";
    };

    return (
        <div className="absolute w-full overflow-x-hidden bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-40 pb-20">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl max-w-3xl w-full animate-fade-in-up border border-gray-100/50 backdrop-blur-sm">
                    <div className="bg-orange-50 w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8 animate-bounce-slow">
                        <span className="text-4xl lg:text-5xl">🎁</span>
                    </div>

                    <h1 className="text-3xl lg:text-5xl font-black text-black mb-4 lg:mb-6 tracking-tight leading-tight">
                        Your Rewards <br /> <span className="text-[#EB4219]">Await!</span>
                    </h1>

                    <p className="text-gray-600 text-base lg:text-xl mb-8 lg:mb-12 max-w-lg mx-auto leading-relaxed px-4">
                        To view your claimed gifts, manage subscriptions, and split bills, please continue in the <span className="font-bold text-black">Q mobile app</span>.
                    </p>

                    <div className="flex flex-col gap-6 justify-center max-w-sm mx-auto mb-10 lg:mb-12 w-full px-4">
                        <button
                            onClick={() => window.location.href = "https://expo.dev/artifacts/eas/qbz9Eai1qMdKNr78hqoexR.apk"}
                            className="bg-black text-white px-6 py-4 lg:px-8 lg:py-5 rounded-2xl font-black text-base lg:text-lg flex items-center justify-center gap-2 lg:gap-3 hover:bg-gray-900 hover:scale-105 transition-all shadow-lg hover:shadow-xl group w-full whitespace-nowrap"
                        >
                            <span className="text-xl lg:text-2xl group-hover:animate-bounce">🤖</span>
                            <span>Download for Android</span>
                        </button>
                    </div>

                    <div className="border-t border-gray-100 pt-6 lg:pt-8 flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 font-bold hover:text-[#EB4219] transition-colors py-2 px-6 rounded-lg hover:bg-orange-50 text-sm tracking-wide uppercase"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
