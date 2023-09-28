import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/lib/db";
import { checkUserApiLlimit, increateApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { message: userMessage, chatId, isCode } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!userMessage) {
            return new NextResponse("Message is required", { status: 400 });
        }

        const freeTrial = await checkUserApiLlimit();

        if (!freeTrial) {
            return new NextResponse("Free Trial Exhausted", { status: 403 });
        }

        let id;
        let messages: OpenAI.Chat.Completions.ChatCompletionMessage[] = [];

        if (chatId) {
            const chat = await prisma.chat.findUnique({
                where: {
                    id: chatId,
                    userId: userId,
                    isCode,
                },
            });
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

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
        });

        await increateApiLimit();

        if (!id) {
            const newChat = await prisma.chat.create({
                data: {
                    userId: userId,
                    isCode,
                    title: userMessage.content?.substring(0, 50) || "",
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

        await prisma.chat.update({
            where: {
                id,
            },
            data: {
                updatedAt: new Date(),
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
