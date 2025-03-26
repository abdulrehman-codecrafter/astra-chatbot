import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";
import dbConnect from './mongodb';
import User from "@/models/user-model"

export async function getLoggedUser() {
    try {
        const user=await currentUser()
            

        if (!user.id) {
            console.warn("User not authenticated");
            return { error: NextResponse.json({ message: "User not authenticated" }, { status: 401 }) };
        }


        await dbConnect();

        const loggedUser = await User.findOne({ clerkId: user.id }).exec();

        if (!loggedUser) {
            console.error("User not found in database:");
            return { error: NextResponse.json({ message: "User not found" }, { status: 404 }) };
        }

        return { loggedUser };

    } catch (error) {
        console.error("Authentication error:", error);
        return { error: NextResponse.json({ message: "Authentication failed" }, { status: 500 }) };
    }
}