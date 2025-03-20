"use client";
import { AuroraText } from "@/components/magicui/aurora-text";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import GetStartedButton from "@/components/get-started-btn";
import Link from "next/link";
export default function Page() {
    return (
        <div className="py-6 px-2 md:p-10 flex flex-col  h-full">
            <div>
                <h1 className="text-4xl font-bold tracking-wide text-center ">
                    Welcome to <AuroraText>AstraBot</AuroraText>
                </h1>
                <p className="text-gray-400 text-center mt-4">
                    Your Personalized AI Assistant
                </p>
                <div className="w-full md:max-w-[600px] mx-auto mt-14 md:mt-12">
                    <DotLottieReact
                        src="assets/animations/welcome.json"
                        loop
                        autoplay
                    />
                </div>
            </div>
            <Link href="/21312" className="flex justify-center mt-16">
                <GetStartedButton />
            </Link>
        </div>
    );
}
