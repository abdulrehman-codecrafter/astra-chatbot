"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const ConversationsContext = createContext();

const initialState = {
    conversations: [],
    loading: true,
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_CONVERSATIONS":
            return {
                ...state,
                conversations: payload,
                loading: false,
            };
        case "ADD_CONVERSATION":
            return {
                ...state,
                conversations: [payload, ...state.conversations],
            };
        case "UPDATE_CONVERSATION":
            console.log(payload);
            return {
                ...state,
                conversations: state.conversations.map((convo) => {
                    console.log(payload);
                    return convo._id === payload._id
                        ? {
                              ...convo,
                              conversationName: payload.conversationName,
                          }
                        : convo;
                }),
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: payload,
            };
        default:
            return state;
    }
};
export default function ConversationsContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchConversations = async () => {
        try {
            const res = await axios.get("/api/conversations");
            if (res.data) {
                dispatch({
                    type: "SET_CONVERSATIONS",
                    payload: res.data,
                });
            }
        } catch (err) {
            console.error("Error creating conversation:", err);
        }
    };

    const user = useAuth();

    useEffect(() => {
        user && fetchConversations();
    }, []);

    console.log(state);
    return (
        <ConversationsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ConversationsContext.Provider>
    );
}

export const useConversationContext = () => useContext(ConversationsContext);
