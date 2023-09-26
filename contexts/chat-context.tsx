"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type MessageType = {
    role: string;
    content: string;
};

type ChatContextType = {
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

type ChatProviderProps = {
    children: ReactNode;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    return (
        <ChatContext.Provider value={{ messages, setMessages }}>{children}</ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
