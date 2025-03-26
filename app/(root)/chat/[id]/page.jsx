// "use client";
// import { Send } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { getGeminiResponse } from "@/utils/utils";
// import Markdown from "react-markdown";
// import ChatLoader, { PreviousMessagesLoader } from "@/components/chat-loader";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { useParams } from "next/navigation";
// import axios from "axios";

// export default function Page() {
//     const { id } = useParams();
//     const [messages, setMessages] = useState([]);

//     const { register, handleSubmit, reset } = useForm();
//     const [chatLoader, setChatLoader] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const chatContainerRef = useRef(null);

//     // Scroll to bottom (only on user input)
//     const scrollToBottom = () => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTo({
//                 top: chatContainerRef.current.scrollHeight,
//                 behavior: "smooth",
//             });
//         }
//     };

//     // const onSubmit = async (data) => {
//     //     try {
//     //         const { message } = data;
//     //         const userMessage = { role: "user", parts: [{ text: message }] };

//     //         setMessages((prev) => [...prev, userMessage]);
//     //         reset();
//     //         setTimeout(scrollToBottom, 50);

//     //         setLoading(true);
//     //         const result = await getGeminiResponse(messages, message);

//     //         const modelMessage = {
//     //             role: "model",
//     //             parts: [
//     //                 {
//     //                     text: result.success
//     //                         ? result.geminiResponse
//     //                         : "Something went wrong!",
//     //                 },
//     //             ],
//     //         };
//     //         // Save to db

//     //         const res = await axios.post(`/api/conversations/${id}`, {
//     //             messages: [userMessage, modelMessage],
//     //         });
//     //         console.log(res.data)
//     //         setMessages((prev) => [...prev, modelMessage]);
//     //     } catch (err) {
//     //         console.log(err);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };
//     const onSubmit = async (data) => {
//         try {
//             const { message } = data;
//             const userMessage = { role: "user", parts: [{ text: message }] };

//             setMessages((prev) => [...prev, userMessage]);
//             reset();
//             setTimeout(scrollToBottom, 50);

//             setLoading(true);
//             const result = await getGeminiResponse(messages, message);
//             const modelMessage = {
//                 role: "model",
//                 parts: [
//                     {
//                         text: result.success
//                             ? result.geminiResponse
//                             : "Something went wrong!",
//                     },
//                 ],
//             };

//             const payload = { messages: [userMessage, modelMessage] };

//             const res = await axios.post(`/api/conversations/${id}`, payload);

//             if (res.status === 200) {
//                 setMessages((prev) => [...prev, modelMessage]);
//             } else {
//                 console.error("Save failed:", res.data);
//             }
//         } catch (err) {
//             console.error("Error:", err.response?.data || err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchMessages = async (id) => {
//         try {
//             const res = await axios.get(`/api/conversations/${id}`);
//             setMessages(res.data.messages);
//         } catch (err) {
//             console.log("error");
//             console.error(err);
//         } finally {
//             setChatLoader(false);
//         }
//     };

//     useEffect(() => {
//         id && fetchMessages(id);
//     }, [id]);

//     return (
//         <div className="h-full">
//             {/* Conversation Box */}

