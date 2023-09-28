// /app/[[...chat]]/ChatPageWrapper.tsx

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ChatPage from "./page";
import { getMessages } from "@/lib/api-chat";
import { ParsedUrlQuery } from "querystring";

interface PageProps {
    initialMessages: {
        role: string;
        content: string;
    }[];
}

const ChatPageWrapper: React.FC<PageProps> = ({ initialMessages }) => {
    return <ChatPage initialMessages={initialMessages} />;
};

export const getServerSideProps: GetServerSideProps<any> = async (
    context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
    const { chat } = context.query;
    const chatId = chat?.[1];

    if (!chatId) {
        // If chatId is missing, you should return an empty object
        return {
            props: {
                initialMessages: [],
            },
        };
    }

    try {
        // Fetch your server-side data using getMessages or any other method
        const initialMessages = await getMessages(chatId); // Assuming getMessages returns the data in the desired format

        return {
            props: {
                initialMessages,
            },
        };
    } catch (error) {
        // Handle errors here
        console.error("Error fetching initial messages:", error);

        // Return an empty array or handle the error as needed
        return {
            props: {
                initialMessages: [],
            },
        };
    }
};

export default ChatPageWrapper;
