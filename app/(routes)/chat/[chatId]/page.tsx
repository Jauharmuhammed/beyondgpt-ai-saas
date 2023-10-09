import React from "react";
import { getMessages } from "@/lib/api-chat";
import ChatPage from "../page";
import { useRouter } from "next/router";

const Page = async ({ params: { chatId } }: { params: { chatId: string } }) => {
    const initialMessages = await getMessages(chatId);

    return <ChatPage initialMessages={initialMessages} />;
};

export default Page;
