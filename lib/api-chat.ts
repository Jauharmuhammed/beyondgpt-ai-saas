import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";

type messages = {
    id: string;
    role: "function" | "system" | "user" | "assistant";
    content: string;
}[];

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
                id: msg.id,
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
            Message: {
                some: {
                    id: { not: "" },
                },
            },
        },
        orderBy: {
            messageUpdatedAt: "desc",
        },
    });

    return chats;
};

export const createNewChat = async () => {
    const { userId } = auth();

    if (!userId) return { id: "" };

    const oldEmptyChat = await prisma.chat.findFirst({
        where: {
            userId,
            title: "",
            Message: {
                every: {
                    id: {
                        equals: "",
                    },
                },
            },
        },
    });

    if (oldEmptyChat) {
        return await prisma.chat.update({
            where: {
                id: oldEmptyChat.id,
            },
            data: {
                createdAt: new Date(),
            },
        });
    }

    const chat = await prisma.chat.create({
        data: {
            userId,
            title: "",
        },
    });

    return chat;
};

export const getLastChat = async () => {
    const { userId } = auth();

    if (!userId) return {id:''};

    const lastChat = await prisma.chat.findFirst({
        where: {
            userId,
            Message: {
                some: {
                    id: { not: "" },
                },
            },
        },
        orderBy: {
            messageUpdatedAt: "desc",
        },
    });

    return lastChat;
};
