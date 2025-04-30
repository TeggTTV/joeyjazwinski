import { PrismaClient } from "../../generated/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from 'cookie';

// Mock database or data storage
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cookies = parse(req.headers.cookie || '');
    const userId = cookies.authToken;
    const sessionToken = cookies.sessionToken;

    if (!userId || !sessionToken) {
        return res.status(400).json({ error: "Missing userId or sessionToken" });
    }

    if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
        return res.status(400).json({ error: "Invalid userId format" });
    }

    if (req.method === "POST") {
        const userData = await prisma.user.findUnique({
            where: {
                id: userId as string,
                sessionToken: sessionToken as string,
            },
        });

        if (!userData) {
            return res
                .status(404)
                .json({ error: "User course data not found" });
        }

        return res.status(200).json({ data: userData });
    } else {
        res.setHeader("Allow", ["GET"]);
        return res
            .status(405)
            .json({ error: `Method ${req.method} not allowed` });
    }
}
