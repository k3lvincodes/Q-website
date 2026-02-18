import Image from "next/image";
import Link from "next/link";
import logo2 from "../../public/svg/logo2.svg";
import xIcon from "../../public/svg/x.svg";
import telegramIcon from "../../public/svg/telegram.svg";
import instagramIcon from "../../public/svg/instagram.svg";
import tiktokIcon from "../../public/svg/tiktok.svg";

export default function Footer() {
    return (
        <footer className="bg-[#F15716] text-white lg:px-30 mt-20 py-10 lg:py-20 px-10 lg:flex justify-between">
            <div>
                <div className="flex lg:gap-10 gap-5 items-center">
                    <Image
                        alt="logo"
                        width={258}
                        height={260}
                        src={logo2}
                        className="lg:w-[10rem] w-[5rem]"
                        style={{ color: "transparent" }}
                    />
                    <h1 className="font-black text-black text-5xl lg:text-[7rem]">
                        jointheQ
                    </h1>
                </div>
                <p className=" hidden lg:flex pt-10">
                    © 2025, Q by Cratebux.  terms &amp; privacy policy
                </p>
            </div>

            <div>
                <div className="grid lg:text-xl mt-10 lg:mt-0 font-bold gap-3">
                    <Link href="#how">How it works</Link>
                    <Link href="">Blog</Link>
                    <Link href="#faq">FAQs</Link>
                    <Link href="">Contact Us</Link>
                    <Link href="">Join the Qrew</Link>
                </div>

                <div className="flex items-center gap-5 pt-10">
                    <a href="https://x.com/joinqueue?t=niwyNv7AEEJS1en-WbhxIw&s=09">
                        <Image alt="x" width={20} height={17} src={xIcon} style={{ color: "transparent" }} />
                    </a>
                    <a href="">
                        <Image alt="telegram" width={23} height={25} src={telegramIcon} style={{ color: "transparent" }} />
                    </a>
                    <a href="https://www.instagram.com/joinq.ng?igsh=MWt3b2VuOWphcXJxMA==">
                        <Image alt="instagram" width={20} height={20} src={instagramIcon} style={{ color: "transparent" }} />
                    </a>
                    <a href="https://www.tiktok.com/@jointheq?_t=ZM-8zm7GCE40xk&_r=1">
                        <Image alt="tiktok" width={16} height={19} src={tiktokIcon} style={{ color: "transparent" }} />
                    </a>
                </div>
            </div>

            <p className=" lg:hidden text-sm pt-10">
                © 2025, Q by Cratebux.  terms &amp; privacy policy
            </p>
        </footer>
    );
}
