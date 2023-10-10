import React from "react";
import { createNewChat } from "@/lib/api-chat";
import ChatPage from "../../../components/chat-page";

const Page = async () => {
    const newChat = await createNewChat()

    return <ChatPage chatId={newChat.id} />;
};

export default Page;