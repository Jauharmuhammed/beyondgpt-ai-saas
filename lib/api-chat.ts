import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";

export const getMessages = async (id: string) => {
    const { userId } = auth();

    if (!userId || !id) {
        return [];
    }

    const chat = await prisma.chat.findUnique({
        where: {
            id,
            userId,
        },
    });

    let messages: OpenAI.Chat.Completions.ChatCompletionMessage[] = [];

    if (chat) {
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

    return messages;
};

export const getChats = async () => {
    const { userId } = auth();

    if (!userId) return [];

    const chats = await prisma.chat.findMany({
        where: {
            userId,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });

    return chats;
};
