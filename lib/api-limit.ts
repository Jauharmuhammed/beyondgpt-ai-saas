import { auth } from "@clerk/nextjs";
import prisma from "./db";
import { MAX_FREE_COUNTS } from "@/constants";

export const increateApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId,
        },
    });

    if (userApiLimit) {
        await prisma.userApiLimit.update({
            where: {
                userId,
            },
            data: {
                count: userApiLimit.count + 1,
            },
        });
    } else {
        await prisma.userApiLimit.create({
            data: {
                userId,
                count: 1,
            },
        });
    }
};

export const checkUserApiLlimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId,
        },
    });

    return !userApiLimit || userApiLimit.count < MAX_FREE_COUNTS;
};

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) {
        return 0;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId,
        },
    });

    if (!userApiLimit) return 0;

    return userApiLimit.count;
};
