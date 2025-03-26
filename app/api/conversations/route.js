import dbConnect from "@/lib/mongodb";
import Conversation from "../../../models/conversation-modal";
import { NextResponse } from "next/server";
import { getLoggedUser } from "@/lib/getUser";

export async function POST() {
    try {
        const { loggedUser, error } = await getLoggedUser();
        if (error) return error;
        await dbConnect();
        const newConversation = new Conversation({
            participantId: loggedUser._id,
            messages: []
        });
        await newConversation.save();
        return NextResponse.json({ _id: newConversation._id, conversationName: newConversation.conversationName, updatedAt: newConversation.updatedAt }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const { loggedUser, error } = await getLoggedUser();
        if (error) return error;

        const conversations = await Conversation.find({ participantId: loggedUser._id }, '_id conversationName updatedAt').sort({ updatedAt: -1 });
        return NextResponse.json(conversations, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
    }
}