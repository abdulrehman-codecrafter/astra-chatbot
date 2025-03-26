import { NextResponse } from "next/server";
import Conversation from "../../../../models/conversation-modal"; // Ensure correct filename
import dbConnect from "@/lib/mongodb";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params

        const conversation = await Conversation.findById(id);

        if (!conversation) {
            return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
        }

        return NextResponse.json({ messages: conversation.messages, conversationName: conversation.conversationName }, { status: 200 });
    } catch (error) {
        console.error("Error fetching conversation:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch conversation", details: error.message },
            { status: 500 }
        );
    }
}



export async function PATCH(req, { params }) {
    try {
        await dbConnect();

        const { id } = await params
        if (!id) {
            return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
        }

        const requestBody = await req.json(); //Await the JSON parsing
        const newName = requestBody.newName;

        if (!newName) {
            return NextResponse.json({ error: "Missing newName in request body" }, { status: 400 });
        }


        const conversation = await Conversation.findByIdAndUpdate(id, { conversationName: newName }, { new: true, select: '_id conversationName updatedAt' });

        if (!conversation) {
            return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
        }

        return NextResponse.json({ conversation }, { status: 200 }); // Return the updated conversation

    } catch (error) {
        console.error("Error updating conversation:", error.message);
        return NextResponse.json({ error: "Failed to update conversation", details: error.message }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const { messages } = await req.json(); // Expect messages in the flat format
        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
        }

        const conversation = await Conversation.findById(id);
        if (!conversation) {
            return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
        }

        // Save each message with a simple text field
        await Conversation.findByIdAndUpdate(
            id,
            { $push: { messages: { $each: messages } } },
            { new: true, upsert: true, runValidators: true }
        );

        return NextResponse.json({ successMsg: "Saved Successfully" }, { status: 200 });
    } catch (err) {
        console.error("Error adding message:", err.message);
        return NextResponse.json({ err: "Failed to add message", details: err.message }, { status: 500 });
    }
}
