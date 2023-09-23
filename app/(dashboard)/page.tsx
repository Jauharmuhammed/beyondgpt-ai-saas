"use client";

import { useRef, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SendHorizonal } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import axios from "axios";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formSchema } from "./constants";
import { useRouter } from "next/navigation";

import { OpenAI } from "openai";
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import AiAvatar from "@/components/ai-avatar";
import Loader from "@/components/loader";

const DashboardPage = () => {
    const router = useRouter();
    const [isPromptEmpty, setIsPromptEmpty] = useState<boolean>(true);
    const [messages, setMessages] = useState<OpenAI.Chat.Completions.ChatCompletionMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const bottomRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end", // Scroll to the bottom of the element
            inline: "nearest",
        });
    };

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: OpenAI.Chat.Completions.ChatCompletionMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];
            setMessages((current) => [...current, userMessage]);

            const response = await axios.post("api/chat", {
                messages: newMessages,
            });

            setMessages((current) => [...current, response.data]);
            form.reset();
        } catch (error: any) {
            // TODO: Open Pro Modal
            console.log(error);
        } finally {
            router.refresh();
            scrollToBottom()
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
                    <div className="bg-slate-900 w-full min-h-[4rem]"></div>
                    {messages.map((message) => (
                        <div
                            className={cn(
                                "w-full py-4 px-3 md:px-0",
                                message.role === "user" ? "bg-slate-925" : "bg-slate-900"
                            )}>
                            <div className="max-w-2xl mx-auto flex align-top space-x-4">
                                <div>{message.role === "user" ? <UserAvatar /> : <AiAvatar />}</div>
                                <p className="py-1 md:pe-8 text-slate-300">
                                    <ReactMarkdown children={message.content || ""} />
                                </p>
                            </div>
                        </div>
                    ))}
                    {isLoading && <Loader />}
                    <div
                        ref={bottomRef}
                        className="bg-slate-925 w-full h-full min-h-[8rem] md:min-h-[10rem] mt-auto"></div>
                </div>
            )}
            <div className="fixed bottom-0 md:left-72 right-0 bg-gradient-to-b from-transparent via-slate-925 to-slate-925 flex flex-col justify-end items-center h-32 md:h-40 py-6 md:py-10 px-3 md:px-4">
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

export default DashboardPage;