//             <div
//                 ref={chatContainerRef}
//                 className="h-[75vh] overflow-y-auto w-full overflow-x-hidden"
//             >
//                 {messages.length === 0 ? (
//                     <div className="text-3xl h-full flex items-center justify-center text-black font-semibold">
//                         {chatLoader ? (
//                             <PreviousMessagesLoader />
//                         ) : (
//                             "What can I help you with?"
//                         )}
//                     </div>
//                 ) : (
//                     <div className="max-w-[800px] mx-auto flex flex-col px-4 gap-3">
//                         {messages.map((message, index) => {
//                             const isUser = message.role === "user";
//                             return (
//                                 <div
//                                     key={index}
//                                     className={`text-[15px] ${
//                                         isUser
//                                             ? "bg-[#e9eef6] self-end px-4 py-2 max-w-[300px] text-wrap rounded-lg rounded-ee-none  break-words"
//                                             : "max-w-[300px] sm:max-w-[87%] text-wrap self-start my-3"
//                                     } leading-[27px] `}
//                                 >
//                                     <Markdown
//                                         components={{
//                                             code({
//                                                 inline,
//                                                 className,
//                                                 children,
//                                                 ...props
//                                             }) {
//                                                 const match =
//                                                     /language-(\w+)/.exec(
//                                                         className || ""
//                                                     );
//                                                 return !inline && match ? (
//                                                     <SyntaxHighlighter
//                                                         language={match[1]}
//                                                         PreTag="div"
//                                                         className="rounded-lg  p-2 my-2"
//                                                     >
//                                                         {String(
//                                                             children
//                                                         ).replace(/\n$/, "")}
//                                                     </SyntaxHighlighter>
//                                                 ) : (
//                                                     <code
//                                                         className="bg-[#f2f2f2a4] px-1.5 py-1 rounded-md text-sm "
//                                                         {...props}
//                                                     >
//                                                         {children}
//                                                     </code>
//                                                 );
//                                             },
//                                         }}
//                                     >
//                                         {message.parts[0].text}
//                                     </Markdown>
//                                 </div>
//                             );
//                         })}
//                         {loading && (
//                             <div className="self-start flex gap-2.5 items-center">
//                                 <ChatLoader />
//                                 <p className="font-light text-[14px] text-gray-400 animate-pulse">
//                                     Generating Response ...
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Input For Messages */}
//             <div className="max-w-[800px] mx-auto">
//                 <form
//                     onSubmit={handleSubmit(onSubmit)}
//                     className="flex items-center"
//                 >
//                     <input
//                         {...register("message")}
//                         placeholder="Enter your message"
//                         className="border w-full py-[9px] rounded-lg mt-3 px-4.5 pr-[55px] break-words text-wrap"
//                     />
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className={`${
//                             loading ? "bg-indigo-400" : "bg-[#615fff]"
//                         } w-[43px] h-[43px] rounded-lg flex justify-center items-center mt-[11px] cursor-pointer ms-[-43px]`}
//                     >
//                         {loading ? (
//                             <span className="relative flex size-3">
//                                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
//                                 <span className="relative inline-flex size-3 rounded-full bg-white"></span>
//                             </span>
//                         ) : (
//                             <Send color="white" size={19} />
//                         )}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


"use client";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import ChatLoader, { PreviousMessagesLoader } from "@/components/chat-loader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useParams } from "next/navigation";
import axios from "axios";
import { getGeminiResponse } from "@/utils/utils";

export default function Page() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [chatLoader, setChatLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Utility to transform flat messages from the server into a nested structure
  // for display (i.e. { role, text } becomes { role, parts: [{ text }] })
  const transformMessages = (msgs) => {
    return msgs.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));
  };

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Fetch messages from the server, then transform them for the UI
  const fetchMessages = async (conversationId) => {
    try {
      const res = await axios.get(`/api/conversations/${conversationId}`);
      // Server returns messages in flat format: { role, text }
      const transformedMessages = transformMessages(res.data.messages);
      setMessages(transformedMessages);
    } catch (err) {
      console.error("Error fetching messages", err);
    } finally {
      setChatLoader(false);
    }
  };

  useEffect(() => {
    if (id) fetchMessages(id);
  }, [id]);

  // onSubmit handler: builds flat messages for the server
  // and then converts to the nested structure for UI display.
  const onSubmit = async (data) => {
    try {
      const { message } = data;
      // Create a flat message object for the user
      const userMessageFlat = { role: "user", text: message };

      // Immediately update UI (using nested structure)
      setMessages((prev) => [
        ...prev,
        { role: "user", parts: [{ text: message }] },
      ]);
      reset();
      setTimeout(scrollToBottom, 50);

      setLoading(true);

      const result = await getGeminiResponse(messages, message);
      const modelText = result.success
        ? result.geminiResponse
        : "Something went wrong!";

      // Create a flat model message object for the server
      const modelMessageFlat = { role: "model", text: modelText };

      const payload = { messages: [userMessageFlat, modelMessageFlat] };

      const res = await axios.post(`/api/conversations/${id}`, payload);

      if (res.status === 200) {
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: modelText }] },
        ]);
      } else {
        console.error("Save failed:", res.data);
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      {/* Conversation Box */}
      <div
        ref={chatContainerRef}
        className="h-[75vh] overflow-y-auto w-full overflow-x-hidden"
      >
        {messages.length === 0 ? (
          <div className="text-3xl h-full flex items-center justify-center text-black font-semibold">
            {chatLoader ? (
              <PreviousMessagesLoader />
            ) : (
              "What can I help you with?"
            )}
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
                      ? "bg-[#e9eef6] self-end px-4 py-2 max-w-[300px] text-wrap rounded-lg rounded-ee-none break-words"
                      : "max-w-[300px] sm:max-w-[87%] text-wrap self-start my-3"
                  } leading-[27px]`}
                >
                  <Markdown
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg p-2 my-2"
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="bg-[#f2f2f2a4] px-1.5 py-1 rounded-md text-sm"
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
            className="border w-full py-[9px] rounded-lg mt-3 px-4.5 pr-[55px] break-words text-wrap"
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
