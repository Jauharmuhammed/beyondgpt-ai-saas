"use client";

import { useEffect, useRef, useState } from "react";

import { SendHorizonal } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useParams, usePathname } from "next/navigation";

import Empty from "@/components/empty";
import Loader from "@/components/loader";
import Message from "@/components/message";
import { useAuth } from "@clerk/nextjs";
import { useProModal } from "@/hooks/use-pro-modal";
import { getMessages } from "@/lib/api-chat";
import toast from "react-hot-toast";
import { Message as MessageType, useChat } from "ai/react";

const ChatPage = () => {
    const router = useRouter();
    const params = useParams();
    const chatId = params.chatId || "";
    const pathname = usePathname();
    const proModal = useProModal();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [initialMessage, setInitialMessage] = useState<MessageType[]>([]);

    const [isCode, setIsCode] = useState(pathname.includes("code"));

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
        body: {
            chatId,
            isCode,
        },
        initialMessages: initialMessage || [],
        onError: (error: Error) => {
            if (error.message === "Free Trial Exhausted") {
                proModal.open();
            }
        },
        onResponse: (response: Response) => {
            console.log(response.statusText);
            const uuidPattern =
                /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

            const inputString = response.statusText;

            if (uuidPattern.test(inputString)) {
                if (!pathname.includes(inputString)) {
                    router.push(`/chat/${response.statusText}`);
                }
            }
        },
        onFinish: (message: MessageType) => {
            router.refresh();
        },
    });

    const firstChatItem = params.chat?.[0];

    if (firstChatItem && firstChatItem !== "chat" && firstChatItem !== "code") {
        router.push("/");
    }

    const { userId } = useAuth();
    const [isPromptEmpty, setIsPromptEmpty] = useState<boolean>(true);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        window.scrollTo({
            behavior: "smooth",
            top: document.body.scrollHeight,
        });
    };

    useEffect(() => {
        if (messages[messages.length - 1]?.role === "user") {
            scrollToBottom();
        }
    }, [messages]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(chatId);
                const response = await axios.get(`/api/chat/${chatId}`);
                const data = response.data;
                setInitialMessage(data);
            } catch (err: any) {
                if (axios.isAxiosError(err)) {
                    if (err?.response?.data === "Chat not found") {
                        toast.error("Uh oh! Unable to find chat.");
                    }
                } else {
                    toast.error("Uh oh! Something went wrong");
                    console.log("[CHAT_DATA_FETCH_ERROR]", err);
                }
                router.push("/");
            }
        };

        if (chatId) {
            fetchData();
        }
    }, [chatId, router]);

    // Manualy Handling the onChange of propt to style the submit button
    useEffect(() => {
        if (input === "") {
            setIsPromptEmpty(true);
        } else {
            setIsPromptEmpty(false);
        }
    }, [input]);

    // Function to submit form when Enter key is pressed and the Shift key is not held down (to allow for multiline input),
    const handleEnterKeyDown = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent the newline character from being added
            handleSubmit(e); // Submit the form
        }
    };

    return (
        <div className="flex flex-col h-full w-full items-center justify-between">
            {messages.length === 0 ? (
                <Empty />
            ) : (
                <div className="w-full flex flex-col items-center h-full mt-12 md:mt-0">
                    {messages.map((message, index) => (
                        <Message id={`message-${index}`} key={index} message={message} />
                    ))}
                    {messages[messages.length - 1].role === "user" && <Loader />}
                    <div
                        ref={bottomRef}
                        className="bg-slate-925 w-full h-full min-h-[8rem] md:min-h-[10rem] mt-auto"></div>
                </div>
            )}
            <div className="fixed bottom-0 left-0 md:left-80 right-0 z-20 bg-gradient-to-b from-transparent via-slate-925 to-slate-925 flex flex-col justify-end items-center h-32 md:h-40 py-3 md:py-10 px-3 md:px-4">
                <div className="w-full max-w-2xl relative">
                    <form
                        onSubmit={handleSubmit}
                        onKeyDown={handleEnterKeyDown}
                        className="rounded-sm absolute bottom-0 md:bottom-1 w-full ps-2 py-1 pe-1 md:ps-3 bg-slate-300 focus-within:shadow-sm flex gap-1">
                        <TextareaAutosize
                            maxRows={10}
                            value={input}
                            className="w-full py-2 border-0 outline-none text-slate-900 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                            placeholder="Send a message"
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            disabled={isPromptEmpty}
                            variant="link"
                            className={cn("mt-auto duration-500 w-10 h-10 p-2", {
                                "bg-slate-800": !isPromptEmpty,
                            })}>
                            <SendHorizonal
                                className={cn("text-slate-500", {
                                    "text-slate-300": !isPromptEmpty,
                                })}
                                strokeWidth={1.5}
                            />
                        </Button>
                    </form>
                </div>
                <p className="text-xs mt-2 text-center text-slate-500">
                    BeyondGPT may produce inaccurate information about people, places, or facts.
                </p>
            </div>
        </div>
    );
};

export default ChatPage;
