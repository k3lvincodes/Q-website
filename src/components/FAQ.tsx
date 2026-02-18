"use client";

import { useState } from "react";
import Image from "next/image";
import dropdown from "../../public/svg/dropdown.svg";
import illustration from "../../public/svg/Illustration.svg";

const faqData = [
    {
        number: "01",
        question: "How does Q work?",
        answer:
            "Q lets you legally share and split the cost of premium subscriptions like Netflix, Spotify, Canva, and more with verified users. We handle the group setup, payments, and renewals — you just enjoy.",
    },
    {
        number: "02",
        question: "Is it safe to share subscriptions with strangers?",
        answer:
            'We don\'t do "randoms." Q connects you with verified users only. Each group is screened, payments are secured, and no one can ghost you or hijack the account.',
    },
    {
        number: "03",
        question: "What kind of services can I share on Q?",
        answer:
            "You can split subscriptions to services like Netflix, Spotify, ChatGPT, Canva, Notion, and others — if it's premium and shareable, it's probably on Q.",
    },
    {
        number: "04",
        question: "Is it safe to share subscriptions with strangers?",
        answer:
            "You pay your share, and Q handles the rest — no chasing people, no failed renewals. Everything is automated, transparent, and done in naira.",
    },
    {
        number: "05",
        question: "What happens if someone in my group stops paying?",
        answer:
            "Don't worry — Q covers it. We either replace them fast or pause the account until your group is stable again. You'll never be left hanging.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="lg:mx-30 mx-10">
            <div className="lg:flex py-10 gap-10">
                <h1 className="font-bold bg-[#EB4219] px-3 mb-3 rounded text-white w-max text-xl lg:text-3xl">
                    FAQ&apos;s
                </h1>
                <p>
                    Real users. Real savings. <br /> Real people. Real savings. Real Vibe.
                    See how others are winning with Q
                </p>
            </div>

            <div>
                {faqData.map((faq, index) => (
                    <div key={index} className="pb-5">
                        <div
                            className="flex items-center gap-5 justify-between pb-3 cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                        >
                            <h1 className="text-[#EB4219] font-bold lg:text-xl">
                                {faq.number}. {faq.question}
                            </h1>
                            <Image
                                alt="dropdown"
                                width={30}
                                height={30}
                                src={dropdown}
                                className={`transition-transform duration-300 ${openIndex === index ? "rotate-0" : "-rotate-90"
                                    }`}
                                style={{ color: "transparent" }}
                            />
                        </div>
                        <p
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                        >
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="lg:flex justify-between mt-15 lg:p-10 p-5 lg:gap-30 rounded-xl bg-[#EB4219]">
                <div>
                    <h1 className="text-white font-black pb-3 lg:text-3xl">
                        Ready to Stop Overpaying?
                    </h1>
                    <p className="text-white lg:text-xl text-sm pb-5 lg:pb-20">
                        Get access to premium services without breaking the bank. It&apos;s
                        fast, secure, and built for you.
                    </p>
                    <a
                        className="bg-[#F15716] lg:text-3xl text-white px-3 py-2 rounded font-black"
                        href="https://wa.me/message/CI6Z5JXNJ3NVM1"
                    >
                        JointheQueue
                    </a>
                </div>
                <Image
                    alt="image"
                    width={487}
                    height={418}
                    src={illustration}
                    className="w-[400] lg:pr-20 mt-10"
                    style={{ color: "transparent" }}
                />
            </div>
        </section>
    );
}
