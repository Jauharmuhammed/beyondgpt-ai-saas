import React from "react";
import SidebarHeader from "./sidebar-header";
import { Chat as ChatType } from "@prisma/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import Chat from "./chat";
import moment from 'moment'

const RecentConversations = ({ chats }: { chats: ChatType[] }) => {
    const groupedChats: { [key: string]: ChatType[] } = {};


    function setGroup(key: string, chat: ChatType) {
        if (!groupedChats[key]) {
            groupedChats[key] = [];
        }

        groupedChats[key].push(chat);
    }

    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const seventhday = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const thirteethday = moment().subtract(30, 'days').format('YYYY-MM-DD');

    chats.forEach((chat) => {
        const date = moment(chat.updatedAt).format('YYYY-MM-DD');

        if (date === today) {
            setGroup("Today", chat);
        } else if (date === yesterday) {
            setGroup("Yesterday", chat);
        } else if (moment(date).isAfter(seventhday)) {
            setGroup("Previous 7 days", chat);
        } else if (moment(date).isAfter(thirteethday)) {
            setGroup("Previous 30 days", chat);
        } else {
            const date = moment(chat.updatedAt);
            const monthYear = date.format("MMMM YYYY");

            setGroup(monthYear, chat);
        }
    });

    console.log(groupedChats);

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
