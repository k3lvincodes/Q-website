import Image from "next/image";
import linkArrow from "../../public/svg/Link.svg";

export default function HowItWorks() {
    return (
        <section id="how" className="lg:px-30 px-10 ">
            <div className="gap-20  ml-auto lg:items-center">
                <h1 className="font-bold bg-[#EB4219] h-max w-max px-2 lg:w-full text-white text-xl lg:text-3xl">
                    how it works
                </h1>
                <p className="text-gray-700 lg:w-[50rem] pt-5">
                    At Q, we don&apos;t just split subscriptions - we help you save smarter,
                    connect with trusted users, and unlock premium life without premium
                    prices.
                </p>
            </div>

            <div className=" lg:flex py-10 gap-10 mx-auto justify-center items-end">
                {/* Card 1 - Find your tribe */}
                <div className="bg-[#F15716] lg:h-[439] rounded-2xl p-10 lg:w-[398]">
                    <div>
                        <h1 className="font-bold  px-3 pb-1 rounded-sm text-[#EB4219] w-max bg-white h-max text-xl lg:text-3xl">
                            Find your tribe
                        </h1>
                        <p className="text-white pt-3">
                            Join or create a trusted group of verified users who want the same
                            subscription.
                        </p>
                    </div>
                    <Image
                        alt="arrow"
                        width={41}
                        height={41}
                        src={linkArrow}
                        className="lg:mt-50 mt-20"
                        style={{ color: "transparent" }}
                    />
                </div>

                <div className="lg:grid gap-10">
                    {/* Card 2 - Split the bill */}
                    <div className="bg-[#EB4219] lg:mt-0 mt-10 lg:ml-10 lg:-rotate-6 lg:h-[239] rounded-2xl p-10 lg:w-[543] w-full">
                        <div>
                            <h1 className="font-bold px-3 pb-1 rounded-sm text-[#EB4219] w-max bg-white h-max text-xl lg:text-3xl">
                                Split the bill
                            </h1>
                            <p className="text-white pt-3">
                                We handle the math (and the drama). Everyone pays their share, no
                                late payments, no awkward follow-ups.
                            </p>
                        </div>
                        <Image
                            alt="arrow"
                            width={41}
                            height={41}
                            src={linkArrow}
                            className="mt-10"
                            style={{ color: "transparent" }}
                        />
                    </div>

                    {/* Card 3 - Enjoy premium access */}
                    <div className="bg-white lg:mt-0 mt-10 border-black border-[.1rem] lg:h-[239] h-[300] rounded-2xl lg:p-10 px-5 py-10 w-full lg:w-[543]">
                        <div>
                            <h1 className="font-bold px-3 pb-1 rounded-sm text-white w-max bg-[#EB4219] h-max text-xl lg:text-3xl">
                                Enjoy premium access
                            </h1>
                            <p className="text-[#EB4219] pt-3">
                                Use the subscription as if you paid full price — because you kinda
                                did (just smarter).
                            </p>
                        </div>
                        <Image
                            alt="arrow"
                            width={41}
                            height={41}
                            src={linkArrow}
                            className="lg:mt-10 mt-20"
                            style={{ color: "transparent" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
