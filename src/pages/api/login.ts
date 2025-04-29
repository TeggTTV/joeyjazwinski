import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma/client";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

type ResponseData = {
    message: string;
};

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient();
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // Create a simple cookie (for example only)
        const cookie = serialize("authToken", user.id, {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day
        });

        res.setHeader("Set-Cookie", cookie);
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Failed to login" });
    } finally {
        await prisma.$disconnect();
    }
}
