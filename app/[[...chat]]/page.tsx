"use client";

import { useEffect, useRef, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SendHorizonal } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formSchema } from "./constants";
import { useRouter, useParams, usePathname } from "next/navigation";

import Empty from "@/components/empty";
import Loader from "@/components/loader";
import Message from "@/components/message";
import { useAuth } from "@clerk/nextjs";
import { useChat } from "@/contexts/chat-context";

const ChatPage = () => {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const chatId = params.chat?.[1] || "";

    const [isCode, setIsCode] = useState(params.chat?.[0] === "code");

    const { userId } = useAuth();
    const [isPromptEmpty, setIsPromptEmpty] = useState<boolean>(true);
    const { messages, setMessages } = useChat();

    const bottomRef = useRef<HTMLDivElement | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const scrollToBottom = () => {
        window.scrollTo({
            behavior: "smooth",
            top: document.body.scrollHeight,
        });
    };

    useEffect(() => {
        console.log(messages.length);
        scrollToBottom();
    }, [messages]);

    const fetchData = async () => {
        try {
            console.log(chatId);
            const response = await axios.get(`/api/chat/${chatId}`);
            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }
            const data = response.data;
            setMessages(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (chatId) {
            fetchData();
        }
    }, [chatId]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (!userId) return;

            const userMessage = {
                role: "user",
                content: values.prompt,
            };
            setMessages((current) => [...current, userMessage]);
            // scrollToBottom();

            const response = await axios.post("../api/chat", {
                message: userMessage,
                chatId,
                isCode,
            });

            if (!chatId) {
                router.push(`${isCode ? "code" : "chat"}/${response.data.id}`);
            }

            console.log("[response]", response.data.message);

            setMessages((current) => [...current, response.data.message]);
            // scrollToBottom();

            form.reset();
        } catch (error: any) {
            // TODO: Open Pro Modal
            console.log(error);
        } finally {
            router.refresh();
            if (!userId) {
            }
        }
    };

    // Manualy Handling the onChange of propt to style the submit button
    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
        onChange: (value: string) => void
    ) => {
        if (event.target.value === "") {
            setIsPromptEmpty(true);
        } else {
            setIsPromptEmpty(false);
        }
        onChange(event.target.value);
    };

    // Function to submit form when Enter key is pressed and the Shift key is not held down (to allow for multiline input),
    const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent the newline character from being added
            form.handleSubmit(onSubmit)(); // Submit the form
        }
    };

    return (
        <div className="flex flex-col h-full w-full items-center justify-between">
            {messages.length === 0 ? (
                <Empty />
            ) : (
                <div className="w-full flex flex-col items-center h-full">
                    {messages.map((message, index) => (
                        <Message id={`message-${index}`} key={index} message={message} />
                    ))}
                    {isLoading && <Loader />}
                    <div
                        ref={bottomRef}
                        className="bg-slate-925 w-full h-full min-h-[8rem] md:min-h-[10rem] mt-auto"></div>
                </div>
            )}
            <div className="fixed bottom-0 left-0 md:left-72 right-0 bg-gradient-to-b from-transparent via-slate-925 to-slate-925 flex flex-col justify-end items-center h-32 md:h-40 py-6 md:py-10 px-3 md:px-4">
                <div className="w-full max-w-2xl relative">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-sm absolute bottom-0 md:bottom-1 w-full ps-2 py-1 pe-1 md:ps-3 bg-slate-300 focus-within:shadow-sm flex gap-1">
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl className="m-0 p-0 w-full flex items-center">
                                            <TextareaAutosize
                                                maxRows={10}
                                                className="w-full py-2 border-0 outline-none text-slate-900 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                                                placeholder="Send a message"
                                                {...field}
                                                onKeyDown={(e) => {
                                                    handleEnterKeyDown(e);
                                                }}
                                                onChange={(event) =>
                                                    handleChange(event, field.onChange)
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}></FormField>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                variant="link"
                                className={cn("mt-auto duration-500 w-10 h-10 p-2", {
                                    "bg-slate-800": !isPromptEmpty,
                                })}>
                                <SendHorizonal
                                    className={cn("text-slate-500", {
                                        "text-slate-300": !isPromptEmpty,
                                    })}
                                    strokeWidth={1.5}
                                    size="md"
                                />
                            </Button>
                        </form>
                    </Form>
                </div>
                <p className="text-xs mt-2 text-center text-slate-500">
                    ChatGPT may produce inaccurate information about people, places, or facts.
                </p>
            </div>
        </div>
    );
};

export default ChatPage;
