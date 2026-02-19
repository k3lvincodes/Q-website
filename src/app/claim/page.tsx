"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VerificationModal from "@/components/VerificationModal";
import PasswordModal from "@/components/PasswordModal";
import Toast, { ToastType } from "@/components/Toast";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ClaimContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const intent = searchParams.get("intent");
    const [currentStep, setCurrentStep] = useState(1);
    const [hasAccount, setHasAccount] = useState<boolean | null>(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordHint, setPasswordHint] = useState<string | undefined>(undefined);
    const [giftCode, setGiftCode] = useState("");
    const [claimResult, setClaimResult] = useState<"success" | "failure" | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(
        null
    );
    const [claimMessage, setClaimMessage] = useState("");

    const showToast = (message: string, type: ToastType) => {
        setToast({ message, type });
    };

    // Check for session cookie and URL params on mount
    useEffect(() => {
        if (typeof document !== "undefined") {
            const session = document.cookie
                .split("; ")
                .find((row) => row.startsWith("q_session="));
            if (session) {
                setHasAccount(true);
                setCurrentStep(3);
                showToast("Welcome back! Session restored.", "success");
            }
        }

        // Handle URL params
        if (searchParams) {
            // Check for ?code=XYZ or ?gift=XYZ
            let code = searchParams.get("code") || searchParams.get("gift");

            // If checking for ?XYZ (key only), we need iterate or check toString
            if (!code) {
                // Iterating keys to find a potential code (heuristic: length > 4 and not a known param)
                for (const key of Array.from(searchParams.keys())) {
                    if (key !== "code" && key !== "gift" && key.length > 4) {
                        code = key;
                        break;
                    }
                }
            }

            if (code) {
                setGiftCode(code.trim());
                // If user is already logged in (session exists), we could auto-advance
                // But let's stick to pre-filling for now and let the session check handle the step
            }
        }
    }, [searchParams]);

    const handleNextStep = async () => {
        if (currentStep === 2) {
            // Trigger verification modal instead of basic next
            if (!email || (!hasAccount && !name)) {
                showToast("Please fill in all fields.", "error");
                return;
            }

            const endpoint = hasAccount ? "/api/proxy/auth/login" : "/api/proxy/auth/register";
            const body = hasAccount ? { email } : { email, full_name: name };

            setIsLoading(true);
            try {
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const data = await res.json();

                if (!res.ok) {
                    showToast(data.error || "Something went wrong.", "error");
                    return;
                }

                setIsVerificationModalOpen(true);
            } catch (error) {
                showToast("Failed to connect to the server.", "error");
            } finally {
                setIsLoading(false);
            }
        } else if (currentStep === 3) {
            // Initiate claim without password
            performClaim();
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const performClaim = async (password?: string) => {
        // Claim gift
        if (!giftCode) {
            showToast("Please enter a code.", "error");
            return;
        }

        setIsLoading(true);
        try {
            // Get token from cookie
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("q_access_token="))
                ?.split("=")
                .slice(1)
                .join("=");

            if (!token) {
                showToast("Session expired. Please login again.", "error");
                setCurrentStep(1);
                return;
            }

            const body: any = { gift_code: giftCode.trim() };
            if (password) {
                body.password = password;
            }

            const res = await fetch("/api/proxy/gifts/claim", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            // Handle JWT expired
            if (data.error === "JWT expired") {
                showToast("Session expired. Please login again.", "error");
                document.cookie = "q_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                document.cookie = "q_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                setHasAccount(null);
                setCurrentStep(1);
                setIsPasswordModalOpen(false);
                return;
            }

            // Handle password required case
            if (data.password_required) {
                setPasswordHint(data.hint);
                setIsPasswordModalOpen(true);
                return; // Stop here, wait for password submission
            }

            if (data.success) {
                setClaimResult("success");
                setClaimMessage(data.message || "Gift claimed successfully!");
                setIsPasswordModalOpen(false); // Close modal if open
                setCurrentStep(4);
            } else {
                // If we provided a password and it failed, keep modal open? 
                // Or if generic failure, show error.
                if (password && !data.success) {
                    showToast(data.error || "Incorrect password.", "error");
                    // Keep password modal open to try again
                } else {
                    setClaimResult("failure");
                    setClaimMessage(data.error || "Failed to claim gift.");
                    setIsPasswordModalOpen(false);
                    setCurrentStep(4);
                }
            }
        } catch (error) {
            setClaimResult("failure");
            setClaimMessage("An error occurred. Please try again.");
            setIsPasswordModalOpen(false);
            setCurrentStep(4);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerificationSuccess = async (code: string) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/proxy/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    token: code,
                    type: hasAccount ? "email" : "signup",
                    full_name: !hasAccount ? name : undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                showToast(data.error || "Verification failed.", "error");
                return;
            }

            setIsVerificationModalOpen(false);
            showToast("Email verified successfully!", "success");

            if (intent === "signup") {
                router.push("/dashboard");
                return;
            }

            setCurrentStep(3); // Move to gift step

            // Set session cookie and access token
            // Note: In production, HttpOnly cookies should be set by the server. 
            // For this proxy setup, we'll set them here for now as requested.
            const maxAge = 86400; // 24 hours
            document.cookie = `q_session=true; path=/; max-age=${maxAge}; SameSite=Lax`;
            if (data.session?.access_token) {
                document.cookie = `q_access_token=${data.session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax`;
            }

            showToast("Email verified successfully!", "success");
        } catch (error) {
            showToast("Verification failed.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute w-full overflow-x-hidden">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <Header />
            <VerificationModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
                onVerify={handleVerificationSuccess}
                email={email}
                isLoading={isLoading}
                onShowToast={showToast}
            />
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSubmit={performClaim}
                hint={passwordHint}
                isLoading={isLoading}
                onShowToast={showToast}
            />

            <main className="lg:px-30 px-4 pt-32 pb-28 min-h-[80vh] flex flex-col items-center justify-start text-center relative overflow-x-hidden">
                <div className="w-full max-w-2xl mx-auto relative overflow-x-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out w-[400%]"
                        style={{ transform: `translateX(-${(currentStep - 1) * 25}%)` }}
                    >
                        {/* Step 1: Account Check */}
                        <div className="w-1/4 flex-shrink-0 px-4 flex flex-col items-center">
                            <h1 className="font-black lg:text-4xl text-2xl text-black mb-5">
                                Do you have a Q account?
                            </h1>
                            <p className="text-gray-700 text-lg mb-10">
                                {intent === "signup"
                                    ? "Let's get you started with your account."
                                    : "Let's get you started with claiming your gift."}
                            </p>

                            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mb-10">
                                <button
                                    onClick={() => setHasAccount(true)}
                                    className={`px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-lg lg:text-xl border-2 transition-all w-full ${hasAccount === true
                                        ? "bg-[#EB4219] text-white border-[#EB4219]"
                                        : "bg-white text-black border-gray-200 hover:border-[#EB4219]"
                                        }`}
                                >
                                    Yes, I have an account
                                </button>
                                <button
                                    onClick={() => setHasAccount(false)}
                                    className={`px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-lg lg:text-xl border-2 transition-all w-full ${hasAccount === false
                                        ? "bg-[#EB4219] text-white border-[#EB4219]"
                                        : "bg-white text-black border-gray-200 hover:border-[#EB4219]"
                                        }`}
                                >
                                    No, I&apos;m new here
                                </button>
                            </div>

                            {hasAccount !== null && (
                                <button
                                    onClick={handleNextStep}
                                    className="bg-[#EB4219] text-white px-10 py-3 rounded-full font-black text-lg hover:bg-[#d13a15] transition-colors animate-fade-in-up"
                                >
                                    {intent === "signup" ? "Start" : "Next"}
                                </button>
                            )}
                        </div>

                        {/* Step 2: User Details */}
                        <div className="w-1/4 flex-shrink-0 px-4 flex flex-col items-center">
                            <h1 className="font-black lg:text-4xl text-2xl text-black mb-3 lg:mb-5">
                                {hasAccount ? "Welcome Back!" : "Create Account"}
                            </h1>
                            <p className="text-gray-700 text-base lg:text-lg mb-6 lg:mb-10 px-2">
                                {hasAccount
                                    ? "Enter your email to verify your identity."
                                    : "Tell us a bit about yourself to get started."}
                            </p>

                            <div className="w-full max-w-sm mx-auto flex flex-col gap-5 text-left mb-10">
                                {!hasAccount && (
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. John Doe"
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#EB4219] focus:outline-none transition-colors"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="e.g. john@example.com"
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#EB4219] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="px-6 py-3 rounded-full font-bold text-gray-500 hover:text-black transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    disabled={isLoading}
                                    className="bg-[#EB4219] text-white px-10 py-3 rounded-full font-black text-lg hover:bg-[#d13a15] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "Continue"
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Step 3: Gift Code */}
                        <div className="w-1/4 flex-shrink-0 px-4 flex flex-col items-center">
                            <h1 className="font-black lg:text-4xl text-2xl text-black mb-3 lg:mb-5">
                                Enter Gift Code
                            </h1>
                            <p className="text-gray-700 text-base lg:text-lg mb-6 lg:mb-10 px-2">
                                Authorized! Now enter your gift code below.
                            </p>

                            <div className="w-full max-w-sm mx-auto mb-10">
                                <input
                                    type="text"
                                    value={giftCode}
                                    onChange={(e) => setGiftCode(e.target.value)}
                                    placeholder="e.g. GIFT2024"
                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#EB4219] focus:outline-none transition-colors text-center text-2xl font-bold uppercase tracking-widest"
                                />
                            </div>

                            <button
                                onClick={handleNextStep}
                                disabled={isLoading}
                                className="bg-[#EB4219] text-white px-10 py-3 rounded-full font-black text-lg hover:bg-[#d13a15] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Redeem"
                                )}
                            </button>
                        </div>

                        {/* Step 4: Result */}
                        <div className="w-1/4 flex-shrink-0 px-4 flex flex-col items-center">
                            {claimResult === "success" ? (
                                <>
                                    <div className="bg-green-100 p-8 rounded-full mb-8">
                                        <span className="text-6xl">🎉</span>
                                    </div>
                                    <h1 className="font-black lg:text-4xl text-2xl text-black mb-3 lg:mb-5">
                                        Congratulations!
                                    </h1>
                                    <p className="text-gray-700 text-base lg:text-lg mb-6 lg:mb-10 px-2">
                                        Your gift has been successfully redeemed. Check your dashboard
                                        for your reward.
                                    </p>
                                    <a
                                        href="/dashboard"
                                        className="bg-[#EB4219] text-white px-10 py-3 rounded-full font-black text-lg hover:bg-[#d13a15] transition-colors"
                                    >
                                        Go to Dashboard
                                    </a>
                                </>
                            ) : (
                                <>
                                    <div className="bg-red-100 p-8 rounded-full mb-8">
                                        <span className="text-6xl">⚠️</span>
                                    </div>
                                    <h1 className="font-black lg:text-4xl text-2xl text-black mb-3 lg:mb-5">
                                        Redemption Failed
                                    </h1>
                                    <p className="text-gray-700 text-base lg:text-lg mb-6 lg:mb-10 px-2">
                                        {claimMessage || "The gift code you entered is invalid or expired."}
                                    </p>
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        className="bg-gray-200 text-black px-10 py-3 rounded-full font-black text-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}

export default function ClaimPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClaimContent />
        </Suspense>
    );
}
