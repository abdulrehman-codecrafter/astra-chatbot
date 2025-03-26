"use client"
import ConversationsContextProvider from "../contexts/conversationsContext";

export default function Providers({ children }) {
    return (
        <ConversationsContextProvider>{children}</ConversationsContextProvider>
    );
}
