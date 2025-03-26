import React from "react";

export default function ChatLoader() {
    return (
        <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </div>
    );
}

export function ConversationLoader() {
    return <div className="chaotic-orbit mt-1"></div>;
}
export function PreviousMessagesLoader() {
    return (
        <div className="loader">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
            
        </div>
    );
}
