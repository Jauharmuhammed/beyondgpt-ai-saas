import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import second from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!messages) {
            return new NextResponse("Message is required", { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
        });

        return NextResponse.json(response.choices[0].message, { status: 200 });
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error("[OPENAI_API_ERROR]", error.message);
        } else {
            // Non-API error
            console.log("[CHAT_ERROR]", error);
            return new NextResponse("Internal Sever Error", { status: 500 });
        }
    }
}
