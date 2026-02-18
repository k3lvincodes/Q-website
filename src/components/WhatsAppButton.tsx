import Image from "next/image";
import whatsappIcon from "../../public/svg/whatsapp.svg";

export default function WhatsAppButton() {
    return (
        <div>
            <a href="https://wa.me/message/CI6Z5JXNJ3NVM1">
                <Image
                    alt="whatsapp"
                    width={256}
                    height={256}
                    src={whatsappIcon}
                    className="w-[3rem] fixed bottom-10 right-10"
                    style={{ color: "transparent" }}
                />
            </a>
        </div>
    );
}
