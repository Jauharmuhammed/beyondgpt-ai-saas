import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
    const { user } = useUser();
    return (
        <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
                {user?.firstName?.charAt(0).toUpperCase()}
                {user?.lastName?.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
