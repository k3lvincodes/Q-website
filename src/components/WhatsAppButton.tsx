import Image from "next/image";
import whatsappIcon from "../../public/svg/whatsapp.svg";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/message/CI6Z5JXNJ3NVM1"
            className="fixed bottom-5 right-5 lg:bottom-10 lg:right-10 z-30"
        >
            <Image
                alt="whatsapp"
                width={256}
                height={256}
                src={whatsappIcon}
                className="w-[2.5rem] lg:w-[3rem]"
                style={{ color: "transparent" }}
            />
        </a>
    );
}
