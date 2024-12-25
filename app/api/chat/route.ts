import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkUserApiLlimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages, chatId, isCode } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userMessage = messages[messages.length - 1];

        if (!userMessage) {
            return new NextResponse("Message is required", { status: 400 });
        }

        const [freeTrial, isPro] = await Promise.all([checkUserApiLlimit(), checkSubscription()]);

        if (!freeTrial && !isPro) {
            return new NextResponse("Free Trial Exhausted", { status: 403 });
        }

        let id: string | null = null;

        if (chatId && typeof chatId === "string") {
            const chat = await prisma.chat.findUnique({
                where: {
                    id: chatId,
                    userId: userId,
                },
            });
            if (chat?.title === "") {
                await prisma.chat.update({
                    where: {
                        id: chat.id,
                    },
                    data: {
                        isCode,
                        title: userMessage.content?.substring(0, 50) || "",
                    },
                });
            }
            id = chat?.id || null;
        }

        if (!id) {
            const newChat = await prisma.chat.create({
                data: {
                    id: chatId,
                    userId: userId,
                    isCode,
                    title: userMessage.content?.substring(0, 50) || "",
                },
            });

            id = newChat.id;
        }

        let response;
        try {
            response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages,
                stream: true,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (response.status === 429) {
                    return new NextResponse(
                        "You have reached your API limit for today. Please try again later or upgrade to the pro plan.", 
                        { status: 429 }
                    );
                }
                return new NextResponse(
                    errorData.error?.message || "OpenAI API error", 
                    { status: response.status }
                );
            }

        } catch (error: any) {
            console.error("[OPENAI_ERROR]", error);
            if (error?.error?.code === "insufficient_quota" || error?.status === 429) {
                return new NextResponse(
                    "You have reached your API limit for today. Please try again later or upgrade to the pro plan.",
                    { status: 429 }
                );
            }
            return new NextResponse("OpenAI API error", { status: 500 });
        }

        const stream = OpenAIStream(response, {
            async onCompletion(completion) {
                try {
                    await increaseApiLimit();

                    await prisma.message.create({
                        data: {
                            content: userMessage.content || "",
                            role: userMessage.role,
                            chatId: id!,
                        },
                    });

                    await prisma.message.create({
                        data: {
                            content: completion || "",
                            role: "assistant",
                            chatId: id!,
                        },
                    });

                    await prisma.chat.update({
                        where: {
                            id: id!,
                        },
                        data: {
                            messageUpdatedAt: new Date(),
                        },
                    });
                } catch (error) {
                    console.error("[STREAM_ERROR]", error);
                    throw error;
                }
            },
        });

        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error("[CHAT_ERROR]", error);
        return new NextResponse(
            error instanceof Error ? error.message : "Internal Server Error", 
            { status: 500 }
        );
    }
}
