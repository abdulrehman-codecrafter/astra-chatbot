"use client";
import { AuroraText } from "@/components/magicui/aurora-text";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import GetStartedButton from "@/components/get-started-btn";
import { useRouter } from "next/navigation";
import axios from "axios"
import { useState } from "react";
import { useConversationContext } from "@/contexts/conversationsContext";

export default function Page() {
    const router=useRouter()
    const [loading,setLoading]=useState(false)
    const {dispatch}=useConversationContext()

    const startNewChat = async () => {
        try {
            setLoading(true)
            const res = await axios.post("/api/conversations");
            console.log(res.data)

            if (res.data._id) {
                console.log(res.data)
                router.push(`/chat/${res.data._id}`); // Navigate to new chat
                dispatch({type:"ADD_CONVERSATION",payload:res.data})
            }
        } catch (err) {
            console.error("Error creating conversation:", err);
        }finally{
            setLoading(false)
        }
    };
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
            <div onClick={startNewChat} className="flex justify-center mt-16">
                <GetStartedButton isLoading={loading}/>
            </div>
        </div>
    );
}
