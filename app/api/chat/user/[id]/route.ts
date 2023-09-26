import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (typeof id !== "string") {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        const chats = await prisma.chat.findMany({
            where: {
                userId: id,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        return NextResponse.json(chats, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
