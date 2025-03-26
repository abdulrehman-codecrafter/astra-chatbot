import mongoose from "mongoose";


const conversationSchema = new mongoose.Schema({
    participantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    conversationName: {
        type: String,
        default: "New Conversation"
    }
    ,
    messages: [{
        role: {
            type: String
        },
        text: {  // Store just a simple text string
            type: String
        }
    }]
}, { timestamps: true })


const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema)

export default Conversation