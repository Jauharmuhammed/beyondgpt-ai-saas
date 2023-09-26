import { cn } from "@/lib/utils";
import UserAvatar from "./user-avatar";
import AiAvatar from "./ai-avatar";
import ReactMarkdown from "react-markdown";

type MessageType = {
    role: string;
    content: string;
};

const Message = ({ message, id }: { message: MessageType; id: string }) => {
    return (
        <div
            id={id}
            className={cn(
                "w-full py-4 px-3 md:px-4",
                message.role === "user" ? "bg-slate-925" : "bg-slate-900"
            )}>
            <div className="max-w-2xl mx-auto flex align-top space-x-4">
                <div>{message.role === "user" ? <UserAvatar /> : <AiAvatar />}</div>
                <ReactMarkdown className="py-1 md:pe-8 text-slate-300 whitespace-pre-line">
                    {message.content || ""}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default Message;
