"use client";
import { Loader, Send } from "lucide-react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { getGeminiResponse } from "@/utils/utils";
import Markdown from "react-markdown";
import ChatLoader from "@/components/chat-loader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function Page() {
    const [messages, setMessages] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // Scroll to bottom (only on user input)
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const onSubmit = async (data) => {
        try {
            const { message } = data;
            const userMessage = { role: "user", parts: [{ text: message }] };

            setMessages((prev) => [...prev, userMessage]);
            reset();
            setTimeout(scrollToBottom, 50);

            setLoading(true);
            const result = await getGeminiResponse(messages, message);

            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    parts: [
                        {
                            text: result.success
                                ? result.geminiResponse
                                : "Something went wrong!",
                        },
                    ],
                },
            ]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full">
            {/* Conversation Box */}
            <div
                ref={chatContainerRef}
                className="h-[80vh] overflow-y-auto w-full overflow-x-hidden"
            >
                {messages.length === 0 ? (
                    <div className="text-3xl h-full flex items-center justify-center text-black font-semibold">
                        What can I help you with?
                    </div>
                ) : (
                    <div className="max-w-[800px] mx-auto flex flex-col px-4 gap-3">
                        {messages.map((message, index) => {
                            const isUser = message.role === "user";
                            return (
                                <div
                                    key={index}
                                    className={`text-[15px] ${
                                        isUser
                                            ? "bg-[#e9eef6] self-end px-4 py-2 max-w-[300px] text-wrap rounded-lg rounded-ee-none"
                                            : "max-w-[300px] sm:max-w-[87%] text-wrap self-start my-3"
                                    } leading-[27px] `}
                                >
                                    <Markdown
                                        components={{
                                            code({
                                                inline,
                                                className,
                                                children,
                                                ...props
                                            }) {
                                                const match =
                                                    /language-(\w+)/.exec(
                                                        className || ""
                                                    );
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="rounded-lg  p-2 "
                                                    >
                                                        {String(
                                                            children
                                                        ).replace(/\n$/, "")}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code
                                                        className="bg-[#f5f5f5] px-1.5 py-1 rounded-md text-sm border border-gray-300"
                                                        {...props}
                                                    >
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}
                                    >
                                        {message.parts[0].text}
                                    </Markdown>
                                </div>
                            );
                        })}
                        {loading && (
                            <div className="self-start flex gap-2.5 items-center">
                                <ChatLoader />
                                <p className="font-light text-[14px] text-gray-400 animate-pulse">
                                    Generating Response ...
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Input For Messages */}
            <div className="max-w-[800px] mx-auto">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center"
                >
                    <input
                        {...register("message")}
                        placeholder="Enter your message"
                        className="border w-full py-[9px] rounded-lg mt-3 px-4.5"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${
                            loading ? "bg-indigo-400" : "bg-[#615fff]"
                        } w-[43px] h-[43px] rounded-lg flex justify-center items-center mt-[11px] cursor-pointer ms-[-43px]`}
                    >
                        {loading ? (
                            <span className="relative flex size-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex size-3 rounded-full bg-white"></span>
                            </span>
                        ) : (
                            <Send color="white" size={19} />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
