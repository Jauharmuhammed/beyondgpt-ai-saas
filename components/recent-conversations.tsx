import React from "react";
import SidebarHeader from "./sidebar-header";
import { Chat as ChatType } from "@prisma/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import Chat from "./chat";
import moment from 'moment'

const RecentConversations = ({ groupedChats }: { groupedChats: { [key: string]: ChatType[] } }) => {
    


    function renderFilteredChats(chats: ChatType[], title: string) {
        return (
            <div className="flex flex-col mb-2">
                <AccordionTrigger className="text-xs text-indigo-300/80">{title}</AccordionTrigger>
                <AccordionContent className="space-y-2 mt-2 h-full overflow-auto pr-1">
                    {chats.map((chat) => (
                        <Chat key={chat.id} chat={chat} />
                    ))}
                </AccordionContent>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col mb-2 ">
            <SidebarHeader title="Recent Conversations" />

            <Accordion
                type="multiple"
                defaultValue={[...Object.keys(groupedChats)]}
                className="h-full overflow-auto custom-scrollbar">
                {Object.keys(groupedChats).map((month) => (
                    <AccordionItem value={month} key={month}>
                        {renderFilteredChats(groupedChats[month], month)}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default RecentConversations;
