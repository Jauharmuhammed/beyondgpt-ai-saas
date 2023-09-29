import { auth } from "@clerk/nextjs";
import prisma from "./db";

const DAY_IN_MS = 84_400_000;

export const checkSubscription = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userSubscription = await prisma.userSubscription.findUnique({
        where: {
            userId,
        },
        select: {
            stripeSubscriptionId: true,
            stripePriceId: true,
            stripeCustomerId: true,
            stripeCurrentPeriodEnd: true,
        },
    });

    if (!userSubscription) {
        return false;
    }

    const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid; 
};
