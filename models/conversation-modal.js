import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: {
        type: String
    },
    text: {
        type: String
    }
})

const conversationSchema = new mongoose.Schema({
    participantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messages: [messageSchema]
}, { timestamps: true })


const Conversation=mongoose.models.Conversation || mongoose.model("Conversation",conversationSchema)