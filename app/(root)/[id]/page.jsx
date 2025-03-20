"use client";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const initialState = [
    // {
    //     role: "",
    //     text: "",
    // },
];
export default function Page() {
    // Params
    const { id } = useParams();

    //
    const [messages, setMessages] = useState(initialState);

    // React Hook Form
    const { register, handleSubmit,reset  } = useForm();

    // Submit Handler
    const onSubmit = (data) => {
        const { message } = data;
        setMessages([...messages,message])
        reset();
    };

    return (
        <div className="h-full ">
            {/* Conversation Box */}
            <div className="h-[80vh] overflow-y-auto w-full">
                {messages.length === 0 ? (
                    <div className="text-3xl h-full flex items-center justify-center text-black font-semibold ">What i can help you with ?</div>
                ) : (
                    <div className="max-w-[800px] mx-auto flex flex-col px-4">
                        {
                            messages.map((message)=>{
                                return(
                                    <p key={message} className=" text-[15px]">{message}</p>
                                )
                            })
                        }
                    </div>
                )}
            </div>
            {/* Input For Messages */}
            <div className="max-w-[800px] mx-auto ">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-1.5 items-center"
                >
                    <input
                        {...register("message")}
                        placeholder="Enter your message"
                        className="border w-full py-[9px] rounded-lg mt-3 px-4.5"
                    />
                    <button
                        type="submit"
                        className="bg-[#615fff] px-2 w-[42px] h-[42px] rounded-lg flex justify-center items-center mt-[9px] cursor-pointer"
                    >
                        <Send color="white" size={19} className="" />
                    </button>
                </form>
            </div>
        </div>
    );
}
