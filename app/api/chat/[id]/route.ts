import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        console.log(id);

        if (typeof id !== "string") {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        const chat = await prisma.chat.findUnique({
            where: {
                id: id,
            },
        });

        let messages: OpenAI.Chat.Completions.ChatCompletionMessage[] = [];

        if (!chat) {
            return new NextResponse("Chat not found", { status: 404 });
        } else {
            const oldMessages = await prisma.message.findMany({
                where: {
                    chatId: id,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            messages = messages.concat(
                oldMessages.map((msg) => ({
                    role: msg.role as OpenAI.Chat.Completions.ChatCompletionRole,
                    content: msg.content,
                }))
            );
        }

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
