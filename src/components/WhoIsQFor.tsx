import Image from "next/image";
import you from "../../public/svg/you.svg";
import riderezzy from "../../public/svg/Riderezzy 2.svg";
import keil from "../../public/svg/Friendly Man with Glasses.svg";

export default function WhoIsQFor() {
    return (
        <section className="lg:mx-30 mx-10 grid ">
            <div>
                <div className="lg:flex py-10 gap-10">
                    <h1 className="font-bold bg-[#EB4219] px-3 mb-3 text-white w-max text-xl lg:text-3xl">
                        WHO IS Q FOR
                    </h1>
                    <p className="text-sm">
                        If you&apos;ve ever asked, &quot;Who wants to share this
                        subscription?&quot; - Q is built for you.
                    </p>
                </div>
                <Image
                    alt="you"
                    width={986}
                    height={635}
                    src={you}
                    className="w-11/12"
                    style={{ color: "transparent" }}
                />
            </div>

            <div>
                <div className="lg:flex items-center gap-10 py-10 mt-10">
                    <h1 className="font-bold h-max bg-[#EB4219] px-3 mb-3 text-white w-max text-xl lg:text-3xl">
                        SOCIAL PROOF
                    </h1>
                    <p>
                        Real users. Real savings. <br /> Real people. Real savings. Real
                        Vibe. See how others are winning with Q
                    </p>
                </div>

                <div className="lg:flex justify-between">
                    {/* Testimonial 1 */}
                    <div className="bg-[#EB4219] rounded-2xl flex justify-between mb-10 lg:gap-30 gap-10 p-5 lg:w-[400] h-[300 ]">
                        <div>
                            <h1 className="font-bold rounded-xl px-3 mb-5 bg-white text-[#EB4219] w-max text-xl">
                                Riderezzy
                            </h1>
                            <p className="text-white">
                                &ldquo;I used to pay ₦4k/month for Spotify alone. Now I pay ₦1k and
                                get even more. Q is a lifesaver.&rdquo;
                            </p>
                        </div>
                        <Image
                            alt="Riderezzy"
                            width={100}
                            height={100}
                            src={riderezzy}
                            className="lg:w-[60] w-[40]"
                            style={{ color: "transparent" }}
                        />
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-[#EB4219] rounded-2xl flex justify-between mb-10 lg:gap-30 gap-10 p-5 lg:w-[400] h-[300 ]">
                        <div>
                            <h1 className="font-bold rounded-xl px-3 mb-5 bg-white text-[#EB4219] w-max text-xl">
                                Keil
                            </h1>
                            <p className="text-white">
                                &ldquo;Shared Canva Pro with my design team. Smoothest split ever.&rdquo;
                            </p>
                        </div>
                        <Image
                            alt="Keil"
                            width={100}
                            height={100}
                            src={keil}
                            className="lg:w-[60] w-[40]"
                            style={{ color: "transparent" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
