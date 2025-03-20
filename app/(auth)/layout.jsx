import Image from "next/image";
import React from "react";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen">
            <section className="bg-[#79aad2] hidden w-1/2  justify-center lg:flex xl:w-2/5">
                <div className="max-h-[800px] max-w-[430px] flex flex-col justify-center">
                    <Image
                        src="/assets/images/logo.png"
                        alt="logo"
                        width={224}
                        height={82}
                        className="h-auto mt-[-40px]"
                    />
                    <div className="space-y-5 mt-8 text-white">
                        <h1 className="text-2xl font-bold">
                            Your celestial guide to smarter conversations and
                            cosmic insights
                        </h1>
                        <p className="body-1">
                            Built with advanced AI, Astra orbits around your
                            questions, delivering sharp answers, creative ideas,
                            and a dash of starry wit. Perfect for exploring the
                            unknown or tackling everyday queries with a galactic
                            edge
                        </p>
                    </div>

                    
                </div>
            </section>

            <section className="flex flex-1 flex-col items-center justify-center bg-white  sm:p-4  py-10 lg:justify-center lg:p-10 lg:py-0">
                {children}
            </section>
        </div>
    );
}
