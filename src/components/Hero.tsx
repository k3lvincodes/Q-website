import Image from "next/image";
import illustration from "../../public/svg/Illustration.svg";

export default function Hero() {
    return (
        <div className="lg:flex gap-5 lg:gap-0 grid lg:justify-between lg:text-left text-center lg:px-30 px-10 pt-0 lg:pt-10 pb-20 items-center">
            <div className="gap-5 grid">
                <h1 className="font-black lg:text-5xl text-3xl text-black">
                    Split the bill. <br />
                    {"  "}Stay premium. <br />
                    {" "}Spend less.{" "}
                </h1>
                <p className="text-gray-700 lg:w-[25rem]">
                    Q lets you securely share and split the cost of premium subscriptions
                    like Netflix, Spotify, Canva &amp; more — all from one trusted platform.
                </p>
                <a
                    href="https://wa.me/message/CI6Z5JXNJ3NVM1"
                    className="bg-[#EB4219] lg:mx-0 mx-auto w-max font-black text-white px-5 py-3 rounded-2xl"
                >
                    JointheQueue
                </a>
            </div>
            <Image
                alt="hero"
                width={487}
                height={418}
                src={illustration}
                className="mx-auto lg:mx-0"
                style={{ color: "transparent" }}
            />
        </div>
    );
}
