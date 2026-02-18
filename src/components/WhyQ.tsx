import Image from "next/image";
import illustration1 from "../../public/svg/Illustration(1).svg";

export default function WhyQ() {
    return (
        <section className="lg:flex lg:mx-30 mx-10 lg:gap-50 py-10 justify-between items-center">
            <div>
                <h1 className="font-bold  text-xl pb-3">WHY Q?</h1>
                <p>
                    Built for trust. Powered by tech. <br /> <br /> Q makes premium
                    subscriptions affordable by letting you securely share and split costs
                    with verified users. No stress, no strangers — just smart savings on
                    services you already love. Whether you&apos;re a student, creative, or
                    hustler, Q helps you access more for less.
                </p>
            </div>
            <Image
                alt="image"
                width={359}
                height={395}
                src={illustration1}
                style={{ color: "transparent" }}
            />
        </section>
    );
}
