import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";

type messages = {
    id: string,
    role: "function" | "system" | "user" | "assistant",
    content: string
}[]

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

    let messages: messages = [];

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
                id:msg.id,
                role: msg.role as "function" | "system" | "user" | "assistant",
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
