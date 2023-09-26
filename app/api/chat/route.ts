import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/lib/db";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { message: userMessage, chatId, isCode } = body;

        console.log('[USER MESSAGE]', userMessage)
        console.log('[CHAT ID]', userMessage)
        console.log('[IS CODE]', isCode)

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!userMessage) {
            return new NextResponse("Message is required", { status: 400 });
        }

        let id;
        let messages: OpenAI.Chat.Completions.ChatCompletionMessage[] = [];

        console.log("CHAT ID", chatId);

        if (chatId) {
            const chat = await prisma.chat.findUnique({
                where: {
                    id: chatId,
                    userId: userId,
                    isCode,
                },
            });
            console.log("CHAT", chat);
            if (chat) {
                id = chat.id;
                const oldMessages = await prisma.message.findMany({
                    where: {
                        chatId: id,
                    },
                });
                console.log("[OLD MESSAGES]", oldMessages);
                // Merge oldMessages with the messages array
                messages = messages.concat(
                    oldMessages.map((msg) => ({
                        role: msg.role as OpenAI.Chat.Completions.ChatCompletionRole,
                        content: msg.content,
                    }))
                );
            }
        }

        messages = messages.concat([userMessage]);
        console.log("[MESSAGES]", messages);
        console.log("[USER MESSAGES]", userMessage);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
        });

        console.log("[RESPONSE]", response.choices[0].message);

        if (!id) {
            const newChat = await prisma.chat.create({
                data: {
                    userId: userId,
                    isCode,
                    title: userMessage.content?.substring(0, 20) || "",
                },
            });
            id = newChat.id;
        }

        await prisma.message.create({
            data: {
                content: userMessage.content || "",
                role: userMessage.role,
                chatId: id,
            },
        });
        await prisma.message.create({
            data: {
                content: response.choices[0].message.content || "",
                role: response.choices[0].message.role,
                chatId: id,
            },
        });

        const res = {
            message: response.choices[0].message,
            id,
        };

        return NextResponse.json(res, { status: 200 });
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
