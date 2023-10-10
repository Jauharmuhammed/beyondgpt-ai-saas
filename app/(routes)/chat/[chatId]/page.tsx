import React from "react";
import { getMessages } from "@/lib/api-chat";
import ChatPage from "@/components/chat-page";

const Page = async ({ params: { chatId } }: { params: { chatId: string } }) => {
    const uuidPattern =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    let err = false;
    let initialMessages;
    if (uuidPattern.test(chatId!)) {
        initialMessages = await getMessages(chatId);
    } else {
        err = true;
    }

    return <ChatPage initialMessages={initialMessages} chatId={chatId} error={err} />;
};

export default Page;
